using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class DescargaDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public DescargaDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        public async Task<DataTable> ObtenerDatosAsync(string tabla)
        {
            try
            {
                var dt = new DataTable();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_DatosGenericos_RPT", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                comando.Parameters.AddWithValue("@Tabla", tabla);

                await using var reader = await comando.ExecuteReaderAsync();
                dt.Load(reader); // Carga los datos directamente en el DataTable

                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener los datos de la tabla.", ex);
            }
        }


    }
}
