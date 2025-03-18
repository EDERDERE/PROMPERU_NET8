using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Collections.Generic;
using PROMPERU.BE;
using System.Text.Json;

namespace ServiceExterno
{
    public class SunatService
    {
        private readonly HttpClient _httpClient;
        private readonly SunatApiSettings _settings;
        private readonly SunatPromPeruService _sunatPromPeruService;

        public SunatService(HttpClient httpClient, IOptions<SunatApiSettings> settings,SunatPromPeruService sunatPromPeruService)
        {
            _httpClient = httpClient;
            _settings = settings.Value;
            _sunatPromPeruService = sunatPromPeruService;
        }

        private async Task<string> ObtenerTokenAsync()
        {
            try
            {
                var parametros = new FormUrlEncodedContent(new[]
                {
            new KeyValuePair<string, string>("Username", _settings.Username),
            new KeyValuePair<string, string>("Password", _settings.Password)
        });

                HttpResponseMessage response = await _httpClient.PostAsync(_settings.AuthUrl, parametros);

                if (!response.IsSuccessStatusCode)
                {
                    string errorContent = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException($"Error en la autenticación con PROMPERÚ. Código: {response.StatusCode}, Detalle: {errorContent}");
                }

                // Leer el JSON completo
                string jsonResponse = await response.Content.ReadAsStringAsync();

                // Intentar extraer el token
                using JsonDocument jsonDoc = JsonDocument.Parse(jsonResponse);
                if (jsonDoc.RootElement.TryGetProperty("message", out JsonElement tokenElement))
                {
                    string token = tokenElement.GetString();
                    if (!string.IsNullOrEmpty(token))
                    {
                        return token;
                    }
                }

                throw new Exception("No se pudo obtener el token desde la respuesta.");
            }
            catch (HttpRequestException httpEx)
            {
                throw new Exception("Error de conexión con el servicio de autenticación.", httpEx);
            }
            catch (JsonException jsonEx)
            {
                throw new Exception("Error al procesar la respuesta JSON del token.", jsonEx);
            }
            catch (Exception ex)
            {
                throw new Exception("Error inesperado al obtener el token.", ex);
            }
        }


        public async Task<string> ConsultarRUCAsync(string ruc)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(ruc))
                {
                    throw new ArgumentException("El RUC no puede estar vacío.");
                }

                // Obtener Token
                string token = await ObtenerTokenAsync();
                if (string.IsNullOrWhiteSpace(token))
                {
                    throw new Exception("Error: No se pudo obtener el token de autenticación.");
                }

                // Validar URL
                if (string.IsNullOrWhiteSpace(_settings.ConsultaRucUrl))
                {
                    throw new Exception("Error: La URL de consulta de RUC no está configurada.");
                }

                // Preparar Request
                var parametros = new Dictionary<string, string> { { "ruc", ruc } };
                using var request = new HttpRequestMessage(HttpMethod.Post, new Uri(_settings.ConsultaRucUrl));
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Trim());
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Content = new FormUrlEncodedContent(parametros);
                request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

                Console.WriteLine($"Enviando solicitud a: {_settings.ConsultaRucUrl}");
                Console.WriteLine($"Authorization: {request.Headers.Authorization}");

                // Ejecutar Petición HTTP
                var response = await _httpClient.SendAsync(request);
                string responseContent = await response.Content.ReadAsStringAsync();

                Console.WriteLine($"Respuesta HTTP: {response.StatusCode} - {responseContent}");

                // Manejo de Errores
                if (!response.IsSuccessStatusCode)
                {
                    // Consulta API INTERNO (SUNAT)
                    responseContent = await _sunatPromPeruService.ConsultarRUCAsync(ruc);
                }

                return responseContent;
            }
            catch (HttpRequestException httpEx)
            {
                throw new Exception($"Error en la conexión con el servicio SUNAT. Detalles: {httpEx.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al consultar el RUC {ruc}: {ex.Message}", ex);
            }
        }
        public async Task<(bool esValido, JsonElement? evaluadoResult)> ValidarSunatAsync(string jsonResponse)
        {
            using JsonDocument doc = JsonDocument.Parse(jsonResponse);
            JsonElement root = doc.RootElement;

            // 🔹 Caso 1: JSON con "status" y "result" (Formato esperado inicialmente)
            if (root.TryGetProperty("status", out JsonElement statusElement) &&
                statusElement.GetString() == "200" &&
                root.TryGetProperty("result", out JsonElement resultElement) &&
                resultElement.ValueKind == JsonValueKind.Array &&
                resultElement.GetArrayLength() > 0)
            {
                JsonElement contribuyente = resultElement[0]; // Tomamos el primer objeto del array

                string estado = contribuyente.TryGetProperty("estadocontribuyente", out JsonElement estadoElement)
                                ? estadoElement.GetString() ?? string.Empty
                                : string.Empty;

                string condicion = contribuyente.TryGetProperty("condicioncontribuyente", out JsonElement condicionElement)
                                   ? condicionElement.GetString() ?? string.Empty
                                   : string.Empty;

                bool esValido = estado.Equals("ACTIVO", StringComparison.OrdinalIgnoreCase) &&
                                condicion.Equals("HABIDO", StringComparison.OrdinalIgnoreCase);

                return (esValido, resultElement.Clone());
            }

            // 🔹 Caso 2: JSON sin "status" y "result" (Ejemplo que proporcionaste)
            if (root.TryGetProperty("RUC", out JsonElement rucElement) &&
                root.TryGetProperty("RazonSocial", out JsonElement razonSocialElement))
            {
                bool esValido = !string.IsNullOrWhiteSpace(rucElement.GetString()) &&
                                !string.IsNullOrWhiteSpace(razonSocialElement.GetString());

                return (esValido, root.Clone());
            }

            return (false, null);
        }

    }
}
