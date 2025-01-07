using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BackOffice.API.Models;
using PROMPERU.BL;
using System.Diagnostics;

namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
    public class DashboardController : Controller
    {
        private readonly ILogger<DashboardController> _logger;
        private readonly UsuarioBL _UsuarioBL;

        public DashboardController(ILogger<DashboardController> logger,UsuarioBL usuarioBL)
        {
            _logger = logger;
            _UsuarioBL = usuarioBL;
        }

        public IActionResult Index()
        {
            // Recuperar informaci�n de la sesi�n
            var usuario = HttpContext.Session.GetString("Usuario");
            var rol = HttpContext.Session.GetString("Rol");

            if (usuario == null)
            {
                // Si no hay sesi�n activa, redirigir al Login
                return RedirectToAction("Login", "Login");
            }

            // Pasar informaci�n a la vista
            ViewBag.Usuario = usuario;
            ViewBag.Rol = rol;

            return View();
        }

       
    }
}
