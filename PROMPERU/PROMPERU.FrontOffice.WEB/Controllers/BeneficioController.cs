using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
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
    }
}
