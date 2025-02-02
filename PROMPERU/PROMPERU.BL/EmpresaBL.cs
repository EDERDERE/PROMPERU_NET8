using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class EmpresaBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly EmpresaDA _empresaDA;

        // Constructor con inyección de dependencias
        public EmpresaBL(EmpresaDA empresaDA)
        {
            _empresaDA = empresaDA ?? throw new ArgumentNullException(nameof(EmpresaDA));
        }

        public async Task<EmpresaBE> InsertarEmpresaAsync(EmpresaBE empresa, string usuario, string ip)
        {
            try
            {
                return await _empresaDA.InsertarEmpresaAsync(empresa, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Empresa", ex);
            }
        }

        public async Task<bool> ActualizarEmpresaAsync(EmpresaBE empresa, string usuario, string ip, int id)
        {
            try
            {
                return await _empresaDA.ActualizarEmpresaAsync(empresa, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Empresa", ex);
            }
        }

        public async Task<bool> EliminarEmpresaAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _empresaDA.EliminarEmpresaAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Empresa", ex);
            }
        }

        //public async Task<EmpresaBE> ObtenerEmpresaAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _EmpresaDA.ObtenerEmpresaPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Empresa", ex);
        //    }
        //}

        public async Task<List<EmpresaBE>> ListarEmpresasAsync()
        {
            try
            {
                return await _empresaDA.ListarEmpresasAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Empresas", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteEmpresasAsync()
        //{
        //    try
        //    {
        //        return await _EmpresaDA.ObtenerReporteEmpresasAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Empresas", ex);
        //    }
        //}
    }
}
