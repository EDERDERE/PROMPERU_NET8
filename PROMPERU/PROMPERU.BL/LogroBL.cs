using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class LogroBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly LogroDA _logroDA;

        // Constructor con inyección de dependencias
        public LogroBL(LogroDA logroDA)
        {
            _logroDA = logroDA ?? throw new ArgumentNullException(nameof(LogroDA));
        }

        public async Task<LogroBE> InsertarLogroAsync(LogroBE logro, string usuario, string ip)
        {
            try
            {
                return await _logroDA.InsertarLogroAsync(logro, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Logro", ex);
            }
        }

        public async Task<bool> ActualizarLogroAsync(LogroBE logro, string usuario, string ip, int id)
        {
            try
            {
                return await _logroDA.ActualizarLogroAsync(logro, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Logro", ex);
            }
        }

        public async Task<bool> EliminarLogroAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _logroDA.EliminarLogroAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Logro", ex);
            }
        }

        //public async Task<LogroBE> ObtenerLogroAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _LogroDA.ObtenerLogroPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Logro", ex);
        //    }
        //}

        public async Task<List<LogroBE>> ListarLogrosAsync()
        {
            try
            {
                return await _logroDA.ListarLogrosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Logros", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteLogrosAsync()
        //{
        //    try
        //    {
        //        return await _LogroDA.ObtenerReporteLogrosAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Logros", ex);
        //    }
        //}
    }
}
