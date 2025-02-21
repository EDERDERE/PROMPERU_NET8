using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using PROMPERU.BE;
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
            var parametros = new FormUrlEncodedContent(new[]
            {
            new KeyValuePair<string, string>("Username", _settings.Username),
            new KeyValuePair<string, string>("Password", _settings.Password)
        });

            var response = await _httpClient.PostAsync(_settings.AuthUrl, parametros);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Error en la autenticación con PROMPERÚ.");
            }

            var token = await response.Content.ReadAsStringAsync();
            return token.Trim('"'); // Elimina comillas del JSON
        }

        public async Task<string> ConsultarRUCAsync(string ruc)
        {
            string token = await ObtenerTokenAsync();

            var parametros = new FormUrlEncodedContent(new[]
            {
            new KeyValuePair<string, string>("ruc", ruc)
        });

            var request = new HttpRequestMessage(HttpMethod.Post, _settings.ConsultaRucUrl)
            {
                Content = parametros
            };
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Error al consultar RUC en SUNAT.");
            }

            return await response.Content.ReadAsStringAsync();
        }
    }
}
