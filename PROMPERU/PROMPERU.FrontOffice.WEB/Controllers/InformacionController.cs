using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
    public class InformacionController : Controller
    {
        private readonly ILogger<InformacionController> _logger;    
        private readonly InformacionBL _informacionBL;

        public InformacionController(ILogger<InformacionController> logger, InformacionBL informacionBL)
        {
            _logger = logger;
            _informacionBL = informacionBL;
        }

        public IActionResult Index()
        {
            return View(); // Asegúrate de tener una vista asociada         
        }


        [HttpGet]
        public async Task<IActionResult> ListarInformacions()
        {
            try
            {
                var informacions = await _informacionBL.ListarInformacionsAsync(); // Cambio a versión asincrónica
                if (informacions != null && informacions.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Informacions obtenidos exitosamente.",
                        informacions
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron informacions disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los informacions. Por favor, inténtelo nuevamente."

                });
            }
        }      
    }
}
