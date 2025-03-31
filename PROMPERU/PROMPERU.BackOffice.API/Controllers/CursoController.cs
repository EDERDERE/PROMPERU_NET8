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
        public async Task<IActionResult> InsertarCurso(CursoDto cursoDto,List<TipoModalidadBE> modalidadesSeleccionadas)
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
                    Curs_CodigoCurso = cursoDto.codigoCurso,
                    Curs_Objetivo = cursoDto.objetivo,
                    Curs_Descripcion = cursoDto.description,
                    Curs_Modalidad = cursoDto.modalidad,                
                    Curs_NombreBotonTitulo = cursoDto.nombreBotonTitulo,
                    Curs_UrlIcon = cursoDto.urlIcon,
                    Curs_UrlImagen = cursoDto.urlImagen,
                    Curs_LinkBoton = cursoDto.linkBoton,
                    Curs_EsHabilitado = cursoDto.esHabilitado,
                    Teve_ID = cursoDto.id_evento,
                    Tmod_ID = 0,
                    Curs_TituloCalendario = cursoDto.tituloCalendario,
                    Curs_DescripcionCalendario = cursoDto.descriptionCalendario,
                    TipoModalidadList = modalidadesSeleccionadas
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
                    Curs_CodigoCurso = cursoDto.codigoCurso,
                    Curs_Objetivo = cursoDto.objetivo,
                    Curs_Descripcion = cursoDto.description,
                    Curs_Modalidad = cursoDto.modalidad,
                    Curs_NombreBotonTitulo = cursoDto.nombreBotonTitulo,
                    Curs_UrlIcon = cursoDto.urlIcon,
                    Curs_UrlImagen = cursoDto.urlImagen,
                    Curs_LinkBoton = cursoDto.linkBoton,
                    Curs_EsHabilitado = cursoDto.esHabilitado,
                    Teve_ID = cursoDto.id_evento,
                    Tmod_ID = cursoDto.id_modalidad,
                    Curs_TituloCalendario = cursoDto.tituloCalendario,
                    Curs_DescripcionCalendario = cursoDto.descriptionCalendario,
                    TipoModalidadList = cursoDto.ModalidadList
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
                        Curs_CodigoCurso = cursoDto.codigoCurso,
                        Curs_Objetivo = cursoDto.objetivo,
                        Curs_Descripcion = cursoDto.description,
                        Curs_Modalidad = cursoDto.modalidad,            
                        Curs_NombreBotonTitulo = cursoDto.nombreBotonTitulo,
                        Curs_UrlIcon = cursoDto.urlIcon,
                        Curs_UrlImagen = cursoDto.urlImagen,
                        Curs_LinkBoton = cursoDto.linkBoton,
                        Curs_EsHabilitado = cursoDto.esHabilitado,
                        Teve_ID = cursoDto.id_evento,
                        Tmod_ID = cursoDto.id_modalidad,
                        Curs_TituloCalendario = cursoDto.tituloCalendario,
                        Curs_DescripcionCalendario = cursoDto.descriptionCalendario
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
        [HttpGet]
        public async Task<IActionResult> ListarTipoEventos()
        {
            try
            {
                var TipoEventos = await _cursoBL.ListarTipoEventosAsync(); // Cambio a versión asincrónica
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
                    message = "Ocurrió un error al intentar obtener los TipoEventos. Por favor, inténtelo nuevamente."

                });
            }
        }
        [HttpGet]
        public async Task<IActionResult> ListarTipoModalidads()
        {
            try
            {
                var TipoModalidads = await _cursoBL.ListarTipoModalidadsAsync(); // Cambio a versión asincrónica
                if (TipoModalidads != null && TipoModalidads.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "TipoModalidads obtenidos exitosamente.",
                        TipoModalidads
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron TipoModalidads disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los TipoModalidads. Por favor, inténtelo nuevamente."

                });
            }
        }
    }
}
