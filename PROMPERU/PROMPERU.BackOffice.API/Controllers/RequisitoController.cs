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
    public class RequisitoController : Controller
    {
        private readonly ILogger<RequisitoController> _logger;    
        private readonly RequisitoBL _requisitoBL;

        public RequisitoController(ILogger<RequisitoController> logger, RequisitoBL requisitoBL)
        {
            _logger = logger;
            _requisitoBL = requisitoBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarRequisitos()
        {
            try
            {
                var requisitos = await _requisitoBL.ListarRequisitosAsync(); // Cambio a versión asincrónica
                if (requisitos != null && requisitos.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Requisitos obtenidos exitosamente.",
                        requisitos
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron requisitos disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los requisitos. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarRequisito(RequisitoDto requisitoDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente
                              
                var requisito = new RequisitoBE
                {
                    Requ_Orden = requisitoDto.orden,
                    Requ_Titulo = requisitoDto.titulo,
                    Requ_Nombre = requisitoDto.nombre,
                    Requ_Descripcion = requisitoDto.description,
                    Requ_URLIcon =requisitoDto.urlIcon,
                    Requ_URLImagen = requisitoDto.urlImagen
                };                

                await _requisitoBL.InsertarRequisitoAsync(requisito, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarRequisitos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarRequisito(RequisitoDto requisitoDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var requisito = new RequisitoBE
                {
                    Requ_ID = id,
                    Requ_Orden = requisitoDto.orden,
                    Requ_Titulo = requisitoDto.titulo,
                    Requ_Nombre = requisitoDto.nombre,
                    Requ_Descripcion = requisitoDto.description,
                    Requ_URLIcon = requisitoDto.urlIcon,
                    Requ_URLImagen = requisitoDto.urlImagen
                };
                await _requisitoBL.ActualizarRequisitoAsync(requisito, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarRequisitos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarRequisito(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _requisitoBL.EliminarRequisitoAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarRequisitos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> Obtenerrequisito(int bannID)
        //{
        //    try
        //    {
        //        var requisito = await _requisitoBL.ObtenerrequisitoAsync(bannID); // Llamada asincrónica
        //        return View(requisito); // Asegúrate de tener una vista para mostrar un requisito
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenRequisito([FromBody] List<RequisitoDto> requisitoDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var requisitoDto in requisitoDtos)
                {
                    var requisito = new RequisitoBE
                    {
                        Requ_ID = requisitoDto.id,
                        Requ_Orden = requisitoDto.orden,
                        Requ_Titulo = requisitoDto.titulo,
                        Requ_Descripcion = requisitoDto.description,
                        Requ_URLIcon = requisitoDto.urlIcon,
                        Requ_URLImagen = requisitoDto.urlImagen
                    };
                    await _requisitoBL.ActualizarRequisitoAsync(requisito, usuario, ip, requisito.Requ_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarRequisitos");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
