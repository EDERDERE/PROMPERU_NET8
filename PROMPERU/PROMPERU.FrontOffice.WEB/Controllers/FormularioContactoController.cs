using Microsoft.AspNetCore.Mvc;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;

namespace PROMPERU.FrontOffice.WEB.Controllers
{

    public class FormularioContactoController : Controller
    {
        private readonly ILogger<FormularioContactoController> _logger;    
        private readonly FormularioContactoBL _formularioContactoBL;

        public FormularioContactoController(ILogger<FormularioContactoController> logger, FormularioContactoBL formularioContactoBL)
        {
            _logger = logger;
            _formularioContactoBL = formularioContactoBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> ListarFormularioContactos()
        {
            try
            {
                var FormularioContactos = await _formularioContactoBL.ListarFormularioContactosAsync(); // Cambio a versión asincrónica
                if (FormularioContactos != null && FormularioContactos.Any())
                {
                    return Json(new
                    {
                        success = true,
                        message = "FormularioContactos obtenidos exitosamente.",
                        FormularioContactos
                    });
                }
                else
                {
                    return Json(new
                    {
                        success = false,
                        message = "No se encontraron FormularioContactos disponibles."
                    });
                }
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = "Ocurrió un error al intentar obtener los FormularioContactos. Por favor, inténtelo nuevamente."
                  
                });
            }
        }

       
    }
}
