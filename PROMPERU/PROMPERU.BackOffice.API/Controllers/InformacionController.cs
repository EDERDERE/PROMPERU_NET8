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
        private readonly BannerBL _bannerBL;
        private readonly MultimediaBL _multimediaBL;

        public InformacionController(ILogger<InformacionController> logger, BannerBL bannerBL, MultimediaBL multimediaBL)
        {
            _logger = logger;
            _bannerBL = bannerBL;
            _multimediaBL = multimediaBL;
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                var banners = await _bannerBL.ListarBannersAsync(); // Cambio a versión asincrónica
                return View(banners);
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error"); // Vista de error
            }
        }

        [HttpGet]
        public async Task<IActionResult> ListarBanners()
        {
            try
            {
                var banners = await _bannerBL.ListarBannersAsync(); // Cambio a versión asincrónica
                return Json(banners); // Asegúrate de tener una vista asociada
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error"); // Vista de error
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
        public async Task<IActionResult> ActualizarBanner(BannerBE banner, int id)
        {
            try
            {
                string usuario = User.Identity.Name;
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
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
                string usuario = User.Identity.Name;
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
    }
}
