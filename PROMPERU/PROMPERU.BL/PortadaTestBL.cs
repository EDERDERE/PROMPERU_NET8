using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class PortadaTestBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly PortadaTestDA _portadaTestDA;

        // Constructor con inyección de dependencias
        public PortadaTestBL(PortadaTestDA portadaTestDA)
        {
            _portadaTestDA = portadaTestDA ?? throw new ArgumentNullException(nameof(PortadaTestDA));
        }

        public async Task<PortadaTestBE> InsertarPortadaTestAsync(PortadaTestBE PortadaTest, string usuario, string ip)
        {
            try
            {
                return await _portadaTestDA.InsertarPortadaTestAsync(PortadaTest, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el PortadaTest", ex);
            }
        }

        public async Task<bool> ActualizarPortadaTestAsync(PortadaTestBE PortadaTest, string usuario, string ip, int id)
        {
            try
            {
                return await _portadaTestDA.ActualizarPortadaTestAsync(PortadaTest, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el PortadaTest", ex);
            }
        }

        public async Task<bool> EliminarPortadaTestAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _portadaTestDA.EliminarPortadaTestAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el PortadaTest", ex);
            }
        }

        //public async Task<PortadaTestBE> ObtenerPortadaTestAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _PortadaTestDA.ObtenerPortadaTestPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el PortadaTest", ex);
        //    }
        //}

        public async Task<List<PortadaTestBE>> ListarPortadaTestsAsync()
        {
            try
            {
                return await _portadaTestDA.ListarPortadaTestsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los PortadaTests", ex);
            }
        }

        //public async Task<DataTable> ObtenerReportePortadaTestsAsync()
        //{
        //    try
        //    {
        //        return await _PortadaTestDA.ObtenerReportePortadaTestsAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los PortadaTests", ex);
        //    }
        //}
    }
}
