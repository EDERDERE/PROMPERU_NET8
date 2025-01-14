using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class RequisitoBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly RequisitoDA _requisitoDA;

        // Constructor con inyección de dependencias
        public RequisitoBL(RequisitoDA requisitoDA)
        {
            _requisitoDA = requisitoDA ?? throw new ArgumentNullException(nameof(RequisitoDA));
        }

        public async Task<RequisitoBE> InsertarRequisitoAsync(RequisitoBE requisito, string usuario, string ip)
        {
            try
            {
                return await _requisitoDA.InsertarRequisitoAsync(requisito, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Requisito", ex);
            }
        }

        public async Task<bool> ActualizarRequisitoAsync(RequisitoBE requisito, string usuario, string ip, int id)
        {
            try
            {
                return await _requisitoDA.ActualizarRequisitoAsync(requisito, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Requisito", ex);
            }
        }

        public async Task<bool> EliminarRequisitoAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _requisitoDA.EliminarRequisitoAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Requisito", ex);
            }
        }

        //public async Task<RequisitoBE> ObtenerRequisitoAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _RequisitoDA.ObtenerRequisitoPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Requisito", ex);
        //    }
        //}

        public async Task<List<RequisitoBE>> ListarRequisitosAsync()
        {
            try
            {
                return await _requisitoDA.ListarRequisitosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Requisitos", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteRequisitosAsync()
        //{
        //    try
        //    {
        //        return await _RequisitoDA.ObtenerReporteRequisitosAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Requisitos", ex);
        //    }
        //}
    }
}
