using PROMPERU.BE;
using PROMPERU.BL.Interfaces;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class BeneficioBL
    {
        private readonly BeneficioDA _beneficioDA;
        private readonly ILoggerService _logger;

        // Constructor con inyección de dependencias
        public BeneficioBL(BeneficioDA beneficioDA, ILoggerService logger)
        {
            _beneficioDA = beneficioDA ?? throw new ArgumentNullException(nameof(BeneficioDA));
            _logger = logger;

        }

        public async Task<BeneficioBE> InsertarBeneficioAsync(BeneficioBE beneficio, string usuario, string ip)
        {
            try
            {
                return await _beneficioDA.InsertarBeneficioAsync(beneficio, usuario, ip);
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);
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
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);

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
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);
                throw new Exception("Error en la lógica de negocio al eliminar el Beneficio", ex);
            }
        }
        
        public async Task<List<BeneficioBE>> ListarBeneficiosAsync()
        {
            try
            {
                return await _beneficioDA.ListarBeneficiosAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);
                throw new Exception("Error en la lógica de negocio al listar los Beneficios", ex);
            }
        }
               
    }
}
