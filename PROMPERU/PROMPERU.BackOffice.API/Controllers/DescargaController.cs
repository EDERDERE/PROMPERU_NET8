using Microsoft.AspNetCore.Mvc;
using PROMPERU.BackOffice.API.Filters;
using PROMPERU.BL;
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
                byte[] archivoExcel = await _descargaBL.GenerarExcelAsync(tabla);

                return File(archivoExcel,
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            $"{tabla}.xlsx");
            }
            catch
            {
                return Json(new { success = false, message = "Error: Tabla no permitida o inexistente." });
            }
        }
    }
}
