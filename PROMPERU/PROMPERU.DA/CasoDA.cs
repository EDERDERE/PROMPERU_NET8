using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class CasoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public CasoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Caso y devuelve la fila creada
        public async Task<CasoBE> InsertarCasoAsync(CasoBE caso, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_CasoExito_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Cexi_Nombre", caso.Cexi_Nombre);
                comando.Parameters.AddWithValue("@Cexi_Orden", caso.Cexi_Orden);
                comando.Parameters.AddWithValue("@Cexi_Titulo", caso.Cexi_Titulo);
                comando.Parameters.AddWithValue("@Cexi_UrlVideo", caso.Cexi_UrlVideo);
                comando.Parameters.AddWithValue("@Cexi_TituloVideo", caso.Cexi_TituloVideo);
                comando.Parameters.AddWithValue("@Cexi_NombreBoton", caso.Cexi_NombreBoton);
                comando.Parameters.AddWithValue("@Cexi_UrlBoton", caso.Cexi_UrlBoton);
                comando.Parameters.AddWithValue("@Cexi_Descripcion", caso.Cexi_Descripcion);
                comando.Parameters.AddWithValue("@Cexi_UrlIcon", caso.Cexi_UrlIcon);
                comando.Parameters.AddWithValue("@Cexi_UrlPerfil", caso.Cexi_UrlPerfil);
                comando.Parameters.AddWithValue("@Cexi_UrlCabecera", caso.Cexi_UrlCabecera);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Caso", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Caso", ex);
            }
        }
          

        public async Task<int> EliminarCasoAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_CasoExito_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Cexi_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Caso", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Caso", ex);
            }
        }

        public async Task<int> ActualizarCasoAsync(CasoBE caso, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_CasoExito_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Cexi_ID", caso.Cexi_ID);
                    comando.Parameters.AddWithValue("@Cexi_Nombre", caso.Cexi_Nombre);
                    comando.Parameters.AddWithValue("@Cexi_Orden", caso.Cexi_Orden);
                    comando.Parameters.AddWithValue("@Cexi_Titulo", caso.Cexi_Titulo);
                    comando.Parameters.AddWithValue("@Cexi_UrlVideo", caso.Cexi_UrlVideo);
                    comando.Parameters.AddWithValue("@Cexi_TituloVideo", caso.Cexi_TituloVideo);
                    comando.Parameters.AddWithValue("@Cexi_NombreBoton", caso.Cexi_NombreBoton);
                    comando.Parameters.AddWithValue("@Cexi_UrlBoton", caso.Cexi_UrlBoton);
                    comando.Parameters.AddWithValue("@Cexi_Descripcion", caso.Cexi_Descripcion);
                    comando.Parameters.AddWithValue("@Cexi_UrlIcon", caso.Cexi_UrlIcon);
                    comando.Parameters.AddWithValue("@Cexi_UrlPerfil", caso.Cexi_UrlPerfil);
                    comando.Parameters.AddWithValue("@Cexi_UrlCabecera", caso.Cexi_UrlCabecera);
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Caso", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Caso", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarCasoAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Caso", ex);
            }
        }

        public async Task<List<CasoBE>> ListarCasosAsync()
        {
            try
            {
                var Casos = new List<CasoBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_CasoExito_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Casos.Add(new CasoBE
                    {
                        Cexi_ID = reader["Cexi_ID"] != DBNull.Value ? Convert.ToInt32(reader["Cexi_ID"]) : 0,
                        Cexi_Nombre = reader["Cexi_Nombre"] != DBNull.Value ? reader["Cexi_Nombre"].ToString() : "",
                        Cexi_Orden = reader["Cexi_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Cexi_Orden"]) : 0,
                        Cexi_Titulo = reader["Cexi_Titulo"] != DBNull.Value ? reader["Cexi_Titulo"].ToString() : "",
                        Cexi_UrlVideo = reader["Cexi_UrlVideo"] != DBNull.Value ? reader["Cexi_UrlVideo"].ToString() : "",
                        Cexi_TituloVideo = reader["Cexi_TituloVideo"] != DBNull.Value ? reader["Cexi_TituloVideo"].ToString() : "",
                        Cexi_NombreBoton = reader["Cexi_NombreBoton"] != DBNull.Value ? reader["Cexi_NombreBoton"].ToString() : "",
                        Cexi_UrlBoton = reader["Cexi_UrlBoton"] != DBNull.Value ? reader["Cexi_UrlBoton"].ToString() : "",
                        Cexi_Descripcion = reader["Cexi_Descripcion"] != DBNull.Value ? reader["Cexi_Descripcion"].ToString() : "",
                        Cexi_UrlIcon = reader["Cexi_UrlIcon"] != DBNull.Value ? reader["Cexi_UrlIcon"].ToString() : "",
                        Cexi_UrlPerfil = reader["Cexi_UrlPerfil"] != DBNull.Value ? reader["Cexi_UrlPerfil"].ToString() : "",
                        Cexi_UrlCabecera = reader["Cexi_UrlCabecera"] != DBNull.Value ? reader["Cexi_UrlCabecera"].ToString() : "",

                    });
                }

                return Casos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Casos", ex);
            }
        }

    }
}
