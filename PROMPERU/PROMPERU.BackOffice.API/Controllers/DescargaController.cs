using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BackOffice.API.Models;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;
using System.Diagnostics;

namespace PROMPERU.BackOffice.API.Controllers
{
    [SessionCheck]
    public class DescargaController : Controller
    {
        private readonly ILogger<DescargaController> _logger;    
        private readonly DescargaBL _descargaBL;

        public DescargaController(ILogger<DescargaController> logger, DescargaBL descargaBL)
        {
            _logger = logger;
            _descargaBL = descargaBL;
        }

        public IActionResult Index()
        {            
          return View(); // Asegúrate de tener una vista asociada         
        }

        [HttpGet]
        public async Task<IActionResult> DescargarDatos(string tabla)
        {
            if (string.IsNullOrWhiteSpace(tabla))
            {
                return Json(new { success = false, message = "Debe ingresar un nombre de tabla." });
            }

            try
            {
                var datos = await _descargaBL.ObtenerDatosAsync(tabla);

                if (datos.Count == 0)
                {
                    return Json(new { success = false, message = "No hay datos disponibles." });
                }

                return Json(new { success = true, data = datos });
            }
            catch
            {
                return Json(new { success = false, message = "Error: Tabla no permitida o inexistente." });
            }
        }
    }
}
