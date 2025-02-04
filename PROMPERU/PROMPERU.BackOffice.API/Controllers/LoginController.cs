using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BackOffice.API.Models;
using PROMPERU.BL;
using System.Diagnostics;

namespace PROMPERU.BackOffice.API.Controllers
{

    public class LoginController : Controller
    {
        private readonly ILogger<LoginController> _logger;
        private readonly UsuarioBL _UsuarioBL;

        public LoginController(ILogger<LoginController> logger,UsuarioBL usuarioBL)
        {
            _logger = logger;
            _UsuarioBL = usuarioBL;
        }

        public IActionResult Index()
        {           
            return View();
        }

        // Método para validar el login
        [HttpPost]
        public async Task<IActionResult> Login(string usuario, string contrasenia)
        {
            try
            {
                var usuarioValido = await _UsuarioBL.ValidarUsuarioAsync(usuario, contrasenia);

            if (usuarioValido != null)
            {
                // Guardar datos en la sesión
                HttpContext.Session.SetString("Usuario", usuarioValido.Usua_Usuario);
                HttpContext.Session.SetString("Rol", usuarioValido.Usua_Cargo); 
                return Json(new { success = true, redirectUrl = Url.Action("Index", "Banner") });
            }

                return Json(new { success = false, message = "Usuario o contraseña incorrectos" });
            }
               catch (Exception ex)
            {
                // En caso de error, retorna un mensaje
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CerrarSesion()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme); // Especificamos el esquema
            HttpContext.Session.Clear();
            return Json(new { success = true });
        }
    }
}
