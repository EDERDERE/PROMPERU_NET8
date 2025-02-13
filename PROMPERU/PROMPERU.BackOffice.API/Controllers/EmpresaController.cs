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
    public class EmpresaController : Controller
    {
        private readonly ILogger<EmpresaController> _logger;
        private readonly EmpresaBL _empresaBL;
        private readonly RegionBL _regionBL;
        private readonly TipoEmpresaBL _tipoEmpresaBL;
        public EmpresaController(ILogger<EmpresaController> logger, EmpresaBL empresaBL, RegionBL regionBL,TipoEmpresaBL tipoEmpresaBL )
        {
            _logger = logger;
            _empresaBL = empresaBL;
            _regionBL = regionBL;
            _tipoEmpresaBL = tipoEmpresaBL;
        }

        public IActionResult Index()
        {            
          return View(); // Aseg�rate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarEmpresas()
        {
            try
            {
                var Empresas = await _empresaBL.ListarEmpresasAsync(); // Cambio a versi�n asincr�nica
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
                    message = "Ocurri� un error al intentar obtener los Empresas. Por favor, int�ntelo nuevamente."
                  
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
                     Egra_UrlLogo=empresaDto.urlLogo,
                    ID_Region = empresaDto.id_region,
                    ID_TipoEmpresa = empresaDto.id_tipoempresa


                };
                await _empresaBL.InsertarEmpresaAsync(empresa, usuario, ip); // Llamada asincr�nica
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
                    Egra_UrlLogo = empresaDto.urlLogo,
                    ID_Region = empresaDto.id_region,
                    ID_TipoEmpresa=empresaDto.id_tipoempresa
                };
                await _empresaBL.ActualizarEmpresaAsync(empresa, usuario, ip, id); // Llamada asincr�nica
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
                await _empresaBL.EliminarEmpresaAsync(usuario, ip, id); // Llamada asincr�nica
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
        //        var Empresa = await _EmpresaBL.ObtenerEmpresaAsync(bannID); // Llamada asincr�nica
        //        return View(Empresa); // Aseg�rate de tener una vista para mostrar un Empresa
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
                        Egra_UrlLogo = empresaDto.urlLogo,
                        ID_Region = empresaDto.id_region,
                        ID_TipoEmpresa = empresaDto.id_tipoempresa
                    };
                    await _empresaBL.ActualizarEmpresaAsync(empresa, usuario, ip,empresa.Egra_ID); // Llamada asincr�nica
                }
                return RedirectToAction("ListarEmpresas");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
        public async Task<IActionResult> ListarRegiones()
        {
            try
            {
                var regions = await _regionBL.ListarRegionsAsync(); // Cambio a versi�n asincr�nica
                if (regions != null && regions.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Regiones obtenidos exitosamente.",
                        regions
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Regiones disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurri� un error al intentar obtener los Regiones. Por favor, int�ntelo nuevamente."

                });
            }
        }
        public async Task<IActionResult> ListarTipoEmpresas()
        {
            try
            {
                var tipoEmpresas = await _tipoEmpresaBL.ListarTipoEmpresasAsync(); // Cambio a versi�n asincr�nica
                if (tipoEmpresas != null && tipoEmpresas.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "TipoEmpresas obtenidos exitosamente.",
                        tipoEmpresas
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron TipoEmpresas disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurri� un error al intentar obtener los TipoEmpresas. Por favor, int�ntelo nuevamente."

                });
            }
        }
    }
}
