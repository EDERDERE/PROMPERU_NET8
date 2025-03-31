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
        private readonly IWebHostEnvironment _env;

        public TestController(ILogger<TestController> logger,InscripcionBL inscripcionBL, TestBL testBL,SunatService sunatService,SunatPromPeruService sunatPromPeruService, IWebHostEnvironment env)
        {
            _logger = logger;
            _testBL = testBL;
            _inscripcionBL = inscripcionBL;
            _sunatService = sunatService;
            _sunatPromPeruService = sunatPromPeruService;
            _env = env;
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
            _logger.LogInformation($"Iniciando consulta para el RUC: {ruc}");
            try
            {
                var resultado = await _testBL.ConsultarRUCAsync(ruc,_env.WebRootPath);

                if (!resultado.Success)
                {
                    return BadRequest(new { success = false, message = resultado.Message, validations = resultado.Validations });
                }

                return Ok(new
                {
                    success = true,
                    message = resultado.Message,
                    test = resultado.Test
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en la consulta del RUC {ruc}");
                return StatusCode(500, new { success = false, message = "Ocurrió un error al procesar la solicitud." });
            }
        }
                

        [HttpPost]
        public async Task<IActionResult> GuardarProgresoTest([FromBody]TestModelRequestDto testModel)
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
