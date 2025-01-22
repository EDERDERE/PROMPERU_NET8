using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BackOffice.API.Models;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;
using System.Diagnostics;

namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
    public class ContactoController : Controller
    {
        private readonly ILogger<ContactoController> _logger;    
        private readonly CasoBL _casoBL;

        public ContactoController(ILogger<ContactoController> logger, CasoBL casoBL)
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

        [HttpPost]
        public async Task<IActionResult> InsertarCaso(CasoDto casoDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var caso = new CasoBE
                {
                     Cexi_ID = casoDto.id,
                     Cexi_Nombre = casoDto.nombre,
                     Cexi_Orden = casoDto.orden,
                     Cexi_Titulo = casoDto.titulo,
                     Cexi_UrlVideo = casoDto.urlVideo,
                    Cexi_TituloVideo = casoDto.tituloVideo, 
                     Cexi_NombreBoton = casoDto.nombreBoton,
                    Cexi_UrlBoton = casoDto.urlBoton,
                     Cexi_Descripcion = casoDto.description,
                     Cexi_UrlIcon = casoDto.urlIcon,
                     Cexi_UrlPerfil = casoDto.urlPerfil,
                     Cexi_UrlCabecera = casoDto.urlCabecera,
                

                };
                await _casoBL.InsertarCasoAsync(caso, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarCasos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarCaso(CasoDto casoDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var caso = new CasoBE
                {
                    Cexi_ID = casoDto.id,
                    Cexi_Nombre = casoDto.nombre,
                    Cexi_Orden = casoDto.orden,
                    Cexi_Titulo = casoDto.titulo,
                    Cexi_UrlVideo = casoDto.urlVideo,
                    Cexi_TituloVideo = casoDto.tituloVideo,
                    Cexi_NombreBoton = casoDto.nombreBoton,
                    Cexi_UrlBoton = casoDto.urlBoton,
                    Cexi_Descripcion = casoDto.description,
                    Cexi_UrlIcon = casoDto.urlIcon,
                    Cexi_UrlPerfil = casoDto.urlPerfil,
                    Cexi_UrlCabecera = casoDto.urlCabecera,
                };
                await _casoBL.ActualizarCasoAsync(caso, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarCasos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarCaso(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _casoBL.EliminarCasoAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarCasos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerCaso(int bannID)
        //{
        //    try
        //    {
        //        var Caso = await _CasoBL.ObtenerCasoAsync(bannID); // Llamada asincrónica
        //        return View(Caso); // Asegúrate de tener una vista para mostrar un Caso
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenCaso([FromBody] List<CasoDto> casoDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var casoDto in casoDtos)
                {
                    var caso = new CasoBE
                    {
                        Cexi_ID = casoDto.id,
                        Cexi_Nombre = casoDto.nombre,
                        Cexi_Orden = casoDto.orden,
                        Cexi_Titulo = casoDto.titulo,
                        Cexi_UrlVideo = casoDto.urlVideo,
                        Cexi_TituloVideo = casoDto.tituloVideo,
                        Cexi_NombreBoton = casoDto.nombreBoton,
                        Cexi_UrlBoton = casoDto.urlBoton,
                        Cexi_Descripcion = casoDto.description,
                        Cexi_UrlIcon = casoDto.urlIcon,
                        Cexi_UrlPerfil = casoDto.urlPerfil,
                        Cexi_UrlCabecera = casoDto.urlCabecera,
                    };
                    await _casoBL.ActualizarCasoAsync(caso, usuario, ip,caso.Cexi_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarCasos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
