using Microsoft.AspNetCore.Mvc;
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
                var Cursos = await _cursoBL.ListarCursosAsync(); // Cambio a versi�n asincr�nica
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
                    message = "Ocurri� un error al intentar obtener los Cursos. Por favor, int�ntelo nuevamente."
                  
                });
            }
        }
       
    }
}
