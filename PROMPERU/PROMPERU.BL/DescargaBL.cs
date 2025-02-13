using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

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

        public async Task<List<Dictionary<string, object>>> ObtenerDatosAsync(string tabla)
        {
            return await _descargaDA.ObtenerDatosAsync(tabla);
        }
    }
}
