using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;

namespace PROMPERU.FrontOffice.WEB.Controllers
{
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
                var tests = await _testBL.ListarTestsAsync();
                if (tests == null || !tests.Any())
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron test disponibles."
                    });
                }

                var resuls = new ListTestDto
                {
                    Courses = tests.SelectMany(test => test.Cursos.Where( x=> x.Teve_ID ==1 && x.Curs_Orden>0 ))
                                   .Select(curso => new Course
                                   {
                                       Value = curso.Curs_ID,
                                       Label = curso.Curs_NombreCurso
                                   })
                                   .ToList(),
                    TestTypes = tests.SelectMany(test => test.Etapas)
                                     .Select(etapa => new TestType
                                     {
                                         Value = etapa.ID,
                                         Label = etapa.Titulo
                                     })
                                     .ToList()
                };

                return Json(new
                {
                    success = true,
                    message = "Test obtenidos exitosamente.",
                    resuls
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
        
    }
}
