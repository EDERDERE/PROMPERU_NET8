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

        public async Task<List<Dictionary<string, object>>> ObtenerDatosAsync(string tabla)
        {
            try
            {
                List<Dictionary<string, object>> listaDatos = new();               

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_DatosGenericos_RPT", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                comando.Parameters.AddWithValue("@Tabla", tabla);
                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Dictionary<string, object> fila = new();

                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        fila[reader.GetName(i)] = reader[i]?.ToString() ?? "";
                    }

                    listaDatos.Add(fila);
                }

                return listaDatos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Descargas", ex);
            }
        }

    }
}
