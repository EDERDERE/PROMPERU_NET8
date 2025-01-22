using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BackOffice.API.Models;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;
using System.Diagnostics;

namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
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
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
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

        [HttpPost]
        public async Task<IActionResult> InsertarCurso(CursoDto cursoDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var curso = new CursoBE
                {
                    Curs_ID = cursoDto.id,
                    Curs_Orden = cursoDto.orden,
                    Curs_Titulo = cursoDto.titulo,
                    Curs_TituloSeccion = cursoDto.tituloSeccion,
                    Curs_NombreBoton = cursoDto.nombreBoton,
                    Curs_UrlIconBoton = cursoDto.urlIconBoton,
                    Curs_NombreCurso = cursoDto.nombreCurso,
                    Curs_Objetivo = cursoDto.objetivo,
                    Curs_Descripcion = cursoDto.description,
                    Curs_Modalidad = cursoDto.modalidad,
                    Curs_DuracionHoras = cursoDto.duracionHoras,
                    Curs_FechaInicio = cursoDto.fechaInicio,
                    Curs_FechaFin = cursoDto.fechaFin,
                    Curs_NombreBotonTitulo = cursoDto.nombreBotonTitulo,
                    Curs_UrlIcon = cursoDto.urlIcon,
                    Curs_UrlImagen = cursoDto.urlImagen
                };
                await _cursoBL.InsertarCursoAsync(curso, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarCursos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarCurso(CursoDto cursoDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var Curso = new CursoBE
                {
                    Curs_ID = cursoDto.id,
                    Curs_Orden = cursoDto.orden,
                    Curs_Titulo = cursoDto.titulo,
                    Curs_TituloSeccion = cursoDto.tituloSeccion,
                    Curs_NombreBoton = cursoDto.nombreBoton,
                    Curs_UrlIconBoton = cursoDto.urlIconBoton,
                    Curs_NombreCurso = cursoDto.nombreCurso,
                    Curs_Objetivo = cursoDto.objetivo,
                    Curs_Descripcion = cursoDto.description,
                    Curs_Modalidad = cursoDto.modalidad,
                    Curs_DuracionHoras = cursoDto.duracionHoras,
                    Curs_FechaInicio = cursoDto.fechaInicio == DateTime.MinValue? (DateTime?)null : cursoDto.fechaInicio,
                    Curs_FechaFin = cursoDto.fechaFin == DateTime.MinValue ? (DateTime?)null : cursoDto.fechaFin,
                    Curs_NombreBotonTitulo = cursoDto.nombreBotonTitulo,
                    Curs_UrlIcon = cursoDto.urlIcon,
                    Curs_UrlImagen = cursoDto.urlImagen
                };
                await _cursoBL.ActualizarCursoAsync(Curso, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarCursos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarCurso(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _cursoBL.EliminarCursoAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarCursos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerCurso(int bannID)
        //{
        //    try
        //    {
        //        var Curso = await _CursoBL.ObtenerCursoAsync(bannID); // Llamada asincrónica
        //        return View(Curso); // Asegúrate de tener una vista para mostrar un Curso
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenCurso([FromBody] List<CursoDto> cursoDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var cursoDto in cursoDtos)
                {
                    var curso = new CursoBE
                    {
                        Curs_ID = cursoDto.id,
                        Curs_Orden = cursoDto.orden,
                        Curs_Titulo = cursoDto.titulo,
                        Curs_TituloSeccion = cursoDto.tituloSeccion,
                        Curs_NombreBoton = cursoDto.nombreBoton,
                        Curs_UrlIconBoton = cursoDto.urlIconBoton,
                        Curs_NombreCurso = cursoDto.nombreCurso,
                        Curs_Objetivo = cursoDto.objetivo,
                        Curs_Descripcion = cursoDto.description,
                        Curs_Modalidad = cursoDto.modalidad,
                        Curs_DuracionHoras = cursoDto.duracionHoras,
                        Curs_FechaInicio = cursoDto.fechaInicio,
                        Curs_FechaFin = cursoDto.fechaFin,
                        Curs_NombreBotonTitulo = cursoDto.nombreBotonTitulo,
                        Curs_UrlIcon = cursoDto.urlIcon,
                        Curs_UrlImagen = cursoDto.urlImagen
                    };
                    await _cursoBL.ActualizarCursoAsync(curso, usuario, ip, curso.Curs_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarCursos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
