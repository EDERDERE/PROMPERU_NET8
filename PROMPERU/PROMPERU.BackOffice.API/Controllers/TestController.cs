using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
    public class TestController : Controller
    {
        private readonly ILogger<TestController> _logger;    
        private readonly InscripcionBL _inscripcionBL;
        private readonly CursoBL _cursoBL;
        private readonly PortadaTestBL _portadaTestBL;
        public TestController(ILogger<TestController> logger, InscripcionBL nscripcionBL,CursoBL cursoBL, PortadaTestBL portadaTestBL)
        {
            _logger = logger;
            _inscripcionBL = nscripcionBL;
            _cursoBL = cursoBL;
            _portadaTestBL = portadaTestBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }
        [HttpGet]
        public async Task<IActionResult> ListarTest()
        {
            try
            {
                var curosos = await _cursoBL.ListarCursosAsync();
                var portadaTest = await _portadaTestBL.ListarPortadaTestsAsync(); // Cambio a versión asincrónica

                var etapas = await _inscripcionBL.ListarEtapasInscripcionAsync(); // Cambio a versión asincrónica
                if (etapas != null && etapas.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "test obtenidos exitosamente.",
                        etapas
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron test disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Inscripcions. Por favor, inténtelo nuevamente."

                });
            }
        }

    }
}
