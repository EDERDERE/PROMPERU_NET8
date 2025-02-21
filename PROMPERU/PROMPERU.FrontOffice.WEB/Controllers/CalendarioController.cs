using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.DA;

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
                var cursos = await _cursoBL.ListarCursosAsync();

                var cursosFiltrados = cursos
                    .Where(c => c.Curs_EsHabilitado == 1) // Filtramos solo los cursos habilitados
                    .Select(c => new CursoBE
                    {
                        Curs_ID = c.Curs_ID,
                        Curs_Orden = c.Curs_Orden,
                        Curs_Titulo = c.Curs_Titulo,
                        Curs_TituloSeccion = c.Curs_TituloSeccion,
                        Curs_NombreBotonTitulo = c.Curs_NombreBotonTitulo,
                        Curs_UrlIconBoton = c.Curs_UrlIconBoton,
                        Curs_NombreCurso = c.Curs_NombreCurso,
                        Curs_Objetivo = c.Curs_Objetivo,
                        Curs_Descripcion = c.Curs_Descripcion,
                        Curs_Modalidad = c.Curs_Modalidad,
                        Curs_DuracionHoras = c.Curs_DuracionHoras,
                        Curs_FechaInicio = c.Curs_FechaInicio,
                        Curs_FechaFin = c.Curs_FechaFin,
                        Curs_NombreBoton = c.Curs_NombreBoton,
                        Curs_UrlIcon = c.Curs_UrlIcon,
                        Curs_UrlImagen = c.Curs_UrlImagen,
                        Curs_LinkBoton = c.Curs_LinkBoton,
                        Curs_EsHabilitado = c.Curs_EsHabilitado,
                        Curs_Evento = c.Curs_Evento,
                        Teve_ID = c.Teve_ID,
                        Tmod_ID = c.Tmod_ID,
                        Curs_TituloCalendario = c.Curs_TituloCalendario,
                        Curs_DescripcionCalendario = c.Curs_DescripcionCalendario,
                        TipoModalidadList = c.TipoModalidadList
                            .Where(tm => tm.Tmod_ID == 2 || tm.Tmod_ID == 3) // Filtramos solo modalidades 2 y 3
                            .ToList() // Convertimos a lista para mantener todas las modalidades
                    })
                    .Where(c => c.TipoModalidadList.Count > 0) // Nos aseguramos de que tenga al menos una modalidad
                    .ToList();


                if (cursos != null && cursos.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Cursos obtenidos exitosamente.",
                        Cursos= cursosFiltrados
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
