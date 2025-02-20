using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using static PROMPERU.BE.UbigeoBE;

namespace PROMPERU.BL
{
    public class UbigeoBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly UbigeoDA _ubigeoDA;

        // Constructor con inyección de dependencias
        public UbigeoBL(UbigeoDA ubigeoDA)
        {
            _ubigeoDA = ubigeoDA ?? throw new ArgumentNullException(nameof(UbigeoDA));
        }
          
        public async Task<List<UbigeoBE.Region>> ListarRegionsAsync()
        {
            try
            {
                return await _ubigeoDA.ListarRegionsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Ubigeos", ex);
            }
        }

        public async Task<List<UbigeoBE.Region>> ObtenerRegionesPorIDAsync(int regiID)
        {
            try
            {
                return await _ubigeoDA.ObtenerRegionesPorIDAsync(regiID);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al generar el reporte de los Ubigeos", ex);
            }
        }
    }
}
