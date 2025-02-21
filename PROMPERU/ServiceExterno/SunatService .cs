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

        public SunatService(HttpClient httpClient, IOptions<SunatApiSettings> settings)
        {
            _httpClient = httpClient;
            _settings = settings.Value;

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

                string token = await ObtenerTokenAsync();

                var parametros = new Dictionary<string, string>
                {
                    { "ruc", ruc }
                };

                using var request = new HttpRequestMessage(HttpMethod.Post, new Uri(_settings.ConsultaRucUrl));
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Trim());
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));              

              
                request.Content = new FormUrlEncodedContent(parametros);
                request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

                Console.WriteLine($"Authorization: {request.Headers.Authorization}");

                var response = await _httpClient.SendAsync(request);

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
    }

}
