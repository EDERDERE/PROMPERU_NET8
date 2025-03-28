using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;
using ServiceExterno;
using System.Text.Json;
using PROMPERU.BL.Dtos;
using DocumentFormat.OpenXml.Office2010.Excel;
using PROMPERU.BE;

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

        [HttpPost]
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
                var datos = await _testBL.ListarDatosGeneralesTestAsync(ruc);

                var generalDataList = new List<GeneralData>();

                foreach (var item in datos)
                {
                    var companyData = new GeneralData
                    {
                        ID = item.ID,
                        LegalName = item.RazonSocial,
                        FullName = item.NombresApellidos,
                        TradeName = item.NombreComercial,
                        Ruc = item.Ruc,
                        Region = item.Region,
                        Province = item.Provincia,
                        PhoneNumber = item.Telefono,
                        Email = item.CorreoElectronico,
                        StartDate = item.FechaInicioActividades,
                        LegalEntityType = item.TipoPersoneria,
                        CompanyType = item.TipoEmpresa,
                        TourismServiceProviderType = item.TipoPrestadorServiciosTuristicos,
                        BusinessActivity = item.ActividadEconomica,
                        Landline = item.TelefonoFijo,
                        Website = item.PaginaWeb,
                        TourismBusinessType = item.TipoEmpresaTuristica,
                        LodgingCategory = item.CategoriaHospedaje,
                    };

                    generalDataList.Add(companyData);
                }


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

                        var test = new TestModelRequestDto
                        {
                            Steps = stepsProgress.Select(step => new Step
                            {
                                // Mapea las propiedades de step según la estructura de Step
                                // Suponiendo que step tiene propiedades equivalentes en la clase Step
                                Id = step.Id,
                                StepNumber = step.StepNumber,
                                IconName = step.IconName,
                                IconUrl = step.IconUrl,
                                Current = step.Current,
                                IsComplete = step.IsComplete,
                                isApproved = step.isApproved
                            }).ToList(),

                            ActiveTest = new ActiveTest
                            {
                                // Si hay datos de ActiveTest, mapéalos aquí
                                TestType = activeTestProgress.TestType,
                                Elements = activeTestProgress.Elements.Select( e => new Element
                                {
                                    Id = e.ID,
                                    Order = e.Order,
                                    Type = e.Type,
                                    QuestionText = e.QuestionText,
                                    IsComputable = e.IsComputable,
                                    Label = e.Label,
                                    Category = e.Category,
                                    AnswerType = e.AnswerType,
                                    SelectAnswers = e.SelectAnswers,
                                    Course = e.Course

                                 }).ToList()
                            },

                            CompanyData = datos.Select(c => new GeneralData
                            {
                                ID = c.ID,
                                LegalName = c.RazonSocial,
                                FullName = c.NombresApellidos,
                                TradeName = c.NombreComercial,                              
                                Ruc = c.Ruc,
                                Region = c.Region,
                                Province =c.Provincia,
                                PhoneNumber = c.Telefono,
                                Email = c.CorreoElectronico,
                                StartDate = c.FechaInicioActividades,
                                LegalEntityType = c.TipoPersoneria,
                                CompanyType = c.TipoEmpresa,
                                TourismServiceProviderType = c.TipoPrestadorServiciosTuristicos,                            
                                BusinessActivity =  c.ActividadEconomica,
                                Landline = c.TelefonoFijo,
                                TourismBusinessType = c.TipoEmpresaTuristica,
                                LodgingCategory = c.CategoriaHospedaje   


                            }).FirstOrDefault(),

                            Registration = new Registration
                            {
                                // Si hay datos de Registration, mapéalos aquí
                            },

                            TitularRepresentative = new TitularRepresentative
                            {
                                // Si hay datos de TitularRepresentative, mapéalos aquí
                            }
                        }; 


                        return Ok(new
                        {
                            success = true,
                            message = $"Validaciones completadas. {testIncompleto.Eval_Etapa}",
                            test
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
                        companyData = evaluated
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
