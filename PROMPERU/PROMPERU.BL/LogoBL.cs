using PROMPERU.BE;
using PROMPERU.BL.Interfaces;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class LogoBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly LogoDA _logoDA;
        private readonly ILoggerService _logger;

        // Constructor con inyección de dependencias
        public LogoBL(LogoDA logoDA, ILoggerService logger)
        {
            _logoDA = logoDA ?? throw new ArgumentNullException(nameof(LogoDA));
            _logger = logger;
        }

        public async Task<LogoBE> InsertarLogoAsync(LogoBE logo, string usuario, string ip)
        {
            try
            {
                return await _logoDA.InsertarLogoAsync(logo, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Logo", ex);
            }
        }

        public async Task<bool> ActualizarLogoAsync(LogoBE logo, string usuario, string ip, int id)
        {
            try
            {
                return await _logoDA.ActualizarLogoAsync(logo, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Logo", ex);
            }
        }

        public async Task<bool> EliminarLogoAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _logoDA.EliminarLogoAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Logo", ex);
            }
        }

        //public async Task<LogoBE> ObtenerLogoAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _LogoDA.ObtenerLogoPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Logo", ex);
        //    }
        //}

        public async Task<List<LogoBE>> ListarLogosAsync()
        {
            try
            {
                return await _logoDA.ListarLogosAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);
                throw new Exception("Error en la lógica de negocio al listar los Logos", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteLogosAsync()
        //{
        //    try
        //    {
        //        return await _LogoDA.ObtenerReporteLogosAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Logos", ex);
        //    }
        //}
    }
}
