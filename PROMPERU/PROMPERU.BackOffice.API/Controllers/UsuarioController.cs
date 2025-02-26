using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;

namespace PROMPERU.BackOffice.API.Controllers
{

    public class UsuarioController : Controller
    {
        private readonly ILogger<UsuarioController> _logger;
        private readonly UsuarioBL _usuarioBL;     


        public UsuarioController(ILogger<UsuarioController> logger,UsuarioBL usuarioBL)
        {
            _logger = logger;
            _usuarioBL = usuarioBL;           
        }

        public IActionResult Index()
        {
            var cargo = HttpContext.Session.GetString("Rol");// Usuario autenticado
            ViewBag.Cargo = cargo;
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> ListarUsuarios()
        {
            try
            {
                var ID = HttpContext.Session.GetInt32("IDUsuario");// Usuario autenticado              
                var cargo = HttpContext.Session.GetString("Rol");// Usuario autenticado

                var usuarios = await _usuarioBL.ListarUsuariosAsync(cargo, Convert.ToInt32(ID)); // Cambio a versión asincrónica
                if (usuarios != null && usuarios.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Usurios obtenidos exitosamente.",
                        usuarios
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron usurios disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los usurios. Por favor, inténtelo nuevamente."

                });
            }
        }
        [HttpPost]
        public async Task<IActionResult> InsertarUsuario(UsuarioDto usuarioDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                var cargo = HttpContext.Session.GetString("Rol");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var usuarioBE = new UsuarioBE
                {
                   Usua_ID= usuarioDto.id,
                   Usua_Cargo= usuarioDto.cargo,
                   Usua_Contrasenia= usuarioDto.contrasenia,
                   Usua_Usuario= usuarioDto.usuario,
                };

                await _usuarioBL.RegistrarUsuarioAsync(usuarioBE,cargo, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarUsuarios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerUsuario(int id)
        {
            try
            {             
                var usuario = await _usuarioBL.ObtenerUsuarioPorIdAsync(id); // Cambio a versión asincrónica
                if (usuario != null)
                {
                    return Json(new
                    {
                        success = true,
                        message = "Usurio obtenidos exitosamente.",
                        usuario
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron usurio disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los usurio. Por favor, inténtelo nuevamente."

                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarUsuario(UsuarioDto usuarioDto, int id)
        {
            try
            {
                var usuarioLogin = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var usuario = new UsuarioBE
                {
                    Usua_ID = id,
                    Usua_Usuario = usuarioDto.usuario,
                    Usua_Contrasenia = usuarioDto.contrasenia                   
                };
                await _usuarioBL .ActualizarUsuarioAsync(usuario, usuarioLogin, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarUsuarios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
