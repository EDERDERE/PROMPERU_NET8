using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
    public class CalendarioController : Controller
    {
        private readonly ILogger<CalendarioController> _logger;    
        private readonly LogoBL _logoBL;
        private readonly CursoBL _cursoBL;

        public CalendarioController(ILogger<CalendarioController> logger, LogoBL logoBL, CursoBL cursoBL)
        {
            _logger = logger;
            _logoBL = logoBL;
            _cursoBL = cursoBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        public async Task<IActionResult> ListarCursos()
        {
            try
            {
                var Cursos = await _cursoBL.ListarCursosAsync(); // Cambio a versión asincrónica
                if (Cursos != null && Cursos.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Cursos obtenidos exitosamente.",
                        Cursos
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Cursos disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Cursos. Por favor, inténtelo nuevamente."

                });
            }
        }
    }
}
