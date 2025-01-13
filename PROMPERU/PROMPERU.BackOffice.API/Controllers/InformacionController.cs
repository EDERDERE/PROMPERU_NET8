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

        [HttpPost]
        public async Task<IActionResult> InsertarInformacion(InformacionDto informacionDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente
                              
                var informacion = new InformacionBE
                {
                    Info_Titulo = informacionDto.titulo,
                    Info_Descripcion = informacionDto.description,
                    Info_URLPortada = informacionDto.urlPortada,
                    Info_URLVideo = informacionDto.urlVideo
                };                

                await _informacionBL.InsertarInformacionAsync(informacion, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarInformacions");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarInformacion(InformacionDto informacionDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var informacion = new InformacionBE
                {
                    Info_ID = id,
                    Info_Titulo = informacionDto.titulo,
                    Info_Descripcion = informacionDto.description,
                    Info_URLPortada = informacionDto.urlPortada,
                    Info_URLVideo = informacionDto.urlVideo
                };
                await _informacionBL.ActualizarInformacionAsync(informacion, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarInformacions");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarInformacion(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _informacionBL.EliminarInformacionAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarInformacions");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        //[HttpGet]
        //public async Task<IActionResult> ObtenerBanner(int bannID)
        //{
        //    try
        //    {
        //        var banner = await _bannerBL.ObtenerBannerAsync(bannID); // Llamada asincrónica
        //        return View(banner); // Asegúrate de tener una vista para mostrar un banner
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}
    }
}
