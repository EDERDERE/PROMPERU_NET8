using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;


namespace PROMPERU.FrontOffice.WEB.Controllers
{

    public class LogroController : Controller
    {
        private readonly ILogger<LogroController> _logger;    
        private readonly LogroBL _logroBL;
        private readonly EmpresaBL _empresaBL;
        private readonly CursoBL _cursoBL;

        public LogroController(ILogger<LogroController> logger, LogroBL logroBL,EmpresaBL empresaBL,CursoBL cursoBL)
        {
            _logger = logger;
            _logroBL = logroBL;
            _empresaBL = empresaBL;
            _cursoBL = cursoBL;
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
                var listEmpresasGraduadas = await _empresaBL.ListarEmpresasAsync(); 
                var listCursos = (await _cursoBL.ListarCursosAsync()).Where(x => x.Curs_EsHabilitado == 1).ToList(); 
                
                if (Logros != null && Logros.Any())
                {
                    // Contadores
                    int countEmpresasGraduadas = listEmpresasGraduadas?.Count ?? 0;
                    int countTestRealizados = 0;
                    int countCursosActuales = listCursos?.Count ?? 0;

                    // Mapeo de logros con el nuevo campo "contado"
                    var logrosConContador = Logros.Select(l => new
                    {
                        l.Logr_ID,
                        l.Logr_Nombre,
                        l.Logr_Descripcion,
                        l.Logr_UrlIcon,
                        Logr_Contador = l.Logr_Nombre.Contains("Empresas Graduadas") ? countEmpresasGraduadas :
                                  l.Logr_Nombre.Contains("Test Realizados") ? countTestRealizados :
                                  l.Logr_Nombre.Contains("Cursos Actuales") ? countCursosActuales : 0
                    }).ToList();

                    return Json(new
                    {
                        success = true,
                        message = "Logros obtenidos exitosamente.",
                        Logros = logrosConContador
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
