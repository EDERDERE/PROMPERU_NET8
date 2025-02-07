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
    public class BeneficioController : Controller
    {
        private readonly ILogger<BeneficioController> _logger;    
        private readonly BeneficioBL _beneficioBL;

        public BeneficioController(ILogger<BeneficioController> logger, BeneficioBL beneficioBL)
        {
            _logger = logger;
            _beneficioBL = beneficioBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarBeneficios()
        {
            try
            {
                var Beneficios = await _beneficioBL.ListarBeneficiosAsync(); // Cambio a versión asincrónica
                if (Beneficios != null && Beneficios.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Beneficios obtenidos exitosamente.",
                        Beneficios
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Beneficios disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Beneficios. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarBeneficio(BeneficioDto beneficioDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var beneficio = new BeneficioBE
                {
                    Bene_ID = beneficioDto.id,
                    Bene_Orden = beneficioDto.orden,
                    Bene_Titulo = beneficioDto.titulo,
                    Bene_Nombre = beneficioDto.nombre,
                    Bene_Descripcion = beneficioDto.description,
                    Bene_URLImagen = beneficioDto.urlImagen,
                    Bene_URLIcon = beneficioDto.urlIcon,
                    Bene_NombreBoton=beneficioDto.nombreBoton,
                    Bene_URLImagenBanner = beneficioDto.urlImagenBanner
                };
                await _beneficioBL.InsertarBeneficioAsync(beneficio, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarBeneficios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarBeneficio(BeneficioDto beneficioDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var beneficio = new BeneficioBE
                {
                    Bene_ID = beneficioDto.id,
                    Bene_Orden = beneficioDto.orden,
                    Bene_Titulo = beneficioDto.titulo,
                    Bene_Nombre = beneficioDto.nombre,
                    Bene_Descripcion = beneficioDto.description,
                    Bene_URLImagen = beneficioDto.urlImagen,
                    Bene_URLIcon = beneficioDto.urlIcon,
                    Bene_NombreBoton = beneficioDto.nombreBoton,
                    Bene_URLImagenBanner=beneficioDto.urlImagenBanner
                };
                await _beneficioBL.ActualizarBeneficioAsync(beneficio, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarBeneficios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarBeneficio(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _beneficioBL.EliminarBeneficioAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarBeneficios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerBeneficio(int bannID)
        //{
        //    try
        //    {
        //        var Beneficio = await _BeneficioBL.ObtenerBeneficioAsync(bannID); // Llamada asincrónica
        //        return View(Beneficio); // Asegúrate de tener una vista para mostrar un Beneficio
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenBeneficio([FromBody] List<BeneficioDto> beneficioDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var beneficioDto in beneficioDtos)
                {
                    var beneficio = new BeneficioBE
                    {
                        Bene_ID = beneficioDto.id,
                        Bene_Orden = beneficioDto.orden,
                        Bene_Titulo = beneficioDto.titulo,
                        Bene_Nombre = beneficioDto.nombre,
                        Bene_Descripcion = beneficioDto.description,
                        Bene_URLImagen = beneficioDto.urlImagen,
                        Bene_URLIcon = beneficioDto.urlIcon,
                        Bene_NombreBoton = beneficioDto.nombreBoton,
                        Bene_URLImagenBanner = beneficioDto.urlImagenBanner
                    };
                    await _beneficioBL.ActualizarBeneficioAsync(beneficio, usuario, ip, beneficio.Bene_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarBeneficios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
