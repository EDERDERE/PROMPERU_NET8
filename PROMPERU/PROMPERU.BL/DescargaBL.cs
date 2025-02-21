using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using ClosedXML.Excel;

namespace PROMPERU.BL
{
    public class DescargaBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly DescargaDA _descargaDA;

        // Constructor con inyección de dependencias
        public DescargaBL(DescargaDA descargaDA)
        {
            _descargaDA = descargaDA ?? throw new ArgumentNullException(nameof(DescargaDA));
        }

        //public async Task<List<Dictionary<string, object>>> ObtenerDatosAsync(string tabla)
        //{
        //    return await _descargaDA.ObtenerDatosAsync(tabla);
        //}

        public async Task<byte[]> GenerarExcelAsync(string tabla)
        {
            var datos = await _descargaDA.ObtenerDatosAsync(tabla);

            if (datos.Rows.Count == 0)
            {
                throw new Exception("No hay datos disponibles.");
            }

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add(tabla);
                worksheet.Cell(1, 1).InsertTable(datos); // Insertar datos en Excel

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray(); // Retornamos el archivo como un arreglo de bytes
                }
            }
        }
    }
}
