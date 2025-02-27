using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class BannerDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public BannerDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Banner y devuelve la fila creada
        public async Task<BannerBE> InsertarBannerAsync(BannerBE banner, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Banner_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                             
                comando.Parameters.AddWithValue("@Bann_Orden", banner.Bann_Orden);
                comando.Parameters.AddWithValue("@Bann_Nombre", banner.Bann_Nombre);
                comando.Parameters.AddWithValue("@Bann_URLImagen", banner.Bann_URLImagen);

                var outBannID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outBannID);
                
                await comando.ExecuteNonQueryAsync();

                int bannID = (int)outBannID.Value;

                if (bannID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Banner", ip, bannID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Banner", ex);
            }
        }      

        public async Task<int> EliminarBannerAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Banner_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Bann_ID", id);
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Banner", ip, id,conexion, (SqlTransaction)transaccion);
                        await transaccion.CommitAsync();
                    }
                    else
                    {
                        await transaccion.RollbackAsync();
                    }

                    return filasAfectadas;
                }
                catch
                {
                    await transaccion.RollbackAsync();
                    throw;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el Banner", ex);
            }
        }

        public async Task<int> ActualizarBannerAsync(BannerBE banner, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Banner_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Bann_ID", banner.Bann_ID);
                    comando.Parameters.AddWithValue("@Bann_Orden", banner.Bann_Orden);
                    comando.Parameters.AddWithValue("@Bann_Nombre", banner.Bann_Nombre);
                    comando.Parameters.AddWithValue("@Bann_URLImagen", banner.Bann_URLImagen);
                  
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Banner", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Banner", ip, id, conexion, (SqlTransaction)transaccion);

                        // Confirmar la transacción
                        await transaccion.CommitAsync();
                    }
                    else
                    {
                        // Si no se afecta ninguna fila, deshacer la transacción
                        await transaccion.RollbackAsync();
                    }

                    return filasAfectadas;
                }
                catch (Exception ex)
                {
                    // En caso de excepción, deshacer la transacción
                    await transaccion.RollbackAsync();
                    throw new Exception("Error en ActualizarBannerAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Banner", ex);
            }
        }

        public async Task<List<BannerBE>> ListarBannersAsync()
        {
            try
            {
                var banners = new List<BannerBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Banner_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    banners.Add(new BannerBE
                    {
                        Bann_ID = Convert.ToInt32(reader["Bann_ID"]),                        
                        Bann_Orden = Convert.ToInt32(reader["Bann_Orden"]),
                        Bann_Nombre = reader["Bann_Nombre"].ToString(),
                        Bann_URLImagen = reader["Bann_URLImagen"].ToString()
                    });
                }

                return banners;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Banners", ex);
            }
        }

    }
}
