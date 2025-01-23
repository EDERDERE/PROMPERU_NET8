using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
    public class CasoController : Controller
    {
        private readonly ILogger<CasoController> _logger;    
        private readonly CasoBL _casoBL;

        public CasoController(ILogger<CasoController> logger, CasoBL casoBL)
        {
            _logger = logger;
            _casoBL = casoBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarCasos()
        {
            try
            {
                var Casos = await _casoBL.ListarCasosAsync(); // Cambio a versión asincrónica
                if (Casos != null && Casos.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Casos obtenidos exitosamente.",
                        Casos
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Casos disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Casos. Por favor, inténtelo nuevamente."
                  
                });
            }
        }       
    }
}
