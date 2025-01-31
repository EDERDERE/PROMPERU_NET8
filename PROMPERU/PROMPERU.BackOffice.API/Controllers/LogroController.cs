using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;


namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
    public class LogroController : Controller
    {
        private readonly ILogger<LogroController> _logger;    
        private readonly LogroBL _logroBL;

        public LogroController(ILogger<LogroController> logger, LogroBL logroBL)
        {
            _logger = logger;
            _logroBL = logroBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarLogros()
        {
            try
            {
                var Logros = await _logroBL.ListarLogrosAsync(); // Cambio a versión asincrónica
                if (Logros != null && Logros.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Logros obtenidos exitosamente.",
                        Logros
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Logros disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Logros. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarLogro(LogroDto logroDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var Logro = new LogroBE
                {
                     Logr_ID = logroDto.id,
                     Logr_Nombre = logroDto.nombre,
                     Logr_Descripcion = logroDto.descripcion,
                     Logr_UrlIcon = logroDto.urlIcon                    
                

                };
                await _logroBL.InsertarLogroAsync(Logro, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarLogros");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarLogro(LogroDto logroDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var logro = new LogroBE
                {
                    Logr_ID = logroDto.id,
                    Logr_Nombre = logroDto.nombre,
                    Logr_Descripcion = logroDto.descripcion,
                    Logr_UrlIcon = logroDto.urlIcon

                };
                await _logroBL.ActualizarLogroAsync(logro, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarLogros");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarLogro(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _logroBL.EliminarLogroAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarLogros");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerLogro(int bannID)
        //{
        //    try
        //    {
        //        var Logro = await _LogroBL.ObtenerLogroAsync(bannID); // Llamada asincrónica
        //        return View(Logro); // Asegúrate de tener una vista para mostrar un Logro
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenLogro([FromBody] List<LogroDto> logroDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var logroDto in logroDtos)
                {
                    var logro = new LogroBE
                    {
                        Logr_ID = logroDto.id,
                        Logr_Nombre = logroDto.nombre,
                        Logr_Descripcion = logroDto.descripcion,
                        Logr_UrlIcon = logroDto.urlIcon

                    };
                    await _logroBL.ActualizarLogroAsync(logro, usuario, ip,logro.Logr_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarLogros");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
