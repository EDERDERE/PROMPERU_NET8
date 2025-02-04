using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class RegionBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly RegionDA _regionDA;

        // Constructor con inyección de dependencias
        public RegionBL(RegionDA regionDA)
        {
            _regionDA = regionDA ?? throw new ArgumentNullException(nameof(RegionDA));
        }
          
        public async Task<List<RegionBE>> ListarRegionsAsync()
        {
            try
            {
                return await _regionDA.ListarRegionsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Regions", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteRegionsAsync()
        //{
        //    try
        //    {
        //        return await _RegionDA.ObtenerReporteRegionsAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Regions", ex);
        //    }
        //}
    }
}
