using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class PreguntaDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public PreguntaDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Pregunta y devuelve la fila creada
        public async Task<int> InsertarPreguntaAsync(PreguntaBE pregunta, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Pregunta_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Insc_ID", pregunta.Insc_ID);
                comando.Parameters.AddWithValue("@Preg_NumeroPregunta", pregunta.Preg_NumeroPregunta);                
                comando.Parameters.AddWithValue("@Preg_TextoPregunta", pregunta.Preg_TextoPregunta);
                comando.Parameters.AddWithValue("@Preg_EsComputable", pregunta.Preg_EsComputable);
                comando.Parameters.AddWithValue("@Preg_TipoRespuesta", pregunta.Preg_TipoRespuesta);
                comando.Parameters.AddWithValue("@Preg_Categoria", pregunta.Preg_Categoria);
                comando.Parameters.AddWithValue("@Curs_ID", pregunta.Curs_ID);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Pregunta", ip, nuevoID);
                }

                return nuevoID;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Pregunta", ex);
            }
        }


        public async Task<int> EliminarPreguntaAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Pregunta_DEL", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Preg_ID", id);
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Pregunta", ip, id, conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Pregunta", ex);
            }
        }

        public async Task<int> ActualizarPreguntaAsync(PreguntaBE pregunta, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Pregunta_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Preg_ID", pregunta.ID);
                    comando.Parameters.AddWithValue("@Insc_ID", pregunta.Insc_ID);
                    comando.Parameters.AddWithValue("@Preg_NumeroPregunta", pregunta.Preg_NumeroPregunta);
                    comando.Parameters.AddWithValue("@Preg_TextoPregunta", pregunta.Preg_TextoPregunta);
                    comando.Parameters.AddWithValue("@Preg_EsComputable", pregunta.Preg_EsComputable);
                    comando.Parameters.AddWithValue("@Preg_TipoRespuesta", pregunta.Preg_TipoRespuesta);
                    comando.Parameters.AddWithValue("@Preg_Categoria", pregunta.Preg_Categoria);
                    comando.Parameters.AddWithValue("@Curs_ID", pregunta.Curs_ID);

                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Pregunta", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Pregunta", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarPreguntaAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Pregunta", ex);
            }
        }

        public async Task<List<PreguntaBE>> ListarPreguntasAsync()
        {
            try
            {
                var preguntas = new List<PreguntaBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Pregunta_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    preguntas.Add(new PreguntaBE
                    {
                        ID = Convert.ToInt32(reader["Preg_ID"]),
                        Insc_ID = Convert.ToInt32(reader["Insc_ID"]),
                        Curs_ID = Convert.ToInt32(reader["Curs_ID"]),
                        Curs_Nombre_Curso = reader["Curs_Nombre_Curso"] != DBNull.Value ? reader["Curs_Nombre_Curso"].ToString() : "",
                        Preg_NumeroPregunta = Convert.ToInt32(reader["Preg_NumeroPregunta"]),               
                        Preg_TextoPregunta = reader["Preg_TextoPregunta"].ToString(),
                        Preg_EsComputable = Convert.ToBoolean(reader["Preg_EsComputable"]),
                        Preg_TipoRespuesta = reader["Preg_TipoRespuesta"].ToString(),
                        Preg_Categoria = reader["Preg_Categoria"].ToString()                   
                    });
                }

                return preguntas;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Preguntas", ex);
            }
        }

    }
}
