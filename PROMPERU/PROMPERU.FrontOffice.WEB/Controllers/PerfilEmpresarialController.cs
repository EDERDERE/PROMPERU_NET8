using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;


namespace PROMPERU.FrontOffice.WEB.Controllers
{
    public class PerfilEmpresarialController : Controller
    {
        private readonly ILogger<PerfilEmpresarialController> _logger;    
        private readonly PerfilEmpresarialBL _perfilEmpresarialBL;

        public PerfilEmpresarialController(ILogger<PerfilEmpresarialController> logger, PerfilEmpresarialBL perfilEmpresarialBL)
        {
            _logger = logger;
            _perfilEmpresarialBL = perfilEmpresarialBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarPerfilEmpresarials()
        {
            try
            {
                var PerfilEmpresarials = await _perfilEmpresarialBL.ListarPerfilEmpresarialsAsync(); // Cambio a versión asincrónica
                if (PerfilEmpresarials != null && PerfilEmpresarials.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "PerfilEmpresarials obtenidos exitosamente.",
                        PerfilEmpresarials
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron PerfilEmpresarials disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los PerfilEmpresarials. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

       
    }
}
