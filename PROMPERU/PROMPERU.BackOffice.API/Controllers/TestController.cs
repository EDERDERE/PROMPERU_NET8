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

        public TestController(ILogger<TestController> logger, InscripcionBL nscripcionBL)
        {
            _logger = logger;
            _inscripcionBL = nscripcionBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }
        [HttpGet]
        public async Task<IActionResult> ListarEtapas()
        {
            try
            {
                var etapas = await _inscripcionBL.ListarEtapasInscripcionAsync(); // Cambio a versión asincrónica
                if (etapas != null && etapas.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "etapas obtenidos exitosamente.",
                        etapas
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron etapas disponibles."
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
