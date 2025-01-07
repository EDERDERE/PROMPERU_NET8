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

        // M�todo para validar el login
        [HttpPost]
        public async Task<IActionResult> Login(string usuario, string contrasenia)
        {
            var usuarioValido = await _UsuarioBL.ValidarUsuarioAsync(usuario, contrasenia);

            if (usuarioValido != null)
            {
                // Guardar datos en la sesi�n
                HttpContext.Session.SetString("Usuario", usuarioValido.Usua_Usuario);
                HttpContext.Session.SetString("Rol", usuarioValido.Usua_Cargo); // Ejemplo
                // L�gica de autenticaci�n exitosa, puedes usar sesiones o JWT
                return RedirectToAction("Index", "Dashboard");
            }

            // Si no es v�lido, mostrar mensaje de error
            ViewBag.Error = "Usuario o contrase�a incorrectos";
            return View();
        }
    }
}
