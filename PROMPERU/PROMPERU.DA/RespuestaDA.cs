using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class RespuestaDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public RespuestaDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Respuesta y devuelve la fila creada
        public async Task<RespuestaBE> InsertarRespuestaAsync(RespuestaBE respuesta, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Respuesta_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                                
                comando.Parameters.AddWithValue("@Preg_ID", respuesta.Preg_ID);                
                comando.Parameters.AddWithValue("@Resp_Orden", respuesta.Resp_Orden);
                comando.Parameters.AddWithValue("@Resp_Respuesta", respuesta.Resp_Respuesta);
                comando.Parameters.AddWithValue("@Resp_Valor", respuesta.Resp_Valor);               

                var outBannID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outBannID);
                
                await comando.ExecuteNonQueryAsync();

                int bannID = (int)outBannID.Value;

                if (bannID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Respuesta", ip, bannID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Respuesta", ex);
            }
        }
         

        //public async Task<int> EliminarRespuestaAsync(string usuario, string ip, int id)
        //{
        //    try
        //    {
        //        await using var conexion = await _conexionDB.ObtenerConexionAsync();               

        //        await using var transaccion = await conexion.BeginTransactionAsync();
        //        try
        //        {
        //            await using var comando = new SqlCommand("USP_Respuesta_DEL", conexion,(SqlTransaction)transaccion)
        //            {
        //                CommandType = CommandType.StoredProcedure
        //            };

        //            comando.Parameters.AddWithValue("@Bann_ID", id);
        //            int filasAfectadas = await comando.ExecuteNonQueryAsync();

        //            if (filasAfectadas > 0)
        //            {
        //                await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Respuesta", ip, id,conexion, (SqlTransaction)transaccion);
        //                await transaccion.CommitAsync();
        //            }
        //            else
        //            {
        //                await transaccion.RollbackAsync();
        //            }

        //            return filasAfectadas;
        //        }
        //        catch
        //        {
        //            await transaccion.RollbackAsync();
        //            throw;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error al eliminar el Respuesta", ex);
        //    }
        //}

        public async Task<int> ActualizarRespuestaAsync(RespuestaBE respuesta, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Respuesta_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Resp_ID", respuesta.ID);
                    comando.Parameters.AddWithValue("@Preg_ID", respuesta.Preg_ID);
                    comando.Parameters.AddWithValue("@Resp_Orden", respuesta.Resp_Orden);
                    comando.Parameters.AddWithValue("@Resp_Respuesta", respuesta.Resp_Respuesta);
                    comando.Parameters.AddWithValue("@Resp_Valor", respuesta.Resp_Valor);


                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Respuesta", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Respuesta", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarRespuestaAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Respuesta", ex);
            }
        }

        public async Task<List<RespuestaBE>> ListarRespuestasAsync()
        {
            try
            {
                var Respuestas = new List<RespuestaBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Respuesta_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Respuestas.Add(new RespuestaBE
                    {
                        ID = Convert.ToInt32(reader["Resp_ID"]),
                        Preg_ID = Convert.ToInt32(reader["Preg_ID"]),
                        Resp_Orden = Convert.ToInt32(reader["Resp_Orden"]),
                        Resp_Respuesta = reader["Resp_Respuesta"].ToString(),
                        Resp_Valor = Convert.ToInt32(reader["Resp_Valor"]),
                    });
                }

                return Respuestas;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Respuestas", ex);
            }
        }

    }
}
