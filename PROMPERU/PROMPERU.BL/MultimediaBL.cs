using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class MultimediaBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly MultimediaDA _multimediaDA;

        // Constructor con inyección de dependencias
        public MultimediaBL(MultimediaDA multimediaDA)
        {
            _multimediaDA = multimediaDA ?? throw new ArgumentNullException(nameof(multimediaDA));
        }

        public async Task<MultimediaBE> InsertarMultimediaAsync(MultimediaBE multimedia, string usuario, string ip)
        {
            try
            {
                return await _multimediaDA.InsertarMultimediaAsync(multimedia, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Multimedia", ex);
            }
        }

        public async Task<bool> ActualizarMultimediaAsync(MultimediaBE multimedia, string usuario, string ip, int id)
        {
            try
            {
                return await _multimediaDA.ActualizarMultimediaAsync(multimedia, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Multimedia", ex);
            }
        }

        public async Task<bool> EliminarMultimediaAsync(int bannID, string usuario, string ip, int id)
        {
            try
            {
                return await _multimediaDA.EliminarMultimediaAsync(bannID, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Multimedia", ex);
            }
        }

        //public async Task<MultimediaBE> ObtenerMultimediaAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _MultimediaDA.ObtenerMultimediaPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Multimedia", ex);
        //    }
        //}

        public async Task<List<MultimediaBE>> ListarMultimediasAsync()
        {
            try
            {
                return await _multimediaDA.ListarMultimediasAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Multimedias", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteMultimediasAsync()
        //{
        //    try
        //    {
        //        return await _MultimediaDA.ObtenerReporteMultimediasAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Multimedias", ex);
        //    }
        //}
    }
}
