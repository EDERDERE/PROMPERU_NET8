using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class TestController : Controller
    {
        private readonly ILogger<TestController> _logger;    
        private readonly TestBL _testBL;
        public TestController(ILogger<TestController> logger, TestBL testBL)
        {
            _logger = logger;          
            _testBL = testBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }
        [HttpGet]
        public async Task<IActionResult> ListarTest()
        {
            try
            {
                var listado = await _testBL.ListarTestAsync();
                var tests = listado.Select(t => new { t.ID, t.Titulo }).ToList();
                if (tests == null || !tests.Any())
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron test disponibles."
                    });
                }

              
                return Json(new
                {
                    success = true,
                    message = "Test obtenidos exitosamente.",
                    tests
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los test. Por favor, inténtelo nuevamente.",
                    error = ex.Message // Esto es útil para depuración, puedes eliminarlo en producción.
                });
            }
        }
        [HttpGet]
        public IActionResult Crear()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Editar()
        {            
            return View();
        }

        public async Task<IActionResult> CrearTest(TestModelDto testModel)
        {
            try
            {

                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente         

                if (testModel == null)
                    return BadRequest("El modelo no puede ser nulo.");        

        
                await _testBL.crearTestAsync(testModel, usuario, ip); // Llamada asincrónica           

                return RedirectToAction("ListarTest");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }


        public async Task<IActionResult> ActualizarTest( int id,TestModelDto testModel)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente       

          
                if (testModel == null)
                    return BadRequest("El modelo no puede ser nulo.");

                await _testBL.ActualizarTestAsync(testModel, usuario, ip,id); // Llamada asincrónica           

                return RedirectToAction("ListarTest");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> ListarMaestros()
        {
            try
            {
                var maestros = await _testBL.ListarMaestrosAsync();
                if (maestros == null || !maestros.Any())
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron maestros disponibles."
                    });
                }

                var resuls = new MaestrosDto
                {
                    Courses = maestros.SelectMany(test => test.Cursos.Where(x => x.Teve_ID == 1 && x.Curs_Orden > 0))
                                   .Select(curso => new Course
                                   {
                                       Value = curso.Curs_ID,
                                       Label = curso.Curs_NombreCurso
                                   })
                                   .ToList(),
                    TestTypes = maestros.SelectMany(test => test.Etapas)
                                     .Select(etapa => new TestType
                                     {
                                         Value = etapa.ID,
                                         Label = etapa.Titulo
                                     })
                                     .ToList(),
                   Forms = maestros.SelectMany(test => test.Formularios)
                                     .Select(form => new SelectedForm
                                     {
                                         ID = form.Ftes_ID,
                                         Value = form.Ftes_Valor,
                                         Label = form.Ftes_Texto
                                     })
                                     .ToList()
                };

                return Json(new
                {
                    success = true,
                    message = "Maestros obtenidos exitosamente.",
                    resuls
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los maestros. Por favor, inténtelo nuevamente.",
                    error = ex.Message // Esto es útil para depuración, puedes eliminarlo en producción.
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTest(int id)
        {
            try
            {
                var test = await _testBL.ObtenerTestPorIdAsync(id); // Cambio a versión asincrónica
                if (test != null)
                {
                    return Json(new
                    {
                        success = true,
                        message = "Tets obtenidos exitosamente.",
                        test
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron test disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los test. Por favor, inténtelo nuevamente."

                });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> EliminarTest(int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString();
                var modelTest = await _testBL.ObtenerTestPorIdAsync(id);
                if (modelTest == null)
                {
                    TempData["Error"] = "El test no existe o ya ha sido eliminado.";
                    return RedirectToAction("ListarTest");
                }

                await _testBL.EliminarTestAsync(modelTest, usuario, ip, id);

                TempData["Success"] = "Test eliminado correctamente.";
                return RedirectToAction("ListarTest");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

    }
}
