using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BackOffice.API.Models;
using PROMPERU.BL;
using System.Diagnostics;

namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
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
            var usuarioValido = await _UsuarioBL.ValidarUsuarioAsync(usuario, contrasenia);

            if (usuarioValido != null)
            {
                // Guardar datos en la sesión
                HttpContext.Session.SetString("Usuario", usuarioValido.Usua_Usuario);
                HttpContext.Session.SetString("Rol", usuarioValido.Usua_Cargo); // Ejemplo
                // Lógica de autenticación exitosa, puedes usar sesiones o JWT
                return RedirectToAction("Index", "Dashboard");
            }

            // Si no es válido, mostrar mensaje de error
            ViewBag.Error = "Usuario o contraseña incorrectos";
            return View();
        }
    }
}
