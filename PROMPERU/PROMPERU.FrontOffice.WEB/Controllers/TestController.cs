using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;
using ServiceExterno;
using System.Text.Json;
using PROMPERU.BL.Dtos;
using DocumentFormat.OpenXml.Office2010.Excel;

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


                    var testIncompleto =  procesoTest
                                            .Where(x => x.Ieva_Estado == "PENDIENTE")
                                            .OrderBy(Y => Y.Insc_ID)                                            
                                            .FirstOrDefault();

                    var testCompleto = procesoTest
                                            .Where(x => x.Ieva_Estado == "COMPLETADO")
                                            .OrderBy(Y => Y.Insc_ID)
                                            .ToList();

                    // 4. Obtener Test de Diagnóstico

                    var stepsProgress = await _testBL.ObtenerPasosInscripcion();

                    foreach (var step in stepsProgress)
                    {
                        var testRelacionado = procesoTest.FirstOrDefault(pt => pt.Insc_ID == step.Id);

                        if (testRelacionado != null && ( testRelacionado.Ieva_Estado == "COMPLETADO" || testRelacionado.Ieva_Estado == "PENDIENTE"))
                        {
                            step.Current = true;
                            step.IsComplete = testRelacionado.Ieva_Estado == "COMPLETADO";
                        }
                    }


                    //1. Test en curso (PENDIENTE)
                    if ((!string.IsNullOrEmpty(testIncompleto?.Ieva_Estado) && testIncompleto.Ieva_Estado == "PENDIENTE"))
                    {
                        var respuestaTest = await _testBL.ListarRespuestaSelectTestsAsync(ruc);

                        var activeTestProgress = await _testBL.ObtenerTestPorIdAsync(testIncompleto.Insc_ID);



                        // Agregar respuestas seleccionadas a las preguntas existentes en el test
                        // Recorrer cada pregunta en el test
                        foreach (var element in activeTestProgress.Elements)
                        {
                            var respuestasFiltradas = respuestaTest
                                .Where(r => r.Preg_ID == element.ID)
                                .ToList();

                            // Depuración: Verificar si se encontraron respuestas para la pregunta
                            if (!respuestasFiltradas.Any())
                            {
                                Console.WriteLine($"No hay respuestas para la Preg_ID: {element.ID}");
                            }

                            element.SelectAnswers = respuestasFiltradas
                                .Select(r => new SelectAnswer
                                {
                                    Id = r.Resp_ID > 0 ? r.Resp_ID : null,  // Asegurar que no asigne 0 si es incorrecto
                                    Input = !string.IsNullOrEmpty(r.Rsel_TextoRespuesta) ? r.Rsel_TextoRespuesta : ""
                                }).ToList();
                        }



                        return Ok(new
                        {
                            success = true,
                            message = $"Validaciones completadas. {testIncompleto.Eval_Etapa}",
                            test = new
                            {
                                steps=stepsProgress,
                                activeTest =activeTestProgress                                
                            }
                        });
                    }

                    //2. Test Culminado (COMPLETADO)


           
                    //3. Test APROBADO x RUC


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
                var activeTest = await _testBL.ObtenerTestPorIdAsync(steps[0].Id);
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
        public async Task<IActionResult> GuardarProgresoTest(TestModelRequestDto testModel)
        {
            try
            {

              if (testModel == null)
                    return BadRequest("El modelo no puede ser nulo.");

                await _testBL.GuardarProgresoTest(testModel); // Llamada asincr�nica           

                return Ok(new { success = true, message = "Test creado correctamente." });
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
