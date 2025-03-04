using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;

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

        [HttpPost]
        public async Task<IActionResult> CrearTest(TestModelDto testModel)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente         

                //var curso = new CursoBE
                //{
                //    Curs_ID = cursoDto.id,
                //    Curs_Orden = cursoDto.orden,
                //    Curs_Titulo = cursoDto.titulo,
                //    Curs_TituloSeccion = cursoDto.tituloSeccion,
                //    Curs_NombreBoton = cursoDto.nombreBoton,
                //    Curs_UrlIconBoton = cursoDto.urlIconBoton,
                //    Curs_NombreCurso = cursoDto.nombreCurso,
                //    Curs_CodigoCurso = cursoDto.codigoCurso,
                //    Curs_Objetivo = cursoDto.objetivo,
                //    Curs_Descripcion = cursoDto.description,
                //    Curs_Modalidad = cursoDto.modalidad,
                //    Curs_DuracionHoras = cursoDto.duracionHoras,
                //    Curs_FechaInicio = null,
                //    Curs_FechaFin = null,
                //    Curs_NombreBotonTitulo = cursoDto.nombreBotonTitulo,
                //    Curs_UrlIcon = cursoDto.urlIcon,
                //    Curs_UrlImagen = cursoDto.urlImagen,
                //    Curs_LinkBoton = cursoDto.linkBoton,
                //    Curs_EsHabilitado = cursoDto.esHabilitado,
                //    Teve_ID = cursoDto.id_evento,
                //    Tmod_ID = 0,
                //    Curs_TituloCalendario = cursoDto.tituloCalendario,
                //    Curs_DescripcionCalendario = cursoDto.descriptionCalendario,
                //    TipoModalidadList = modalidadesSeleccionadas
                //};

                if(testModel == null)
                return BadRequest("El modelo no puede ser nulo.");

                //await _cursoBL.InsertarCursoAsync(curso, usuario, ip); // Llamada asincrónica           

                return RedirectToAction("ListarTest");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPut]
        public async Task<IActionResult> ActualizarTest(TestModelDto testModel, int id)
        {
            try
            {
                var usuario = HttpContext.Session.GetString("Usuario");// Usuario autenticado
                string ip = HttpContext.Connection.RemoteIpAddress?.ToString(); // IP del cliente         

                //var curso = new CursoBE
                //{
                //    Curs_ID = cursoDto.id,
                //    Curs_Orden = cursoDto.orden,
                //    Curs_Titulo = cursoDto.titulo,
                //    Curs_TituloSeccion = cursoDto.tituloSeccion,
                //    Curs_NombreBoton = cursoDto.nombreBoton,
                //    Curs_UrlIconBoton = cursoDto.urlIconBoton,
                //    Curs_NombreCurso = cursoDto.nombreCurso,
                //    Curs_CodigoCurso = cursoDto.codigoCurso,
                //    Curs_Objetivo = cursoDto.objetivo,
                //    Curs_Descripcion = cursoDto.description,
                //    Curs_Modalidad = cursoDto.modalidad,
                //    Curs_DuracionHoras = cursoDto.duracionHoras,
                //    Curs_FechaInicio = null,
                //    Curs_FechaFin = null,
                //    Curs_NombreBotonTitulo = cursoDto.nombreBotonTitulo,
                //    Curs_UrlIcon = cursoDto.urlIcon,
                //    Curs_UrlImagen = cursoDto.urlImagen,
                //    Curs_LinkBoton = cursoDto.linkBoton,
                //    Curs_EsHabilitado = cursoDto.esHabilitado,
                //    Teve_ID = cursoDto.id_evento,
                //    Tmod_ID = 0,
                //    Curs_TituloCalendario = cursoDto.tituloCalendario,
                //    Curs_DescripcionCalendario = cursoDto.descriptionCalendario,
                //    TipoModalidadList = modalidadesSeleccionadas
                //};

                if (testModel == null)
                    return BadRequest("El modelo no puede ser nulo.");

                //await _cursoBL.InsertarCursoAsync(curso, usuario, ip); // Llamada asincrónica           

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
