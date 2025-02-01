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
    public class CalendarioController : Controller
    {
        private readonly ILogger<CalendarioController> _logger;    
        private readonly EmpresaBL _empresaBL;

        public CalendarioController(ILogger<CalendarioController> logger, EmpresaBL empresaBL)
        {
            _logger = logger;
            _empresaBL = empresaBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarEmpresas()
        {
            try
            {
                var Empresas = await _empresaBL.ListarEmpresasAsync(); // Cambio a versión asincrónica
                if (Empresas != null && Empresas.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Empresas obtenidos exitosamente.",
                        Empresas
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Empresas disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Empresas. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarEmpresa(EmpresaDto empresaDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var empresa = new EmpresaBE
                {
                     Egra_ID = empresaDto.id,  
                     Egra_Orden = empresaDto.orden,
                     Egra_Certificaciones = empresaDto.certificaciones,
                     Egra_Correo = empresaDto.correo,
                     Egra_Descripcion = empresaDto.descripcion,
                     Egra_Direccion =   empresaDto.direccion,
                     Egra_Mercados = empresaDto.mercados,
                     Egra_NombreBoton   = empresaDto.nombreBoton,
                     Egra_NombreEmpresa = empresaDto.nombreEmpresa,
                     Egra_PaginaWeb=empresaDto.paginaWeb,
                     Egra_RazonSocial=empresaDto.razonSocial,
                     Egra_RedesSociales=empresaDto.redesSociales,
                     Egra_Region=empresaDto.region,
                     Egra_RUC=empresaDto.rUC,
                     Egra_SegmentosAtendidos=empresaDto.segmentosAtendidos,
                     Egra_TipoEmpresa = empresaDto.tipoEmpresa,
                     Egra_Titulo=empresaDto.titulo,
                     Egra_UrlBoton=empresaDto.urlBoton,
                     Egra_UrlLogo=empresaDto.urlLogo                   
                

                };
                await _empresaBL.InsertarEmpresaAsync(empresa, usuario, ip); // Llamada asincrónica
                return RedirectToAction("ListarEmpresas");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarEmpresa(EmpresaDto empresaDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var empresa = new EmpresaBE
                {
                    Egra_ID = empresaDto.id,
                    Egra_Orden = empresaDto.orden,
                    Egra_Certificaciones = empresaDto.certificaciones,
                    Egra_Correo = empresaDto.correo,
                    Egra_Descripcion = empresaDto.descripcion,
                    Egra_Direccion = empresaDto.direccion,
                    Egra_Mercados = empresaDto.mercados,
                    Egra_NombreBoton = empresaDto.nombreBoton,
                    Egra_NombreEmpresa = empresaDto.nombreEmpresa,
                    Egra_PaginaWeb = empresaDto.paginaWeb,
                    Egra_RazonSocial = empresaDto.razonSocial,
                    Egra_RedesSociales = empresaDto.redesSociales,
                    Egra_Region = empresaDto.region,
                    Egra_RUC = empresaDto.rUC,
                    Egra_SegmentosAtendidos = empresaDto.segmentosAtendidos,
                    Egra_TipoEmpresa = empresaDto.tipoEmpresa,
                    Egra_Titulo = empresaDto.titulo,
                    Egra_UrlBoton = empresaDto.urlBoton,
                    Egra_UrlLogo = empresaDto.urlLogo
                };
                await _empresaBL.ActualizarEmpresaAsync(empresa, usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarEmpresas");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarEmpresa(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _empresaBL.EliminarEmpresaAsync(usuario, ip, id); // Llamada asincrónica
                return RedirectToAction("ListarEmpresas");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerEmpresa(int bannID)
        //{
        //    try
        //    {
        //        var Empresa = await _EmpresaBL.ObtenerEmpresaAsync(bannID); // Llamada asincrónica
        //        return View(Empresa); // Asegúrate de tener una vista para mostrar un Empresa
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenEmpresa([FromBody] List<EmpresaDto> empresaDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var empresaDto in empresaDtos)
                {
                    var empresa = new EmpresaBE
                    {
                        Egra_ID = empresaDto.id,
                        Egra_Orden = empresaDto.orden,
                        Egra_Certificaciones = empresaDto.certificaciones,
                        Egra_Correo = empresaDto.correo,
                        Egra_Descripcion = empresaDto.descripcion,
                        Egra_Direccion = empresaDto.direccion,
                        Egra_Mercados = empresaDto.mercados,
                        Egra_NombreBoton = empresaDto.nombreBoton,
                        Egra_NombreEmpresa = empresaDto.nombreEmpresa,
                        Egra_PaginaWeb = empresaDto.paginaWeb,
                        Egra_RazonSocial = empresaDto.razonSocial,
                        Egra_RedesSociales = empresaDto.redesSociales,
                        Egra_Region = empresaDto.region,
                        Egra_RUC = empresaDto.rUC,
                        Egra_SegmentosAtendidos = empresaDto.segmentosAtendidos,
                        Egra_TipoEmpresa = empresaDto.tipoEmpresa,
                        Egra_Titulo = empresaDto.titulo,
                        Egra_UrlBoton = empresaDto.urlBoton,
                        Egra_UrlLogo = empresaDto.urlLogo
                    };
                    await _empresaBL.ActualizarEmpresaAsync(empresa, usuario, ip,empresa.Egra_ID); // Llamada asincrónica
                }
                return RedirectToAction("ListarEmpresas");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
