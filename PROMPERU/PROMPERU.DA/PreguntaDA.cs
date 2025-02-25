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
        public async Task<PreguntaBE> InsertarPreguntaAsync(PreguntaBE pregunta, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Pregunta_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@NumeroPregunta", pregunta.NumeroPregunta);
                comando.Parameters.AddWithValue("@ID_PortalTest", pregunta.ID_PortalTest);
                comando.Parameters.AddWithValue("@TextoPregunta", pregunta.TextoPregunta);
                comando.Parameters.AddWithValue("@EsComputable", pregunta.EsComputable);
                comando.Parameters.AddWithValue("@TipoPregunta", pregunta.TipoPregunta);
                comando.Parameters.AddWithValue("@Titulo", pregunta.Titulo);
                comando.Parameters.AddWithValue("@Titulo2", pregunta.Titulo2);
                comando.Parameters.AddWithValue("@Descripcion", pregunta.Descripcion);
                comando.Parameters.AddWithValue("@Descripcion2", pregunta.Descripcion2);

                var outBannID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outBannID);
                
                await comando.ExecuteNonQueryAsync();

                int bannID = (int)outBannID.Value;

                if (bannID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Pregunta", ip, bannID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Pregunta", ex);
            }
        }
         

        //public async Task<int> EliminarPreguntaAsync(string usuario, string ip, int id)
        //{
        //    try
        //    {
        //        await using var conexion = await _conexionDB.ObtenerConexionAsync();               

        //        await using var transaccion = await conexion.BeginTransactionAsync();
        //        try
        //        {
        //            await using var comando = new SqlCommand("USP_Pregunta_DEL", conexion,(SqlTransaction)transaccion)
        //            {
        //                CommandType = CommandType.StoredProcedure
        //            };

        //            comando.Parameters.AddWithValue("@Bann_ID", id);
        //            int filasAfectadas = await comando.ExecuteNonQueryAsync();

        //            if (filasAfectadas > 0)
        //            {
        //                await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Pregunta", ip, id,conexion, (SqlTransaction)transaccion);
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
        //        throw new Exception("Error al eliminar el Pregunta", ex);
        //    }
        //}

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
                    comando.Parameters.AddWithValue("@NumeroPregunta", pregunta.NumeroPregunta);
                    comando.Parameters.AddWithValue("@Ptes_ID", pregunta.ID_PortalTest);
                    comando.Parameters.AddWithValue("@TextoPregunta", pregunta.TextoPregunta);
                    comando.Parameters.AddWithValue("@EsComputable", pregunta.EsComputable);
                    comando.Parameters.AddWithValue("@TipoPregunta", pregunta.TipoPregunta);
                    comando.Parameters.AddWithValue("@Titulo", pregunta.Titulo);
                    comando.Parameters.AddWithValue("@Titulo2", pregunta.Titulo2);
                    comando.Parameters.AddWithValue("@Descripcion", pregunta.Descripcion);
                    comando.Parameters.AddWithValue("@Descripcion2", pregunta.Descripcion2);


                    // Ejecución del comando
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

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
                        NumeroPregunta = Convert.ToInt32(reader["Preg_NumeroPregunta"]),
                        ID_PortalTest = Convert.ToInt32(reader["Ptes_ID"]),
                        TextoPregunta = reader["Preg_TextoPregunta"].ToString(),
                        EsComputable = Convert.ToBoolean(reader["Preg_EsComputable"]),
                        TipoPregunta = Convert.ToChar(reader["Preg_TipoPregunta"]),
                        Titulo = reader["Preg_Titulo"].ToString(),
                        Titulo2 = reader["Preg_Titulo2"].ToString(),
                        Descripcion = reader["Preg_Descripcion"].ToString(),
                        Descripcion2 = reader["Preg_Descripcion2"].ToString()
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
