using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;

namespace PROMPERU.FrontOffice.WEB.Controllers
{

    public class InscripcionController : Controller
    {
        private readonly ILogger<InscripcionController> _logger;    
        private readonly InscripcionBL _InscripcionBL;

        public InscripcionController(ILogger<InscripcionController> logger, InscripcionBL inscripcionBL)
        {
            _logger = logger;
            _InscripcionBL = inscripcionBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarInscripcions()
        {
            try
            {
                var inscripcions = await _InscripcionBL.ListarInscripcionsAsync(); // Cambio a versión asincrónica
                if (inscripcions != null && inscripcions.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Inscripcions obtenidos exitosamente.",
                        inscripcions
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Inscripcions disponibles."
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
