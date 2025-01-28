using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;


namespace PROMPERU.FrontOffice.WEB.Controllers
{
    public class MenuController : Controller
    {
        private readonly ILogger<MenuController> _logger;    
        private readonly MenuBL _menuBL;

        public MenuController(ILogger<MenuController> logger, MenuBL menuBL)
        {
            _logger = logger;
            _menuBL = menuBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarMenus()
        {
            try
            {
                var Menus = await _menuBL.ListarMenusAsync(); // Cambio a versión asincrónica              
    
                if (Menus != null && Menus.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Menus obtenidos exitosamente.",
                        Menus
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Menus disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Menus. Por favor, inténtelo nuevamente."
                  
                });
            }
        }
                
    }
}
