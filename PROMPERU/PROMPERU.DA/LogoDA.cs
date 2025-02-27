using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class LogoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public LogoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Logo y devuelve la fila creada
        public async Task<LogoBE> InsertarLogoAsync(LogoBE logo, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Logo_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Logo_NombreBoton", logo.Logo_NombreBoton);
                comando.Parameters.AddWithValue("@Logo_UrlIconBoton", logo.Logo_UrlIconBoton);
                comando.Parameters.AddWithValue("@Logo_UrlPrincipal", logo.Logo_UrlPrincipal);
                comando.Parameters.AddWithValue("@Logo_UrlSecundario", logo.Logo_UrlSecundario);                

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Logo", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Logo", ex);
            }
        }
           

        public async Task<int> EliminarLogoAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Logo_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Cexi_ID", id);
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Logo", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Logo", ex);
            }
        }

        public async Task<int> ActualizarLogoAsync(LogoBE logo, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Logo_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Logo_ID", logo.Logo_ID);
                    comando.Parameters.AddWithValue("@Logo_NombreBoton", logo.Logo_NombreBoton);
                    comando.Parameters.AddWithValue("@Logo_UrlIconBoton", logo.Logo_UrlIconBoton);
                    comando.Parameters.AddWithValue("@Logo_UrlPrincipal", logo.Logo_UrlPrincipal);
                    comando.Parameters.AddWithValue("@Logo_UrlSecundario", logo.Logo_UrlSecundario);
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Logo", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Logo", ip, id, conexion, (SqlTransaction)transaccion);

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
                    // En Logo de excepción, deshacer la transacción
                    await transaccion.RollbackAsync();
                    throw new Exception("Error en ActualizarLogoAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Logo", ex);
            }
        }

        public async Task<List<LogoBE>> ListarLogosAsync()
        {
            try
            {
                var logos = new List<LogoBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Logo_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    logos.Add(new LogoBE
                    {
                        Logo_ID = reader["Logo_ID"] != DBNull.Value ? Convert.ToInt32(reader["Logo_ID"]) : 0,
                        Logo_NombreBoton = reader["Logo_NombreBoton"] != DBNull.Value ? reader["Logo_NombreBoton"].ToString() : "",
                        Logo_UrlIconBoton = reader["Logo_UrlIconBoton"] != DBNull.Value ? reader["Logo_UrlIconBoton"].ToString() : "",
                        Logo_UrlPrincipal = reader["Logo_UrlPrincipal"] != DBNull.Value ? reader["Logo_UrlPrincipal"].ToString() : "",
                        Logo_UrlSecundario = reader["Logo_UrlSecundario"] != DBNull.Value ? reader["Logo_UrlSecundario"].ToString() : ""

                    });
                }

                return logos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Logos", ex);
            }
        }

    }
}
