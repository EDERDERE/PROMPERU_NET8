using PROMPERU.BE;
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

        // Constructor con inyección de dependencias
        public BannerBL(BannerDA bannerDA)
        {
            _bannerDA = bannerDA ?? throw new ArgumentNullException(nameof(bannerDA));
        }

        public async Task<BannerBE> InsertarBannerAsync(BannerBE banner, string usuario, string ip)
        {
            try
            {
                return await _bannerDA.InsertarBannerAsync(banner, usuario, ip);
            }
            catch (Exception ex)
            {
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
                throw new Exception("Error en la lógica de negocio al eliminar el Banner", ex);
            }
        }

        //public async Task<BannerBE> ObtenerBannerAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _bannerDA.ObtenerBannerPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Banner", ex);
        //    }
        //}

        public async Task<List<BannerBE>> ListarBannersAsync()
        {
            try
            {
                return await _bannerDA.ListarBannersAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Banners", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteBannersAsync()
        //{
        //    try
        //    {
        //        return await _bannerDA.ObtenerReporteBannersAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Banners", ex);
        //    }
        //}
    }
}
