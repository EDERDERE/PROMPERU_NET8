using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class RegionDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public RegionDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }
              
        public async Task<List<RegionBE>> ListarRegionsAsync()
        {
            try
            {
                var Regions = new List<RegionBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Region_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Regions.Add(new RegionBE
                    {
                        Regi_ID = reader["Regi_ID"] != DBNull.Value ? Convert.ToInt32(reader["Regi_ID"]) : 0,
                        Regi_Nombre = reader["Regi_Nombre"] != DBNull.Value ? reader["Regi_Nombre"].ToString() : ""

                    });
                }

                return Regions;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Regions", ex);
            }
        }

    }
}
