using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
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
          return View(); // Aseg�rate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarRequisitos()
        {
            try
            {
                var requisitos = await _requisitoBL.ListarRequisitosAsync(); // Cambio a versi�n asincr�nica
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
                    message = "Ocurri� un error al intentar obtener los requisitos. Por favor, int�ntelo nuevamente."
                  
                });
            }
        }               
    }
}
