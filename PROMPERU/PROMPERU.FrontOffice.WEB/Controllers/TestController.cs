using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;
using ServiceExterno;
using System.Text.Json;
using PROMPERU.BL.Dtos;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
    public class TestController : Controller
    {
        private readonly ILogger<TestController> _logger;
        private readonly InscripcionBL _inscripcionBL;
        private readonly TestBL _testBL;
        private readonly SunatService _sunatService;
        private readonly SunatPromPeruService _sunatPromPeruService;

        public TestController(ILogger<TestController> logger,InscripcionBL inscripcionBL, TestBL testBL,SunatService sunatService,SunatPromPeruService sunatPromPeruService)
        {
            _logger = logger;
            _testBL = testBL;
            _inscripcionBL = inscripcionBL;
            _sunatService = sunatService;
            _sunatPromPeruService = sunatPromPeruService;
        }

        public IActionResult Index()
        {            
          return View(); // Aseg�rate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ConsultarRUC(string ruc)
        {
            if (string.IsNullOrWhiteSpace(ruc))
            {
                return BadRequest(new { success = false, message = "Debe ingresar un RUC válido." });
            }

            try
            {
                _logger.LogInformation($"Iniciando consulta para el RUC: {ruc}");

                // 1. Validar si el RUC ya tiene un test en curso
                var procesoTest = await _testBL.ListarProcesoTestAsync(ruc);
                if (procesoTest.Any())
                {
                    _logger.LogInformation($"El RUC {ruc} tiene un proceso de test activo.");
                    return Ok(new { success = true, message = "El usuario ya tiene un proceso en curso.", data = procesoTest });
                }

                _logger.LogInformation($"El RUC {ruc} no tiene un proceso activo. Consultando en fuentes externas...");

                // 2. Consultar en SUNAT
                var resultadoSunatJson = await _sunatService.ConsultarRUCAsync(ruc);
                var (esValidoSunat, evaluadoResult) = await _testBL.ValidarRespuestaSunat(resultadoSunatJson);

                // 3. Validar en otras entidades
                var validaciones = new Dictionary<string, bool>
                {
                    { "SUNAT", esValidoSunat }
                };

                var validacionesFallidas = validaciones.Where(v => !v.Value).Select(v => v.Key).ToList();
                if (validacionesFallidas.Any())
                {
                    _logger.LogWarning($"El RUC {ruc} no pasó las siguientes validaciones: {string.Join(", ", validacionesFallidas)}");

                    return BadRequest(new
                    {
                        success = false,
                        message = $"El RUC {ruc} no pasó las siguientes validaciones: {string.Join(", ", validacionesFallidas)}. No puede iniciar el Test de Diagnóstico.",
                        validations = validaciones
                    });
                }

                _logger.LogInformation($"El RUC {ruc} pasó todas las validaciones. Iniciando Test de Diagnóstico...");

                // 4. Obtener Test de Diagnóstico
                var steps = await _testBL.ObtenerPasosInscripcion();
                var activeTest = await _testBL.ObtenerTestPorIdAsync(2);
                var evaluated = _testBL.ExtraerDatosEvaluacion(evaluadoResult, ruc);

                return Ok(new
                {
                    success = true,
                    message = "Validaciones completadas. Iniciando Test de Diagnóstico.",
                    validations = validaciones,
                    test = new
                    {
                        steps,
                        activeTest,
                        evaluated
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al consultar el RUC {ruc}");
                return StatusCode(500, new { success = false, message = "Ocurrió un error inesperado al procesar la consulta." });
            }
        }


        [HttpPost]
        public async Task<IActionResult> CerrarSesion()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme); // Especificamos el esquema
            HttpContext.Session.Clear();
            return Json(new { success = true });
        }


    }
}
