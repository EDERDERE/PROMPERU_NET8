using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;

namespace PROMPERU.FrontOffice.WEB.Controllers
{

    public class ClienteController : Controller
    {
        private readonly ILogger<ClienteController> _logger;    
        private readonly BannerBL _bannerBL;

        public ClienteController(ILogger<ClienteController> logger, BannerBL bannerBL)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {            
          return View(); // Aseg�rate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarBanners()
        {
            try
            {
                var banners = await _bannerBL.ListarBannersAsync(); // Cambio a versi�n asincr�nica
                if (banners != null && banners.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Banners obtenidos exitosamente.",
                        banners
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron banners disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurri� un error al intentar obtener los banners. Por favor, int�ntelo nuevamente."
                  
                });
            }
        }
              
    }
}
