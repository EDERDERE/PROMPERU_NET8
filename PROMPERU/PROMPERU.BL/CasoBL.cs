using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class CasoBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly CasoDA _casoDA;

        // Constructor con inyección de dependencias
        public CasoBL(CasoDA casoDA)
        {
            _casoDA = casoDA ?? throw new ArgumentNullException(nameof(CasoDA));
        }

        public async Task<CasoBE> InsertarCasoAsync(CasoBE caso, string usuario, string ip)
        {
            try
            {
                return await _casoDA.InsertarCasoAsync(caso, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Caso", ex);
            }
        }

        public async Task<bool> ActualizarCasoAsync(CasoBE caso, string usuario, string ip, int id)
        {
            try
            {
                return await _casoDA.ActualizarCasoAsync(caso, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Caso", ex);
            }
        }

        public async Task<bool> EliminarCasoAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _casoDA.EliminarCasoAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Caso", ex);
            }
        }

        //public async Task<CasoBE> ObtenerCasoAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _CasoDA.ObtenerCasoPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Caso", ex);
        //    }
        //}

        public async Task<List<CasoBE>> ListarCasosAsync()
        {
            try
            {
                return await _casoDA.ListarCasosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Casos", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteCasosAsync()
        //{
        //    try
        //    {
        //        return await _CasoDA.ObtenerReporteCasosAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Casos", ex);
        //    }
        //}
    }
}
