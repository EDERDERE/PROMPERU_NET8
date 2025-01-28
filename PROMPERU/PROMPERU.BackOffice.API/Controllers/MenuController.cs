using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;


namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
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

        [HttpPost]
        public async Task<IActionResult> InsertarMenu(MenuDto menuDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var Menu = new MenuBE
                {
                     Menu_ID = menuDto.id,
                     Menu_Nombre = menuDto.nombre,
                     Menu_UrlIconBoton = menuDto.urlIconBoton              
             
                };
                await _menuBL.InsertarMenuAsync(Menu, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarMenus");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarMenu(MenuDto menuDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var Menu = new MenuBE
                {
                   
                    Menu_ID = menuDto.id,
                    Menu_Nombre = menuDto.nombre,
                    Menu_UrlIconBoton = menuDto.urlIconBoton    
                   
                };
                await _menuBL.ActualizarMenuAsync(Menu, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarMenus");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarMenu(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _menuBL.EliminarMenuAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarMenus");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerMenu(int bannID)
        //{
        //    try
        //    {
        //        var Menu = await _MenuBL.ObtenerMenuAsync(bannID); // Llamada asincrónica
        //        return View(Menu); // Asegúrate de tener una vista para mostrar un Menu
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenMenu([FromBody] List<MenuDto> menuDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var menuDto in menuDtos)
                {
                    var Menu = new MenuBE
                    {
                        Menu_ID = menuDto.id,
                        Menu_Nombre = menuDto.nombre,
                        Menu_UrlIconBoton = menuDto.urlIconBoton
                    };
                    await _menuBL.ActualizarMenuAsync(Menu, usuario, ip,Menu.Menu_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarMenus");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
