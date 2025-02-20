using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class UbigeoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public UbigeoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }
              
        public async Task<List<UbigeoBE.Region>> ListarRegionsAsync()
        {
            try
            {
                var Regions = new List<UbigeoBE.Region>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Region_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Regions.Add(new UbigeoBE.Region
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
        public async Task<List<UbigeoBE.Region>> ObtenerRegionesPorIDAsync(int regiID)
        {
            try
            {
                var listaRegiones = new List<UbigeoBE.Region>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Region_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Regi_ID", regiID);
           
                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    // Buscar si ya existe la región en la lista
                    var region = listaRegiones.FirstOrDefault(r => r.Regi_ID == Convert.ToInt32(reader["Regi_ID"]));
                    if (region == null)
                    {
                        region = new UbigeoBE.Region
                        {
                            Regi_ID = Convert.ToInt32(reader["Regi_ID"]),
                            Regi_Ubigeo = reader["Regi_Ubigeo"].ToString(),
                            Regi_Nombre = reader["Regi_Nombre"].ToString()
                        };
                        listaRegiones.Add(region);
                    }

                    // Buscar si ya existe la provincia en la lista
                    var provincia = region.Provincias.FirstOrDefault(p => p.Prov_ID == Convert.ToInt32(reader["Prov_ID"]));
                    if (provincia == null)
                    {
                        provincia = new UbigeoBE.Provincia
                        {
                            Prov_ID = Convert.ToInt32(reader["Prov_ID"]),
                            Prov_Ubigeo = reader["Prov_Ubigeo"].ToString(),
                            Prov_Nombre = reader["Prov_Nombre"].ToString(),
                            Regi_ID = region.Regi_ID
                        };
                        region.Provincias.Add(provincia);
                    }

                    // Agregar el distrito a la provincia
                    var distrito = new UbigeoBE.Distrito
                    {
                        Dist_ID = Convert.ToInt32(reader["Dist_ID"]),
                        Dist_Ubigeo = reader["Dist_Ubigeo"].ToString(),
                        Dist_Nombre = reader["Dist_Nombre"].ToString(),
                        Prov_ID = provincia.Prov_ID
                    };

                    provincia.Distritos.Add(distrito);
                }

                return listaRegiones;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la información de la región", ex);
            }
        }

    }
}
