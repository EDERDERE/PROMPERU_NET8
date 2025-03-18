using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Collections.Generic;
using PROMPERU.BE;
using System.Text.Json;
using System.Text;

namespace ServiceExterno
{
    public class SunatPromPeruService
    {
        private readonly HttpClient _httpClient;
        private readonly SunatPromPeruApiSettings _settings;

        public SunatPromPeruService(HttpClient httpClient, IOptions<SunatPromPeruApiSettings> settings)
        {
            _httpClient = httpClient;
            _settings = settings.Value;

        }

        private async Task<string> ObtenerTokenAsync()
        {
            try
            {
                // desactivar en entornos de PROD

                var handler = new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
                };

                using var client = new HttpClient(handler);

                var requestBody = new
                {
                    Usuario = _settings.Username,
                    Password = _settings.Password
                };
                string jsonBody = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                // desactivar en entornos de PROD
                HttpResponseMessage response = await client.PostAsync(_settings.AuthUrl, content);
                // ACTIVAR en entornos de PROD
                //HttpResponseMessage response = await _httpClient.PostAsync(_settings.AuthUrl, content);


                if (!response.IsSuccessStatusCode)
                {
                    string errorContent = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException($"Error en la autenticación con PROMPERÚ. Código: {response.StatusCode}, Detalle: {errorContent}");
                }

                string jsonResponse = await response.Content.ReadAsStringAsync();

                using JsonDocument jsonDoc = JsonDocument.Parse(jsonResponse);
                if (jsonDoc.RootElement.TryGetProperty("token", out JsonElement tokenElement))
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

                string token = await ObtenerTokenAsync();

                // Construir la URL con el parámetro RUC
                string url = $"{_settings.ConsultaRucUrl}?RUC={ruc}";

                // Crear un HttpClientHandler para ignorar errores de SSL (Deshabilitar en Producción)
                var handler = new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
                };

                using var httpClient = new HttpClient(handler);

                using var request = new HttpRequestMessage(HttpMethod.Get, new Uri(url));
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Trim());
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                Console.WriteLine($"Authorization: {request.Headers.Authorization}");

                // Realizar la solicitud
                var response = await httpClient.SendAsync(request);

                // En producción, usar _httpClient en lugar de httpClient con handler
                // var response = await _httpClient.SendAsync(request);

                string responseContent = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception($"Error al consultar RUC {ruc}. Detalles: {responseContent}");
                }

                return responseContent;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al consultar el RUC {ruc}. Inténtelo nuevamente.");
            }
        }
        public async Task<(bool esValido, JsonElement? evaluadoResult)> ValidarSunatPromPeruAsync(string jsonResponse)
        {
            using JsonDocument doc = JsonDocument.Parse(jsonResponse);
            JsonElement root = doc.RootElement;

            if (root.TryGetProperty("status", out JsonElement statusElement) &&
                statusElement.GetString() == "200" &&
                root.TryGetProperty("result", out JsonElement resultElement) &&
                resultElement.ValueKind == JsonValueKind.Array &&
                resultElement.GetArrayLength() > 0)
            {
                JsonElement contribuyente = resultElement[0]; // Tomamos el primer objeto del array

                // Copiamos los valores para que no dependan del JsonDocument
                string estado = contribuyente.TryGetProperty("estadocontribuyente", out JsonElement estadoElement)
                                ? estadoElement.GetString() ?? string.Empty
                                : string.Empty;

                string condicion = contribuyente.TryGetProperty("condicioncontribuyente", out JsonElement condicionElement)
                                   ? condicionElement.GetString() ?? string.Empty
                                   : string.Empty;

                bool esValido = estado.Equals("ACTIVO", StringComparison.OrdinalIgnoreCase) &&
                                condicion.Equals("HABIDO", StringComparison.OrdinalIgnoreCase);

                // 🔹 Copiamos el "resultElement" para evitar el error de objeto eliminado
                JsonElement resultCopy = resultElement.Clone();

                return (esValido, resultCopy);
            }

            return (false, null);
        }

    }

}
