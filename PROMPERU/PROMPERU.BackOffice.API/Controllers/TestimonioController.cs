using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;


namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
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
          return View(); // Aseg�rate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarTestimonios()
        {
            try
            {
                var Testimonios = await _testimonioBL.ListarTestimoniosAsync(); // Cambio a versi�n asincr�nica
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
                    message = "Ocurri� un error al intentar obtener los Testimonios. Por favor, int�ntelo nuevamente."
                  
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertarTestimonio(TestimonioDto testimonioDto)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente

                var testimonio = new TestimonioBE
                {
                     Test_ID = testimonioDto.id,
                     Test_Nombre = testimonioDto.nombre,
                     Test_Descripcion = testimonioDto.descripcion,
                     Test_UrlIcon = testimonioDto.urlIcon,
                     Test_UrlImagen = testimonioDto.urlImagen,                 
                    Test_NombreEmpresa = testimonioDto.empresa


                };
                await _testimonioBL.InsertarTestimonioAsync(testimonio, usuario, ip); // Llamada asincr�nica
                return RedirectToAction("ListarTestimonios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarTestimonio(TestimonioDto testimonioDto, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var testimonio = new TestimonioBE
                {
                    Test_ID = testimonioDto.id,
                    Test_Nombre = testimonioDto.nombre,
                    Test_Descripcion = testimonioDto.descripcion,
                    Test_UrlIcon = testimonioDto.urlIcon,
                    Test_UrlImagen = testimonioDto.urlImagen,
                    Test_NombreEmpresa = testimonioDto.empresa

                };
                await _testimonioBL.ActualizarTestimonioAsync(testimonio, usuario, ip, id); // Llamada asincr�nica
                return RedirectToAction("ListarTestimonios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> EliminarTestimonio(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                await _testimonioBL.EliminarTestimonioAsync(usuario, ip, id); // Llamada asincr�nica
                return RedirectToAction("ListarTestimonios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> ObtenerTestimonio(int bannID)
        //{
        //    try
        //    {
        //        var Testimonio = await _TestimonioBL.ObtenerTestimonioAsync(bannID); // Llamada asincr�nica
        //        return View(Testimonio); // Aseg�rate de tener una vista para mostrar un Testimonio
        //    }
        //    catch (Exception ex)
        //    {
        //        ViewBag.Error = ex.Message;
        //        return View("Error");
        //    }
        //}


        [HttpPost]
        public async Task<IActionResult> ActualizarOrdenTestimonio([FromBody] List<TestimonioDto> testimonioDtos)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();

                foreach (var testimonioDto in testimonioDtos)
                {
                    var testimonio = new TestimonioBE
                    {
                        Test_ID = testimonioDto.id,
                        Test_Nombre = testimonioDto.nombre,
                        Test_Descripcion = testimonioDto.descripcion,
                        Test_UrlIcon = testimonioDto.urlIcon,
                        Test_UrlImagen = testimonioDto.urlImagen,
                        Test_NombreEmpresa = testimonioDto.empresa

                    };
                    await _testimonioBL.ActualizarTestimonioAsync(testimonio, usuario, ip,testimonio.Test_ID); // Llamada asincr�nica
                }
                return RedirectToAction("ListarTestimonios");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }
    }
}
