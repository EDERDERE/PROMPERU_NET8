using PROMPERU.BE;
using PROMPERU.BL.Interfaces;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class BannerBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly BannerDA _bannerDA;
        private readonly ILoggerService _logger;

        // Constructor con inyección de dependencias
        public BannerBL(BannerDA bannerDA, ILoggerService logger)
        {
            _bannerDA = bannerDA ?? throw new ArgumentNullException(nameof(bannerDA));
            _logger = logger;
        }

        public async Task<BannerBE> InsertarBannerAsync(BannerBE banner, string usuario, string ip)
        {
            try
            {
                return await _bannerDA.InsertarBannerAsync(banner, usuario, ip);
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);
                throw new Exception("Error en la lógica de negocio al insertar el Banner", ex);
            }
        }

        public async Task<bool> ActualizarBannerAsync(BannerBE banner, string usuario, string ip, int id)
        {
            try
            {
                return await _bannerDA.ActualizarBannerAsync(banner, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);
                throw new Exception("Error en la lógica de negocio al actualizar el Banner", ex);
            }
        }

        public async Task<bool> EliminarBannerAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _bannerDA.EliminarBannerAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);
                throw new Exception("Error en la lógica de negocio al eliminar el Banner", ex);
            }
        }
           
        public async Task<List<BannerBE>> ListarBannersAsync()
        {
            try
            {
                return await _bannerDA.ListarBannersAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);
                throw new Exception("Error en la lógica de negocio al listar los Banners", ex);
            }
        }   
    }
}
