using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;

namespace PROMPERU.FrontOffice.WEB.Controllers
{

    public class FooterController : Controller
    {
        private readonly ILogger<FooterController> _logger;    
        private readonly FooterBL _footerBL;

        public FooterController(ILogger<FooterController> logger, FooterBL footerBL)
        {
            _logger = logger;
            _footerBL = footerBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarFooters()
        {
            try
            {
                var Footers = await _footerBL.ListarFootersAsync(); // Cambio a versión asincrónica
                if (Footers != null && Footers.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Footers obtenidos exitosamente.",
                        Footers
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Footers disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Footers. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarFooter(FooterDto footerDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var footer = new FooterBE
                {   

                     Foot_ID = footerDto.id,
                     Foot_Nombre = footerDto.nombre,
                     Foot_Contacto = footerDto.contacto,
                     Foot_UrlIconContacto = footerDto.urlIconContacto,
                     Foot_Ubicacion = footerDto.ubicacion,
                     Foot_UrlIconUbicacion = footerDto.urlIconUbicacion,
                     Foot_UrlLogoPrincipal = footerDto.urlLogoPrincipal,
                     Foot_UrlLogoSecundario = footerDto.urlLogoSecundario,
                     Foot_Ayuda = footerDto.ayuda,
                     Foot_Comunicate = footerDto.comunicate,
                     Foot_UrlIconMensaje = footerDto.urlIconMensaje,
                     Foot_UrlIconWhatssap = footerDto.urlIconWhatssap

                };
                await _footerBL.InsertarFooterAsync(footer, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarFooters");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarFooter(FooterDto footerDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var footer = new FooterBE
                {
                    Foot_ID = footerDto.id,
                    Foot_Nombre = footerDto.nombre,
                    Foot_Contacto = footerDto.contacto,
                    Foot_UrlIconContacto = footerDto.urlIconContacto,
                    Foot_Ubicacion = footerDto.ubicacion,
                    Foot_UrlIconUbicacion = footerDto.urlIconUbicacion,
                    Foot_UrlLogoPrincipal = footerDto.urlLogoPrincipal,
                    Foot_UrlLogoSecundario = footerDto.urlLogoSecundario,
                    Foot_Ayuda = footerDto.ayuda,
                    Foot_Comunicate = footerDto.comunicate,
                    Foot_UrlIconMensaje = footerDto.urlIconMensaje,
                    Foot_UrlIconWhatssap = footerDto.urlIconWhatssap
                };
                await _footerBL.ActualizarFooterAsync(footer, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarFooters");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarFooter(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _footerBL.EliminarFooterAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarFooters");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerFooter(int bannID)
        //{
        //    try
        //    {
        //        var Footer = await _FooterBL.ObtenerFooterAsync(bannID); // Llamada asincrónica
        //        return View(Footer); // Asegúrate de tener una vista para mostrar un Footer
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenFooter([FromBody] List<FooterDto> footerDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var footerDto in footerDtos)
                {
                    var footer = new FooterBE
                    {
                        Foot_ID = footerDto.id,
                        Foot_Nombre = footerDto.nombre,
                        Foot_Contacto = footerDto.contacto,
                        Foot_UrlIconContacto = footerDto.urlIconContacto,
                        Foot_Ubicacion = footerDto.ubicacion,
                        Foot_UrlIconUbicacion = footerDto.urlIconUbicacion,
                        Foot_UrlLogoPrincipal = footerDto.urlLogoPrincipal,
                        Foot_UrlLogoSecundario = footerDto.urlLogoSecundario,
                        Foot_Ayuda = footerDto.ayuda,
                        Foot_Comunicate = footerDto.comunicate,
                        Foot_UrlIconMensaje = footerDto.urlIconMensaje,
                        Foot_UrlIconWhatssap = footerDto.urlIconWhatssap
                    };
                    await _footerBL.ActualizarFooterAsync(footer, usuario, ip,footer.Foot_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarFooters");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
