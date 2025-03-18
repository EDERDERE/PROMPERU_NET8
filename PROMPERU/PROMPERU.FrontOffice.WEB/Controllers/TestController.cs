using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;
using ServiceExterno;
using System.Text.Json;

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
          return View(); // Asegúrate de tener una vista asociada         
        }

        //[HttpGet]
        //public async Task<IActionResult> ListarEtapas()
        //{
        //    try
        //    {
        //        var etapas = await _inscripcionBL.ListarEtapasInscripcionAsync(); // Cambio a versión asincrónica
        //        if (etapas != null && etapas.Any())
        //        {
        //            return Json(new
        //            {
        //                success = true,
        //                message = "etapas obtenidos exitosamente.",
        //                etapas
        //            });
        //        }
        //        else
        //        {
        //            return Json(new
        //            {
        //                success = false,
        //                message = "No se encontraron etapas disponibles."
        //            });
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new
        //        {
        //            success = false,
        //            message = "Ocurrió un error al intentar obtener los Inscripcions. Por favor, inténtelo nuevamente."

        //        });
        //    }
        //}

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

                _logger.LogInformation($"El RUC {ruc} no tiene un proceso de test activo. Consultando en fuentes externas...");

                // 2. Consultar en SUNAT y API INTERNO (SUNAT)
                var resultadoSunatJson = await _sunatService.ConsultarRUCAsync(ruc);
                bool esValidoSunat = false;
                JsonElement? evaluadoResult = null;

                if (!string.IsNullOrWhiteSpace(resultadoSunatJson))
                {
                    try
                    {
                        (esValidoSunat, evaluadoResult) = await _sunatService.ValidarSunatAsync(resultadoSunatJson);
                                        
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error al analizar la respuesta de SUNAT.");
                    }
                }

                // 3. Validar en otras entidades
                var validaciones = new Dictionary<string, bool>
                    {
                        { "SUNAT", esValidoSunat },
                        // { "MINCETUR", await _minceturService.ValidarRUCAsync(ruc) },
                        // { "INDECOPI", await _indecopiService.ValidarRUCAsync(ruc) },
                        // { "Adeudo", await _adeudoService.ValidarRUCAsync(ruc) },
                        // { "Declaración Jurada", await _declaracionService.ValidarRUCAsync(ruc) }
                    };

                var validacionesFallidas = validaciones.Where(v => !v.Value).Select(v => v.Key).ToList();
                if (validacionesFallidas.Any())
                {
                    _logger.LogWarning($"El RUC {ruc} no pasó las siguientes validaciones: {string.Join(", ", validacionesFallidas)}");

                    return BadRequest(new
                    {
                        success = false,
                        message = $"El RUC {ruc} no pasó las siguientes validaciones: {string.Join(", ", validacionesFallidas)}. No puede iniciar el Test de Diagnóstico.",
                        validaciones
                    });
                }

                _logger.LogInformation($"El RUC {ruc} pasó todas las validaciones. Iniciando Test de Diagnóstico...");

                // 4. Obtener Test de Diagnóstico
                var etapas = await _inscripcionBL.ListarEtapasInscripcionAsync();

                // Asignar "Current = true" solo cuando id == 2, el resto a false
                etapas = etapas.Select(e =>
                {
                    e.Current = (e.id == 2);// Test de diagnostico
                    return e;
                }).ToList();

                var testDiagnostico = await _testBL.ObtenerTestPorIdAsync(2);
                return Ok(new
                {
                    success = true,
                    message = "Validaciones completadas. Iniciando Test de Diagnóstico.",
                    validaciones,
                    test = new
                    {
                        etapas,
                        testDiagnostico,
                        evaluado = evaluadoResult
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al consultar el RUC {ruc}");
                return StatusCode(500, new { success = false, message = "Ocurrió un error inesperado al procesar la consulta." });
            }
        }
            

    }
}
