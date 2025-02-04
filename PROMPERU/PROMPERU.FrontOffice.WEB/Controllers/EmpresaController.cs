using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;

namespace PROMPERU.FrontOffice.WEB.Controllers
{

    public class EmpresaController : Controller
    {
        private readonly ILogger<EmpresaController> _logger;    
        private readonly EmpresaBL _empresaBL;
        private readonly RegionBL _regionBL;
        private readonly TipoEmpresaBL _tipoEmpresaBL;

        public EmpresaController(ILogger<EmpresaController> logger, EmpresaBL empresaBL, RegionBL regionBL, TipoEmpresaBL tipoEmpresaBL)
        {
            _logger = logger;
            _empresaBL = empresaBL;
            _regionBL = regionBL;
            _tipoEmpresaBL = tipoEmpresaBL;
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

        public async Task<IActionResult> ListarRegiones()
        {
            try
            {
                var regions = await _regionBL.ListarRegionsAsync(); // Cambio a versión asincrónica
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
                    message = "Ocurrió un error al intentar obtener los Regiones. Por favor, inténtelo nuevamente."

                });
            }
        }
        public async Task<IActionResult> ListarTipoEmpresas()
        {
            try
            {
                var tipoEmpresas = await _tipoEmpresaBL.ListarTipoEmpresasAsync(); // Cambio a versión asincrónica
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
                    message = "Ocurrió un error al intentar obtener los TipoEmpresas. Por favor, inténtelo nuevamente."

                });
            }
        }

    }
}
