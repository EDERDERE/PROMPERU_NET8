using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
    public class ContenidoInteractivoController : Controller
    {
        private readonly ILogger<ContenidoInteractivoController> _logger;    
        private readonly ContenidoInteractivoBL _contenidoInteractivoBL;

        public ContenidoInteractivoController(ILogger<ContenidoInteractivoController> logger, ContenidoInteractivoBL contenidoInteractivoBL)
        {
            _logger = logger;
            _contenidoInteractivoBL = contenidoInteractivoBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarContenidoInteractivos()
        {
            try
            {
                var contenidoInteractivos = await _contenidoInteractivoBL.ListarContenidoInteractivosAsync(); // Cambio a versión asincrónica
                if (contenidoInteractivos != null && contenidoInteractivos.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "ContenidoInteractivos obtenidos exitosamente.",
                        contenidoInteractivos
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron ContenidoInteractivos disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los ContenidoInteractivos. Por favor, inténtelo nuevamente."
                  
                });
            }
        }          
    }
}
