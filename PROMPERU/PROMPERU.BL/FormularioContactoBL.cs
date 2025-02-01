using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class FormularioContactoBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly FormularioContactoDA _formularioContactoDA;

        // Constructor con inyección de dependencias
        public FormularioContactoBL(FormularioContactoDA formularioContactoDA)
        {
            _formularioContactoDA = formularioContactoDA ?? throw new ArgumentNullException(nameof(FormularioContactoDA));
        }

        public async Task<FormularioContactoBE> InsertarFormularioContactoAsync(FormularioContactoBE formularioContacto, string usuario, string ip)
        {
            try
            {
                return await _formularioContactoDA.InsertarFormularioContactoAsync(formularioContacto, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el FormularioContacto", ex);
            }
        }

        public async Task<bool> ActualizarFormularioContactoAsync(FormularioContactoBE formularioContacto, string usuario, string ip, int id)
        {
            try
            {
                return await _formularioContactoDA.ActualizarFormularioContactoAsync(formularioContacto, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el FormularioContacto", ex);
            }
        }

        public async Task<bool> EliminarFormularioContactoAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _formularioContactoDA.EliminarFormularioContactoAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el FormularioContacto", ex);
            }
        }

        //public async Task<FormularioContactoBE> ObtenerFormularioContactoAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _FormularioContactoDA.ObtenerFormularioContactoPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el FormularioContacto", ex);
        //    }
        //}

        public async Task<List<FormularioContactoBE>> ListarFormularioContactosAsync()
        {
            try
            {
                return await _formularioContactoDA.ListarFormularioContactosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los FormularioContactos", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteFormularioContactosAsync()
        //{
        //    try
        //    {
        //        return await _FormularioContactoDA.ObtenerReporteFormularioContactosAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los FormularioContactos", ex);
        //    }
        //}
    }
}
