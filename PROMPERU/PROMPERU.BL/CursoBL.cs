using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class CursoBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly CursoDA _cursoDA;
        private readonly CursoModalidadDA _cursoModalidadDA;
        // Constructor con inyección de dependencias
        public CursoBL(CursoDA cursoDA,CursoModalidadDA cursoModalidadDA)
        {
            _cursoDA = cursoDA ?? throw new ArgumentNullException(nameof(CursoDA));
            _cursoModalidadDA = cursoModalidadDA ?? throw new ArgumentNullException(nameof(CursoModalidadDA));
        }

        public async Task<CursoBE> InsertarCursoAsync(CursoBE curso, string usuario, string ip)
        {
            try
            {
                return await _cursoDA.InsertarCursoAsync(curso, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Curso", ex);
            }
        }

        public async Task<bool> ActualizarCursoAsync(CursoBE curso, string usuario, string ip, int id)
        {
            try
            {
                return await _cursoDA.ActualizarCursoAsync(curso, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Curso", ex);
            }
        }

        public async Task<bool> EliminarCursoAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _cursoDA.EliminarCursoAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Curso", ex);
            }
        }

        //public async Task<CursoBE> ObtenerCursoAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _CursoDA.ObtenerCursoPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Curso", ex);
        //    }
        //}

        public async Task<List<CursoBE>> ListarCursosAsync()
        {
            try
            {
                return await _cursoDA.ListarCursosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Cursos", ex);
            }
        }

        public async Task<List<TipoEventoBE>> ListarTipoEventosAsync()
        {
            try
            {
                return await _cursoDA.ListarTipoEventosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los tipos de eventos", ex);
            }
        }

        public async Task<List<TipoModalidadBE>> ListarTipoModalidadsAsync()
        {
            try
            {
                return await _cursoDA.ListarTipoModalidadsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los tipos de Modalidads", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteCursosAsync()
        //{
        //    try
        //    {
        //        return await _CursoDA.ObtenerReporteCursosAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Cursos", ex);
        //    }
        //}

       
    }

}
