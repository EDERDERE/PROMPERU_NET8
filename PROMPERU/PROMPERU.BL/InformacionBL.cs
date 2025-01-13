using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class InformacionBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly InformacionDA _informacionDA;

        // Constructor con inyección de dependencias
        public InformacionBL(InformacionDA informacionDA)
        {
            _informacionDA = informacionDA ?? throw new ArgumentNullException(nameof(InformacionDA));
        }

        public async Task<InformacionBE> InsertarInformacionAsync(InformacionBE informacion, string usuario, string ip)
        {
            try
            {
                return await _informacionDA.InsertarInformacionAsync(informacion, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Informacion", ex);
            }
        }

        public async Task<bool> ActualizarInformacionAsync(InformacionBE informacion, string usuario, string ip, int id)
        {
            try
            {
                return await _informacionDA.ActualizarInformacionAsync(informacion, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Informacion", ex);
            }
        }

        public async Task<bool> EliminarInformacionAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _informacionDA.EliminarInformacionAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Informacion", ex);
            }
        }

        //public async Task<InformacionBE> ObtenerInformacionAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _InformacionDA.ObtenerInformacionPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Informacion", ex);
        //    }
        //}

        public async Task<List<InformacionBE>> ListarInformacionsAsync()
        {
            try
            {
                return await _informacionDA.ListarInformacionsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Informacions", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteInformacionsAsync()
        //{
        //    try
        //    {
        //        return await _InformacionDA.ObtenerReporteInformacionsAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Informacions", ex);
        //    }
        //}
    }
}
