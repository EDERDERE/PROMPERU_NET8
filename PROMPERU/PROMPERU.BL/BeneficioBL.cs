using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class BeneficioBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly BeneficioDA _beneficioDA;

        // Constructor con inyección de dependencias
        public BeneficioBL(BeneficioDA beneficioDA)
        {
            _beneficioDA = beneficioDA ?? throw new ArgumentNullException(nameof(BeneficioDA));
        }

        public async Task<BeneficioBE> InsertarBeneficioAsync(BeneficioBE beneficio, string usuario, string ip)
        {
            try
            {
                return await _beneficioDA.InsertarBeneficioAsync(beneficio, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Beneficio", ex);
            }
        }

        public async Task<bool> ActualizarBeneficioAsync(BeneficioBE beneficio, string usuario, string ip, int id)
        {
            try
            {
                return await _beneficioDA.ActualizarBeneficioAsync(beneficio, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Beneficio", ex);
            }
        }

        public async Task<bool> EliminarBeneficioAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _beneficioDA.EliminarBeneficioAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Beneficio", ex);
            }
        }

        //public async Task<BeneficioBE> ObtenerBeneficioAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _BeneficioDA.ObtenerBeneficioPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Beneficio", ex);
        //    }
        //}

        public async Task<List<BeneficioBE>> ListarBeneficiosAsync()
        {
            try
            {
                return await _beneficioDA.ListarBeneficiosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Beneficios", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteBeneficiosAsync()
        //{
        //    try
        //    {
        //        return await _BeneficioDA.ObtenerReporteBeneficiosAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Beneficios", ex);
        //    }
        //}
    }
}
