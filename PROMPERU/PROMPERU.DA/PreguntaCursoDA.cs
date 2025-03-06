using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class PreguntaCursoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public PreguntaCursoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo PreguntaCurso y devuelve la fila creada
        public async Task<PreguntaCursoBE> InsertarPreguntaCursoAsync(PreguntaCursoBE preguntaCurso, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_PreguntaCurso_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Preg_ID", preguntaCurso.Preg_ID);                
                comando.Parameters.AddWithValue("@Curs_ID", preguntaCurso.Curs_ID);


                var outBannID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outBannID);
                
                await comando.ExecuteNonQueryAsync();

                int bannID = (int)outBannID.Value;

                if (bannID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","PreguntaCurso", ip, bannID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el PreguntaCurso", ex);
            }
        }
         

        //public async Task<int> EliminarPreguntaCursoAsync(string usuario, string ip, int id)
        //{
        //    try
        //    {
        //        await using var conexion = await _conexionDB.ObtenerConexionAsync();               

        //        await using var transaccion = await conexion.BeginTransactionAsync();
        //        try
        //        {
        //            await using var comando = new SqlCommand("USP_PreguntaCurso_DEL", conexion,(SqlTransaction)transaccion)
        //            {
        //                CommandType = CommandType.StoredProcedure
        //            };

        //            comando.Parameters.AddWithValue("@Bann_ID", id);
        //            int filasAfectadas = await comando.ExecuteNonQueryAsync();

        //            if (filasAfectadas > 0)
        //            {
        //                await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "PreguntaCurso", ip, id,conexion, (SqlTransaction)transaccion);
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
        //        throw new Exception("Error al eliminar el PreguntaCurso", ex);
        //    }
        //}

        public async Task<int> ActualizarPreguntaCursoAsync(PreguntaCursoBE preguntaCurso, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_PreguntaCurso_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Preg_ID", preguntaCurso.Preg_ID);
                    comando.Parameters.AddWithValue("@Curs_ID", preguntaCurso.Curs_ID);


                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","PreguntaCurso", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "PreguntaCurso", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarPreguntaCursoAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el PreguntaCurso", ex);
            }
        }

        public async Task<List<PreguntaCursoBE>> ListarPreguntaCursosAsync()
        {
            try
            {
                var PreguntaCursos = new List<PreguntaCursoBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_PreguntaCurso_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    PreguntaCursos.Add(new PreguntaCursoBE
                    {                   
                        Pcur_ID = reader["Pcur_ID"] != DBNull.Value ? Convert.ToInt32(reader["Pcur_ID"]) : 0,
                        Preg_ID = reader["Preg_ID"] != DBNull.Value ? Convert.ToInt32(reader["Preg_ID"]) : 0,
                        Curs_ID = reader["Curs_ID"] != DBNull.Value ? Convert.ToInt32(reader["Curs_ID"]) : 0,
                        Curs_NombreCurso = reader["Curs_NombreCurso"] != DBNull.Value ? reader["Curs_NombreCurso"].ToString() : "",                       
                    });
                }

                return PreguntaCursos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los PreguntaCursos", ex);
            }
        }

    }
}
