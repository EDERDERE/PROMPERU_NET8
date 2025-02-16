using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class ContenidoInteractivoBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly ContenidoInteractivoDA _contenidoInteractivoDA;

        // Constructor con inyección de dependencias
        public ContenidoInteractivoBL(ContenidoInteractivoDA contenidoInteractivoDA)
        {
            _contenidoInteractivoDA = contenidoInteractivoDA ?? throw new ArgumentNullException(nameof(ContenidoInteractivoDA));
        }
           
        public async Task<List<ContenidoInteractivoBE>> ListarContenidoInteractivosAsync()
        {
            try
            {
                return await _contenidoInteractivoDA.ListarContenidoInteractivosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los ContenidoInteractivos", ex);
            }
        }              
    }
}
