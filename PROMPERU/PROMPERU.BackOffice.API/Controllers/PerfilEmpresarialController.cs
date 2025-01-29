using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;


namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
    public class PerfilEmpresarialController : Controller
    {
        private readonly ILogger<PerfilEmpresarialController> _logger;    
        private readonly PerfilEmpresarialBL _perfilEmpresarialBL;

        public PerfilEmpresarialController(ILogger<PerfilEmpresarialController> logger, PerfilEmpresarialBL perfilEmpresarialBL)
        {
            _logger = logger;
            _perfilEmpresarialBL = perfilEmpresarialBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarPerfilEmpresarials()
        {
            try
            {
                var PerfilEmpresarials = await _perfilEmpresarialBL.ListarPerfilEmpresarialsAsync(); // Cambio a versión asincrónica
                if (PerfilEmpresarials != null && PerfilEmpresarials.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "PerfilEmpresarials obtenidos exitosamente.",
                        PerfilEmpresarials
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron PerfilEmpresarials disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los PerfilEmpresarials. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarPerfilEmpresarial(PerfilEmpresarialDto perfilEmpresarialDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var PerfilEmpresarial = new PerfilEmpresarialBE
                {
                     Pemp_ID = perfilEmpresarialDto.id,
                     Pemp_Nombre = perfilEmpresarialDto.nombre,
                     Pemp_Descripcion = perfilEmpresarialDto.descripcion,
                     Pemp_UrlImagen = perfilEmpresarialDto.urlImagen
                

                };
                await _perfilEmpresarialBL.InsertarPerfilEmpresarialAsync(PerfilEmpresarial, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarPerfilEmpresarials");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarPerfilEmpresarial(PerfilEmpresarialDto perfilEmpresarialDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var PerfilEmpresarial = new PerfilEmpresarialBE
                {
                    Pemp_ID = perfilEmpresarialDto.id,
                    Pemp_Nombre = perfilEmpresarialDto.nombre,
                    Pemp_Descripcion = perfilEmpresarialDto.descripcion,                   
                    Pemp_UrlImagen = perfilEmpresarialDto.urlImagen

                };
                await _perfilEmpresarialBL.ActualizarPerfilEmpresarialAsync(PerfilEmpresarial, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarPerfilEmpresarials");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarPerfilEmpresarial(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _perfilEmpresarialBL.EliminarPerfilEmpresarialAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarPerfilEmpresarials");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerPerfilEmpresarial(int bannID)
        //{
        //    try
        //    {
        //        var PerfilEmpresarial = await _PerfilEmpresarialBL.ObtenerPerfilEmpresarialAsync(bannID); // Llamada asincrónica
        //        return View(PerfilEmpresarial); // Asegúrate de tener una vista para mostrar un PerfilEmpresarial
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenPerfilEmpresarial([FromBody] List<PerfilEmpresarialDto> PerfilEmpresarialDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var PerfilEmpresarialDto in PerfilEmpresarialDtos)
                {
                    var PerfilEmpresarial = new PerfilEmpresarialBE
                    {
                        Pemp_ID = PerfilEmpresarialDto.id,
                        Pemp_Nombre = PerfilEmpresarialDto.nombre,
                        Pemp_Descripcion = PerfilEmpresarialDto.descripcion,
                        Pemp_UrlImagen = PerfilEmpresarialDto.urlImagen

                    };
                    await _perfilEmpresarialBL.ActualizarPerfilEmpresarialAsync(PerfilEmpresarial, usuario, ip,PerfilEmpresarial.Pemp_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarPerfilEmpresarials");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
