using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class ContenidoTestDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public ContenidoTestDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo ContenidoTest y devuelve la fila creada
        public async Task<ContenidoTestBE> InsertarContenidoTestAsync(ContenidoTestBE Contenido, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_ContenidoTest_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Insc_ID", Contenido.Insc_ID);
                comando.Parameters.AddWithValue("@Ctes_Orden", Contenido.Ctes_Orden);
                comando.Parameters.AddWithValue("@Ctes_Titulo", Contenido.Ctes_Titulo);
                comando.Parameters.AddWithValue("@Ctes_Descripcion", Contenido.Ctes_Descripcion);             

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","ContenidoTest", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el ContenidoTest", ex);
            }
        }

        //public async Task<int> EliminarContenidoTestAsync(string usuario, string ip, int id)
        //{
        //    try
        //    {
        //        await using var conexion = await _conexionDB.ObtenerConexionAsync();               

        //        await using var transaccion = await conexion.BeginTransactionAsync();
        //        try
        //        {
        //            await using var comando = new SqlCommand("USP_ContenidoTest_DEL", conexion,(SqlTransaction)transaccion)
        //            {
        //                CommandType = CommandType.StoredProcedure
        //            };

        //            comando.Parameters.AddWithValue("@Bann_ID", id);
        //            var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

        //            if (filasAfectadas > 0)
        //            {
        //                await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "ContenidoTest", ip, id,conexion, (SqlTransaction)transaccion);
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
        //        throw new Exception("Error al eliminar el ContenidoTest", ex);
        //    }
        //}

        //public async Task<int> ActualizarContenidoTestAsync(ContenidoTestBE Contenido, string usuario, string ip, int id)
        //{
        //    try
        //    {
        //        await using var conexion = await _conexionDB.ObtenerConexionAsync();                

        //        await using var transaccion = await conexion.BeginTransactionAsync();
        //        try
        //        {
        //            // Configuración del comando SQL
        //            await using var comando = new SqlCommand("USP_ContenidoTest_UPD", conexion, (SqlTransaction)transaccion)
        //            {
        //                CommandType = CommandType.StoredProcedure
        //            };

        //            // Parámetros del procedimiento almacenado
        //            comando.Parameters.AddWithValue("@Ptes_ID", Contenido.Ptes_ID);
        //            comando.Parameters.AddWithValue("@Insc_ID", Contenido.Insc_ID);
        //            comando.Parameters.AddWithValue("@Ptes_Titulo", Contenido.Ptes_Titulo);
        //            comando.Parameters.AddWithValue("@Ptes_Descripcion", Contenido.Ptes_Descripcion);
        //            comando.Parameters.AddWithValue("@Ptes_NombreBoton", Contenido.Ptes_NombreBoton);
        //            comando.Parameters.AddWithValue("@Ptes_UrlIconoBoton", Contenido.Ptes_UrlIconoBoton);
        //            comando.Parameters.AddWithValue("@Ptes_MensajeAlert", Contenido.Ptes_MensajeAlert);
        //            comando.Parameters.AddWithValue("@Ptes_UrlIconoAlrt", Contenido.Ptes_UrlIconoAlrt);

        //            // Ejecución del comando
        //            var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

        //            if (filasAfectadas > 0)
        //            {
        //                // Registrar la auditoría
        //                //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","ContenidoTest", ip, id);
        //                await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "ContenidoTest", ip, id, conexion, (SqlTransaction)transaccion);

        //                // Confirmar la transacción
        //                await transaccion.CommitAsync();
        //            }
        //            else
        //            {
        //                // Si no se afecta ninguna fila, deshacer la transacción
        //                await transaccion.RollbackAsync();
        //            }

        //            return filasAfectadas;
        //        }
        //        catch (Exception ex)
        //        {
        //            // En caso de excepción, deshacer la transacción
        //            await transaccion.RollbackAsync();
        //            throw new Exception("Error en ActualizarContenidoTestAsync: La transacción fue revertida.", ex);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Manejo de excepciones
        //        throw new Exception("Error al actualizar el ContenidoTest", ex);
        //    }
        //}

        public async Task<List<ContenidoTestBE>> ListarContenidoTestsAsync()
        {
            try
            {
                var ContenidoTests = new List<ContenidoTestBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_ContenidoTest_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    ContenidoTests.Add(new ContenidoTestBE
                    {
                        Ctes_ID = reader["Ctes_ID"] != DBNull.Value ? Convert.ToInt32(reader["Ctes_ID"]) : 0,
                        Insc_ID = reader["Insc_ID"] != DBNull.Value ? Convert.ToInt32(reader["Insc_ID"]) : 0,
                        Ctes_Orden = reader["Ctes_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Ctes_Orden"]) : 0,
                        Ctes_Titulo = reader["Ctes_Titulo"] != DBNull.Value ? reader["Ctes_Titulo"].ToString() : "",
                        Ctes_Descripcion = reader["Ctes_Descripcion"] != DBNull.Value ? reader["Ctes_Descripcion"].ToString() : ""
                    });
                }

                return ContenidoTests;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los ContenidoTests", ex);
            }
        }

    }
}
