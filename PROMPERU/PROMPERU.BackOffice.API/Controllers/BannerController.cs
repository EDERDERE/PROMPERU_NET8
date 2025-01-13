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
    public class BannerController : Controller
    {
        private readonly ILogger<BannerController> _logger;    
        private readonly BannerBL _bannerBL;

        public BannerController(ILogger<BannerController> logger, BannerBL bannerBL, MultimediaBL multimediaBL)
        {
            _logger = logger;
            _bannerBL = bannerBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarBanners()
        {
            try
            {
                var banners = await _bannerBL.ListarBannersAsync(); // Cambio a versión asincrónica
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
                    message = "Ocurrió un error al intentar obtener los banners. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarBanner(BannerDto bannerDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente
                              
                var banner = new BannerBE
                {
                   Bann_Nombre = bannerDto.description,
                   Bann_URLImagen =bannerDto.imageUrl
                };                

                await _bannerBL.InsertarBannerAsync(banner, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarBanners");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarBanner(BannerDto bannerDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var banner = new BannerBE
                {
                    Bann_ID = id,
                    Bann_Orden = bannerDto.orden,
                    Bann_Nombre = bannerDto.description,
                    Bann_URLImagen = bannerDto.imageUrl
                };
                await _bannerBL.ActualizarBannerAsync(banner, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarBanners");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarBanner(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _bannerBL.EliminarBannerAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarBanners");
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


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenBanner([FromBody] List<BannerDto> bannerDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var bannerDto in bannerDtos)
                {
                    var banner = new BannerBE
                    {
                        Bann_ID = bannerDto.id,
                        Bann_Orden = bannerDto.orden,
                        Bann_Nombre = bannerDto.description,
                        Bann_URLImagen = bannerDto.imageUrl
                    };
                    await _bannerBL.ActualizarBannerAsync(banner, usuario, ip, banner.Bann_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarBanners");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
