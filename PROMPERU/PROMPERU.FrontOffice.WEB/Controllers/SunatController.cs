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

        public SunatController(ILogger<SunatController> logger, SunatService sunatService)
        {
            _logger = logger;
            _sunatService = sunatService;
        }

        /// <summary>
        /// P�gina principal del controlador Sunat.
        /// </summary>
        [HttpGet("")]
        public IActionResult Index()
        {
            return View(); // Aseg�rate de que exista la vista "Index.cshtml" en la carpeta "Views/Sunat/"
        }

        /// <summary>
        /// Consulta un RUC en la API de SUNAT.
        /// </summary>
        /// <param name="ruc">N�mero de RUC</param>
        /// <returns>Datos del RUC en formato JSON</returns>
        [HttpGet("consultar-ruc/{ruc}")]
            public async Task<IActionResult> ConsultarRUC(string ruc)
        {
            if (string.IsNullOrWhiteSpace(ruc))
            {
                return BadRequest(new { success = false, message = "Debe ingresar un RUC v�lido." });
            }

            try
            {
                var resultado = await _sunatService.ConsultarRUCAsync(ruc);
                return Ok(new { success = true, data = resultado });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al consultar el RUC {ruc}: {ex.Message}");
                return StatusCode(500, new { success = false, message = "Error interno en la consulta de RUC." });
            }
        }
    }

}
