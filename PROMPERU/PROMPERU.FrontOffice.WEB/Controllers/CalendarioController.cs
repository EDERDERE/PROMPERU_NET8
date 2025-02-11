using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
    public class CalendarioController : Controller
    {
        private readonly ILogger<CalendarioController> _logger;    
        private readonly LogoBL _logoBL;

        public CalendarioController(ILogger<CalendarioController> logger, LogoBL logoBL)
        {
            _logger = logger;
            _logoBL = logoBL;
        }

        public IActionResult Index()
        {            
          return View(); // Aseg�rate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarLogos()
        {
            try
            {
                var Logos = await _logoBL.ListarLogosAsync(); // Cambio a versi�n asincr�nica
                if (Logos != null && Logos.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Logos obtenidos exitosamente.",
                        Logos
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Logos disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurri� un error al intentar obtener los Logos. Por favor, int�ntelo nuevamente."
                  
                });
            }
        }      
    }
}
