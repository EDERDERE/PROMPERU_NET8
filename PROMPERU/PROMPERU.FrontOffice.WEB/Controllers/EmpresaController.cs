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

        public EmpresaController(ILogger<EmpresaController> logger, EmpresaBL empresaBL)
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
      
    }
}
