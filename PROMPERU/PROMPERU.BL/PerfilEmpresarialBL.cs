using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class PerfilEmpresarialBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly PerfilEmpresarialDA _perfilEmpresarialDA;

        // Constructor con inyección de dependencias
        public PerfilEmpresarialBL(PerfilEmpresarialDA perfilEmpresarialDA)
        {
            _perfilEmpresarialDA = perfilEmpresarialDA ?? throw new ArgumentNullException(nameof(PerfilEmpresarialDA));
        }

        public async Task<PerfilEmpresarialBE> InsertarPerfilEmpresarialAsync(PerfilEmpresarialBE perfilEmpresarial, string usuario, string ip)
        {
            try
            {
                return await _perfilEmpresarialDA.InsertarPerfilEmpresarialAsync(perfilEmpresarial, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el PerfilEmpresarial", ex);
            }
        }

        public async Task<bool> ActualizarPerfilEmpresarialAsync(PerfilEmpresarialBE PerfilEmpresarial, string usuario, string ip, int id)
        {
            try
            {
                return await _perfilEmpresarialDA.ActualizarPerfilEmpresarialAsync(PerfilEmpresarial, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el PerfilEmpresarial", ex);
            }
        }

        public async Task<bool> EliminarPerfilEmpresarialAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _perfilEmpresarialDA.EliminarPerfilEmpresarialAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el PerfilEmpresarial", ex);
            }
        }

        //public async Task<PerfilEmpresarialBE> ObtenerPerfilEmpresarialAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _PerfilEmpresarialDA.ObtenerPerfilEmpresarialPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el PerfilEmpresarial", ex);
        //    }
        //}

        public async Task<List<PerfilEmpresarialBE>> ListarPerfilEmpresarialsAsync()
        {
            try
            {
                return await _perfilEmpresarialDA.ListarPerfilEmpresarialsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los PerfilEmpresarials", ex);
            }
        }

        //public async Task<DataTable> ObtenerReportePerfilEmpresarialsAsync()
        //{
        //    try
        //    {
        //        return await _PerfilEmpresarialDA.ObtenerReportePerfilEmpresarialsAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los PerfilEmpresarials", ex);
        //    }
        //}
    }
}
