using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class TipoEmpresaDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public TipoEmpresaDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }
        public async Task<List<TipoEmpresaBE>> ListarTipoEmpresasAsync()
        {
            try
            {
                var TipoEmpresas = new List<TipoEmpresaBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_TipoEmpresa_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    TipoEmpresas.Add(new TipoEmpresaBE
                    {
                        Temp_ID = reader["Temp_ID"] != DBNull.Value ? Convert.ToInt32(reader["Temp_ID"]) : 0,
                        Temp_Nombre = reader["Temp_Nombre"] != DBNull.Value ? reader["Temp_Nombre"].ToString() : ""
                       

                    });
                }

                return TipoEmpresas;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los TipoEmpresas", ex);
            }
        }

    }
}
