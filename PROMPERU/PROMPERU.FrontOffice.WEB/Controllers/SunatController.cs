using Microsoft.AspNetCore.Mvc;
using ServiceExterno;

namespace PROMPERU.FrontOffice.WEB.Controllers
{

    [Route("sunat")]
    [ApiController]
    public class SunatController : Controller
    {
        private readonly ILogger<SunatController> _logger;
        private readonly SunatService _sunatService;
        private readonly SunatPromPeruService _sunatPromPeruService;
        public SunatController(ILogger<SunatController> logger, SunatService sunatService,SunatPromPeruService sunatPromPeruService)
        {
            _logger = logger;
            _sunatService = sunatService;
            _sunatPromPeruService = sunatPromPeruService;
        }

        /// <summary>
        /// Página principal del controlador Sunat.
        /// </summary>
        [HttpGet("")]
        public IActionResult Index()
        {
            return View(); // Asegúrate de que exista la vista "Index.cshtml" en la carpeta "Views/Sunat/"
        }

        /// <summary>
        /// Consulta un RUC en la API de SUNAT.
        /// </summary>
        /// <param name="ruc">Número de RUC</param>
        /// <returns>Datos del RUC en formato JSON</returns>
        [HttpGet("consultar-ruc/{ruc}")]
        public async Task<IActionResult> ConsultarRUC(string ruc)
        {
            if (string.IsNullOrWhiteSpace(ruc))
            {
                return BadRequest(new { success = false, message = "Debe ingresar un RUC válido." });
            }

            try
            {
                // Intentar con el primer servicio
                var resultado = await _sunatService.ConsultarRUCAsync(ruc);
                return Ok(new { success = true, data = resultado });
            }
            catch (Exception ex1)
            {
                _logger.LogError($"Error en _sunatService al consultar el RUC {ruc}: {ex1.Message}");

                try
                {
                    // Si el primer servicio falla, intenta con el segundo
                    var resultado2 = await _sunatPromPeruService.ConsultarRUCAsync(ruc);
                    return Ok(new { success = true, data = resultado2 });
                }
                catch (Exception ex2)
                {
                    _logger.LogError($"Error en _sunatPromPeruService al consultar el RUC {ruc}: {ex2.Message}");
                    return StatusCode(500, new { success = false, message = "Error en la consulta del RUC con ambos servicios." });
                }
            }
        }

    }

}
