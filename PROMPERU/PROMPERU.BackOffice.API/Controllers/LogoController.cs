using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;


namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
    public class LogoController : Controller
    {
        private readonly ILogger<LogoController> _logger;    
        private readonly LogoBL _logoBL;

        public LogoController(ILogger<LogoController> logger, LogoBL logoBL)
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

        [HttpPost]
        public async Task<IActionResult> InsertarLogo(LogoDto logoDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var Logo = new LogoBE
                {
                     Logo_ID = logoDto.id,
                     Logo_NombreBoton = logoDto.nombreBoton,
                     Logo_UrlIconBoton = logoDto.urlIconBoton,
                     Logo_UrlPrincipal = logoDto.urlPrincipal,
                     Logo_UrlSecundario = logoDto.urlSecundario
                

                };
                await _logoBL.InsertarLogoAsync(Logo, usuario, ip); // Llamada asincr�nica
                return RedirectToAction("ListarLogos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarLogo(LogoDto logoDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var Logo = new LogoBE
                {
                    Logo_ID = logoDto.id,
                    Logo_NombreBoton = logoDto.nombreBoton,
                    Logo_UrlIconBoton = logoDto.urlIconBoton,
                    Logo_UrlPrincipal = logoDto.urlPrincipal,
                    Logo_UrlSecundario = logoDto.urlSecundario
                };
                await _logoBL.ActualizarLogoAsync(Logo, usuario, ip, id); // Llamada asincr�nica
                return RedirectToAction("ListarLogos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarLogo(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _logoBL.EliminarLogoAsync(usuario, ip, id); // Llamada asincr�nica
                return RedirectToAction("ListarLogos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerLogo(int bannID)
        //{
        //    try
        //    {
        //        var Logo = await _LogoBL.ObtenerLogoAsync(bannID); // Llamada asincr�nica
        //        return View(Logo); // Aseg�rate de tener una vista para mostrar un Logo
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenLogo([FromBody] List<LogoDto> logoDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var logoDto in logoDtos)
                {
                    var logo = new LogoBE
                    {
                        Logo_ID = logoDto.id,
                        Logo_NombreBoton = logoDto.nombreBoton,
                        Logo_UrlIconBoton = logoDto.urlIconBoton,
                        Logo_UrlPrincipal = logoDto.urlPrincipal,
                        Logo_UrlSecundario = logoDto.urlSecundario
                    };
                    await _logoBL.ActualizarLogoAsync(logo, usuario, ip,logo.Logo_ID); // Llamada asincr�nica
                }
                return RedirectToAction("ListarLogos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
