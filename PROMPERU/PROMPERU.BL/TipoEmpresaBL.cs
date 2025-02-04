using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class TipoEmpresaBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly TipoEmpresaDA _tipoEmpresaDA;

        // Constructor con inyección de dependencias
        public TipoEmpresaBL(TipoEmpresaDA tipoEmpresaDA)
        {
            _tipoEmpresaDA = tipoEmpresaDA ?? throw new ArgumentNullException(nameof(TipoEmpresaDA));
        }
            
        public async Task<List<TipoEmpresaBE>> ListarTipoEmpresasAsync()
        {
            try
            {
                return await _tipoEmpresaDA.ListarTipoEmpresasAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los TipoEmpresas", ex);
            }
        }        
    }
}
