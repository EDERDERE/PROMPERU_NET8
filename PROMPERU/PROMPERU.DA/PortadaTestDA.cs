using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class PortadaTestDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public PortadaTestDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo PortadaTest y devuelve la fila creada
        public async Task<PortadaTestBE> InsertarPortadaTestAsync(PortadaTestBE portada, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_PortadaTest_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Insc_ID", portada.Insc_ID);
                comando.Parameters.AddWithValue("@Ptes_Titulo", portada.Ptes_Titulo);
                comando.Parameters.AddWithValue("@Ptes_Descripcion", portada.Ptes_Descripcion);
                comando.Parameters.AddWithValue("@Ptes_NombreBoton", portada.Ptes_NombreBoton);
                comando.Parameters.AddWithValue("@Ptes_UrlIconoBoton", portada.Ptes_UrlIconoBoton);
                comando.Parameters.AddWithValue("@Ptes_MensajeAlert", portada.Ptes_MensajeAlert);
                comando.Parameters.AddWithValue("@Ptes_UrlIconoAlrt", portada.Ptes_UrlIconoAlrt); 

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","PortadaTest", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el PortadaTest", ex);
            }
        }
        
        public async Task<int> EliminarPortadaTestAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_PortadaTest_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@@Ptes_ID", id);
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "PortadaTest", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el PortadaTest", ex);
            }
        }

        public async Task<int> ActualizarPortadaTestAsync(PortadaTestBE portada, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_PortadaTest_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Ptes_ID", portada.Ptes_ID);
                    comando.Parameters.AddWithValue("@Insc_ID", portada.Insc_ID);
                    comando.Parameters.AddWithValue("@Ptes_Titulo", portada.Ptes_Titulo);
                    comando.Parameters.AddWithValue("@Ptes_Descripcion", portada.Ptes_Descripcion);
                    comando.Parameters.AddWithValue("@Ptes_NombreBoton", portada.Ptes_NombreBoton);
                    comando.Parameters.AddWithValue("@Ptes_UrlIconoBoton", portada.Ptes_UrlIconoBoton);
                    comando.Parameters.AddWithValue("@Ptes_MensajeAlert", portada.Ptes_MensajeAlert);
                    comando.Parameters.AddWithValue("@Ptes_UrlIconoAlrt", portada.Ptes_UrlIconoAlrt);

                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","PortadaTest", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "PortadaTest", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarPortadaTestAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el PortadaTest", ex);
            }
        }

        public async Task<List<PortadaTestBE>> ListarPortadaTestsAsync()
        {
            try
            {
                var PortadaTests = new List<PortadaTestBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_PortadaTest_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    PortadaTests.Add(new PortadaTestBE
                    {
                        Ptes_ID = Convert.ToInt32(reader["Ptes_ID"]),
                        Insc_ID = Convert.ToInt32(reader["Insc_ID"]),
                        Ptes_Titulo = reader["Ptes_Titulo"].ToString(),
                        Ptes_Descripcion = reader["Ptes_Descripcion"].ToString(),
                        Ptes_NombreBoton = reader["Ptes_NombreBoton"].ToString(),
                        Ptes_UrlIconoBoton = reader["Ptes_UrlIconoBoton"].ToString(),
                        Ptes_MensajeAlert = reader["Ptes_MensajeAlert"].ToString(),
                        Ptes_UrlIconoAlrt = reader["Ptes_UrlIconoAlrt"].ToString()
                    });
                }

                return PortadaTests;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los PortadaTests", ex);
            }
        }

    }
}
