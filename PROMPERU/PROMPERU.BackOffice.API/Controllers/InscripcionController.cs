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
    public class InscripcionController : Controller
    {
        private readonly ILogger<InscripcionController> _logger;    
        private readonly InscripcionBL _InscripcionBL;

        public InscripcionController(ILogger<InscripcionController> logger, InscripcionBL inscripcionBL)
        {
            _logger = logger;
            _InscripcionBL = inscripcionBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarInscripcions()
        {
            try
            {
                var inscripcions = await _InscripcionBL.ListarInscripcionsAsync(); // Cambio a versión asincrónica
                if (inscripcions != null && inscripcions.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Inscripcions obtenidos exitosamente.",
                        inscripcions
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Inscripcions disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Inscripcions. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarInscripcion(InscripcionDto inscripcionDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente
                              
                var inscripcion = new InscripcionBE
                {              
                    Insc_Orden = inscripcionDto.orden,
                    Insc_Titulo = inscripcionDto.titulo,
                    Insc_Contenido = inscripcionDto.contenido,
                    Insc_NombreBoton = inscripcionDto.nombreBoton,
                    Insc_URLIconBoton =inscripcionDto.urlIconBoton,
                    Insc_Paso = inscripcionDto.paso,          
                    Insc_TituloPaso = inscripcionDto.tituloPaso,
                    Insc_Descripcion =inscripcionDto.description,
                    Insc_URLImagen = inscripcionDto.urlImagen
                };                

                await _InscripcionBL.InsertarInscripcionAsync(inscripcion, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarInscripcions");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarInscripcion(InscripcionDto inscripcionDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var Inscripcion = new InscripcionBE
                {
                    Insc_ID = inscripcionDto.id,
                    Insc_Orden = inscripcionDto.orden,
                    Insc_Titulo = inscripcionDto.titulo,
                    Insc_Contenido = inscripcionDto.contenido,
                    Insc_NombreBoton = inscripcionDto.nombreBoton,
                    Insc_URLIconBoton = inscripcionDto.urlIconBoton,
                    Insc_Paso = inscripcionDto.paso,
                    Insc_TituloPaso = inscripcionDto.tituloPaso,
                    Insc_Descripcion = inscripcionDto.description,
                    Insc_URLImagen = inscripcionDto.urlImagen
                };
                await _InscripcionBL.ActualizarInscripcionAsync(Inscripcion, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarInscripcions");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarInscripcion(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _InscripcionBL.EliminarInscripcionAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarInscripcions");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerInscripcion(int bannID)
        //{
        //    try
        //    {
        //        var Inscripcion = await _InscripcionBL.ObtenerInscripcionAsync(bannID); // Llamada asincrónica
        //        return View(Inscripcion); // Asegúrate de tener una vista para mostrar un Inscripcion
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenInscripcion([FromBody] List<InscripcionDto> inscripcionDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var inscripcionDto in inscripcionDtos)
                {
                    var inscripcion = new InscripcionBE
                    {
                        Insc_ID = inscripcionDto.id,
                        Insc_Orden = inscripcionDto.orden,
                        Insc_Titulo = inscripcionDto.titulo,
                        Insc_Contenido = inscripcionDto.contenido,
                        Insc_NombreBoton = inscripcionDto.nombreBoton,
                        Insc_URLIconBoton = inscripcionDto.urlIconBoton,
                        Insc_Paso = inscripcionDto.paso,
                        Insc_TituloPaso = inscripcionDto.tituloPaso,
                        Insc_Descripcion = inscripcionDto.description,
                        Insc_URLImagen = inscripcionDto.urlImagen
                    };
                    await _InscripcionBL.ActualizarInscripcionAsync(inscripcion, usuario, ip, inscripcion.Insc_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarInscripcions");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
