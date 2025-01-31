using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class FooterBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly FooterDA _footerDA;

        // Constructor con inyección de dependencias
        public FooterBL(FooterDA footerDA)
        {
            _footerDA = footerDA ?? throw new ArgumentNullException(nameof(FooterDA));
        }

        public async Task<FooterBE> InsertarFooterAsync(FooterBE footer, string usuario, string ip)
        {
            try
            {
                return await _footerDA.InsertarFooterAsync(footer, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Footer", ex);
            }
        }

        public async Task<bool> ActualizarFooterAsync(FooterBE Footer, string usuario, string ip, int id)
        {
            try
            {
                return await _footerDA.ActualizarFooterAsync(Footer, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Footer", ex);
            }
        }

        public async Task<bool> EliminarFooterAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _footerDA.EliminarFooterAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Footer", ex);
            }
        }

        //public async Task<FooterBE> ObtenerFooterAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _FooterDA.ObtenerFooterPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Footer", ex);
        //    }
        //}

        public async Task<List<FooterBE>> ListarFootersAsync()
        {
            try
            {
                return await _footerDA.ListarFootersAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Footers", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteFootersAsync()
        //{
        //    try
        //    {
        //        return await _FooterDA.ObtenerReporteFootersAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Footers", ex);
        //    }
        //}
    }
}
