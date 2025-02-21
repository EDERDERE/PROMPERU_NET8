using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;

namespace PROMPERU.FrontOffice.WEB.Controllers
{

    public class CursoController : Controller
    {
        private readonly ILogger<CursoController> _logger;    
        private readonly CursoBL _cursoBL;

        public CursoController(ILogger<CursoController> logger, CursoBL cursoBL)
        {
            _logger = logger;
            _cursoBL = cursoBL;
        }

        public IActionResult Index()
        {            
          return View(); // Aseg�rate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarCursos()
        {
            try
            {
                var cursos = await _cursoBL.ListarCursosAsync(); // Cambio a versi�n asincr�nica
                var cursoFiltro = cursos.Where(x => x.Teve_ID == 1).ToList();
                if (cursoFiltro != null && cursoFiltro.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Cursos obtenidos exitosamente.",
                        cursos = cursoFiltro
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
                    message = "Ocurri� un error al intentar obtener los Cursos. Por favor, int�ntelo nuevamente."
                  
                });
            }
        }

        public async Task<IActionResult> ListarTipoEventos()
        {
            try
            {
                var TipoEventos = await _cursoBL.ListarTipoEventosAsync(); // Cambio a versi�n asincr�nica
                if (TipoEventos != null && TipoEventos.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "TipoEventos obtenidos exitosamente.",
                        TipoEventos
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron TipoEventos disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurri� un error al intentar obtener los TipoEventos. Por favor, int�ntelo nuevamente."

                });
            }
        }

    }
}
