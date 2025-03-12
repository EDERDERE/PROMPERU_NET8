using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class FormularioTestDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public FormularioTestDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo FormularioTest y devuelve la fila creada
        public async Task<FormularioTestBE> InsertarFormularioTestAsync(FormularioTestBE Formulario, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_FormularioTest_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Insc_ID", Formulario.Insc_ID);
                comando.Parameters.AddWithValue("@Ftes_Orden", Formulario.Ftes_Orden);
                comando.Parameters.AddWithValue("@Ftes_Texto", Formulario.Ftes_Texto);
                comando.Parameters.AddWithValue("@Ftes_Valor", Formulario.Ftes_Valor);             

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","FormularioTest", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el FormularioTest", ex);
            }
        }

        public async Task<int> EliminarFormularioTestAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_FormularioTest_DEL", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Ftes_ID", id);
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "FormularioTest", ip, id, conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el FormularioTest", ex);
            }
        }

        public async Task<int> ActualizarFormularioTestAsync(FormularioTestBE Formulario, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_FormularioTest_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Ftes_ID", Formulario.Ftes_ID);
                    comando.Parameters.AddWithValue("@Insc_ID", Formulario.Insc_ID);
                    comando.Parameters.AddWithValue("@Ftes_Orden", Formulario.Ftes_Orden);
                    comando.Parameters.AddWithValue("@Ftes_Texto", Formulario.Ftes_Texto);
                    comando.Parameters.AddWithValue("@Ftes_Valor", Formulario.Ftes_Valor);

                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","FormularioTest", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "FormularioTest", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarFormularioTestAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el FormularioTest", ex);
            }
        }

        public async Task<List<FormularioTestBE>> ListarFormularioTestsAsync()
        {
            try
            {
                var FormularioTests = new List<FormularioTestBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_FormularioTest_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    FormularioTests.Add(new FormularioTestBE
                    {
                        Ftes_ID = reader["Ftes_ID"] != DBNull.Value ? Convert.ToInt32(reader["Ftes_ID"]) : 0,
                        Insc_ID = reader["Insc_ID"] != DBNull.Value ? Convert.ToInt32(reader["Insc_ID"]) : 0,
                        Ftes_Orden = reader["Ftes_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Ftes_Orden"]) : 0,
                        Ftes_Texto = reader["Ftes_Texto"] != DBNull.Value ? reader["Ftes_Texto"].ToString() : "",
                        Ftes_Valor = reader["Ftes_Valor"] != DBNull.Value ? reader["Ftes_Valor"].ToString() : ""

                    });
                }

                return FormularioTests;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los FormularioTests", ex);
            }
        }

    }
}
