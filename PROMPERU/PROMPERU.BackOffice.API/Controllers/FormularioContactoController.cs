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
    public class FormularioContactoController : Controller
    {
        private readonly ILogger<FormularioContactoController> _logger;    
        private readonly FormularioContactoBL _formularioContactoBL;

        public FormularioContactoController(ILogger<FormularioContactoController> logger, FormularioContactoBL formularioContactoBL)
        {
            _logger = logger;
            _formularioContactoBL = formularioContactoBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarFormularioContactos()
        {
            try
            {
                var FormularioContactos = await _formularioContactoBL.ListarFormularioContactosAsync(); // Cambio a versión asincrónica
                if (FormularioContactos != null && FormularioContactos.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "FormularioContactos obtenidos exitosamente.",
                        FormularioContactos
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron FormularioContactos disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los FormularioContactos. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarFormularioContacto(FormularioContactoDto formularioContactoDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var formularioContacto = new FormularioContactoBE
                {
                    Fcon_ID= formularioContactoDto.id,
                    Fcon_Correo= formularioContactoDto.correo,
                    Fcon_Descripcion= formularioContactoDto.descripcion,
                    Fcon_DescripcionSubTitulo= formularioContactoDto.descripcionSubTitulo,
                    Fcon_Direccion= formularioContactoDto.direccion,
                    Fcon_Horario= formularioContactoDto.horario,    
                    Fcon_NombreBoton= formularioContactoDto.nombreBoton,    
                    Fcon_NombreBotonDos= formularioContactoDto.nombreBotonDos,
                    Fcon_SubTitulo=formularioContactoDto.subTitulo,
                    Fcon_SubTituloDos= formularioContactoDto.subTituloDos,
                    Fcon_Telefono= formularioContactoDto.telefono,
                    Fcon_Titulo= formularioContactoDto.titulo,
                    Fcon_TituloSeccion= formularioContactoDto.tituloSeccion,
                    Fcon_UrlIconBoton= formularioContactoDto.urlIconBoton,
                    Fcon_UrlIconBotonDos= formularioContactoDto.urlIconBotonDos,
                    Fcon_UrlImagen= formularioContactoDto.urlImagen,
                    Fcon_UrlPoliticas= formularioContactoDto.urlPoliticas  

                };
                await _formularioContactoBL.InsertarFormularioContactoAsync(formularioContacto, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarFormularioContactos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarFormularioContacto(FormularioContactoDto formularioContactoDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var formularioContacto = new FormularioContactoBE
                {
                    Fcon_ID = formularioContactoDto.id,
                    Fcon_Correo = formularioContactoDto.correo,
                    Fcon_Descripcion = formularioContactoDto.descripcion,
                    Fcon_DescripcionSubTitulo = formularioContactoDto.descripcionSubTitulo,
                    Fcon_Direccion = formularioContactoDto.direccion,
                    Fcon_Horario = formularioContactoDto.horario,
                    Fcon_NombreBoton = formularioContactoDto.nombreBoton,
                    Fcon_NombreBotonDos = formularioContactoDto.nombreBotonDos,
                    Fcon_SubTitulo = formularioContactoDto.subTitulo,
                    Fcon_SubTituloDos = formularioContactoDto.subTituloDos,
                    Fcon_Telefono = formularioContactoDto.telefono,
                    Fcon_Titulo = formularioContactoDto.titulo,
                    Fcon_TituloSeccion = formularioContactoDto.tituloSeccion,
                    Fcon_UrlIconBoton = formularioContactoDto.urlIconBoton,
                    Fcon_UrlIconBotonDos = formularioContactoDto.urlIconBotonDos,
                    Fcon_UrlImagen = formularioContactoDto.urlImagen,
                    Fcon_UrlPoliticas = formularioContactoDto.urlPoliticas
                };
                await _formularioContactoBL.ActualizarFormularioContactoAsync(formularioContacto, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarFormularioContactos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarFormularioContacto(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _formularioContactoBL.EliminarFormularioContactoAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarFormularioContactos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerFormularioContacto(int bannID)
        //{
        //    try
        //    {
        //        var FormularioContacto = await _FormularioContactoBL.ObtenerFormularioContactoAsync(bannID); // Llamada asincrónica
        //        return View(FormularioContacto); // Asegúrate de tener una vista para mostrar un FormularioContacto
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenFormularioContacto([FromBody] List<FormularioContactoDto> formularioContactoDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var formularioContactoDto in formularioContactoDtos)
                {
                    var formularioContacto = new FormularioContactoBE
                    {
                        Fcon_ID = formularioContactoDto.id,
                        Fcon_Correo = formularioContactoDto.correo,
                        Fcon_Descripcion = formularioContactoDto.descripcion,
                        Fcon_DescripcionSubTitulo = formularioContactoDto.descripcionSubTitulo,
                        Fcon_Direccion = formularioContactoDto.direccion,
                        Fcon_Horario = formularioContactoDto.horario,
                        Fcon_NombreBoton = formularioContactoDto.nombreBoton,
                        Fcon_NombreBotonDos = formularioContactoDto.nombreBotonDos,
                        Fcon_SubTitulo = formularioContactoDto.subTitulo,
                        Fcon_SubTituloDos = formularioContactoDto.subTituloDos,
                        Fcon_Telefono = formularioContactoDto.telefono,
                        Fcon_Titulo = formularioContactoDto.titulo,
                        Fcon_TituloSeccion = formularioContactoDto.tituloSeccion,
                        Fcon_UrlIconBoton = formularioContactoDto.urlIconBoton,
                        Fcon_UrlIconBotonDos = formularioContactoDto.urlIconBotonDos,
                        Fcon_UrlImagen = formularioContactoDto.urlImagen,
                        Fcon_UrlPoliticas = formularioContactoDto.urlPoliticas
                    };
                    await _formularioContactoBL.ActualizarFormularioContactoAsync(formularioContacto, usuario, ip,formularioContacto.Fcon_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarFormularioContactos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
