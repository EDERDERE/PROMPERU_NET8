using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;


namespace PROMPERU.FrontOffice.WEB.Controllers
{ 
    public class TestimonioController : Controller
    {
        private readonly ILogger<TestimonioController> _logger;    
        private readonly TestimonioBL _testimonioBL;

        public TestimonioController(ILogger<TestimonioController> logger, TestimonioBL testimonioBL)
        {
            _logger = logger;
            _testimonioBL = testimonioBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarTestimonios()
        {
            try
            {
                var Testimonios = await _testimonioBL.ListarTestimoniosAsync(); // Cambio a versión asincrónica
                if (Testimonios != null && Testimonios.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "Testimonios obtenidos exitosamente.",
                        Testimonios
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron Testimonios disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los Testimonios. Por favor, inténtelo nuevamente."
                  
                });
            }
        }
     
    }
}
