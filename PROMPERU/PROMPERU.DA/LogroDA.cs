using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class LogroDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public LogroDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Logro y devuelve la fila creada
        public async Task<LogroBE> InsertarLogroAsync(LogroBE logro, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Logro_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
          
                comando.Parameters.AddWithValue("@Logr_Nombre", logro.Logr_Nombre);
                comando.Parameters.AddWithValue("@Logr_Descripcion", logro.Logr_Descripcion);
                comando.Parameters.AddWithValue("@Logr_UrlIcon", logro.Logr_UrlIcon);                

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Logro", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Logro", ex);
            }
        }

       
        public async Task<int> EliminarLogroAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Logro_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Logr_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Logro", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Logro", ex);
            }
        }

        public async Task<int> ActualizarLogroAsync(LogroBE logro, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Logro_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Logr_ID", logro.Logr_ID);
                    comando.Parameters.AddWithValue("@Logr_Nombre", logro.Logr_Nombre);
                    comando.Parameters.AddWithValue("@Logr_Descripcion", logro.Logr_Descripcion);
                    comando.Parameters.AddWithValue("@Logr_UrlIcon", logro.Logr_UrlIcon);
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Logro", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Logro", ip, id, conexion, (SqlTransaction)transaccion);

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
                    // En Logro de excepción, deshacer la transacción
                    await transaccion.RollbackAsync();
                    throw new Exception("Error en ActualizarLogroAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Logro", ex);
            }
        }

        public async Task<List<LogroBE>> ListarLogrosAsync()
        {
            try
            {
                var logros = new List<LogroBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Logro_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    logros.Add(new LogroBE
                    {
                        Logr_ID = reader["Logr_ID"] != DBNull.Value ? Convert.ToInt32(reader["Logr_ID"]) : 0,
                        Logr_Nombre = reader["Logr_Nombre"] != DBNull.Value ? reader["Logr_Nombre"].ToString() : "",
                        Logr_Descripcion = reader["Logr_Descripcion"] != DBNull.Value ? reader["Logr_Descripcion"].ToString() : "",
                        Logr_UrlIcon = reader["Logr_UrlIcon"] != DBNull.Value ? reader["Logr_UrlIcon"].ToString() : ""

                    });
                }

                return logros;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Logros", ex);
            }
        }

    }
}
