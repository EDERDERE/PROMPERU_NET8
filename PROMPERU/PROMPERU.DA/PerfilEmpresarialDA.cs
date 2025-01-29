using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class PerfilEmpresarialDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public PerfilEmpresarialDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo PerfilEmpresarial y devuelve la fila creada
        public async Task<PerfilEmpresarialBE> InsertarPerfilEmpresarialAsync(PerfilEmpresarialBE perfilEmpresarial, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_PerfilEmpresarial_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
          
                comando.Parameters.AddWithValue("@Pemp_Nombre", perfilEmpresarial.Pemp_Nombre);
                comando.Parameters.AddWithValue("@Pemp_Descripcion", perfilEmpresarial.Pemp_Descripcion);               
                comando.Parameters.AddWithValue("@Pemp_UrlImagen", perfilEmpresarial.Pemp_UrlImagen);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","PerfilEmpresarial", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el PerfilEmpresarial", ex);
            }
        }

        private async Task<PerfilEmpresarialBE> ObtenerPerfilEmpresarialPorIDAsync(int Pemp_ID)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_PerfilEmpresarial_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Pemp_ID", Pemp_ID);

                await conexion.OpenAsync();
                await using var reader = await comando.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new PerfilEmpresarialBE
                    {
                        Pemp_ID = reader["Pemp_ID"] != DBNull.Value ? Convert.ToInt32(reader["Pemp_ID"]) : 0,
                        Pemp_Nombre = reader["Pemp_Nombre"] != DBNull.Value ? reader["Pemp_Nombre"].ToString() : "",
                        Pemp_Descripcion = reader["Pemp_Descripcion"] != DBNull.Value ? reader["Pemp_Descripcion"].ToString() : "",
                        Pemp_UrlImagen = reader["Pemp_UrlImagen"] != DBNull.Value ? reader["Pemp_UrlImagen"].ToString() : ""


                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el PerfilEmpresarial por ID", ex);
            }
        }

        public async Task<int> EliminarPerfilEmpresarialAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_PerfilEmpresarial_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Pemp_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "PerfilEmpresarial", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el PerfilEmpresarial", ex);
            }
        }

        public async Task<int> ActualizarPerfilEmpresarialAsync(PerfilEmpresarialBE perfilEmpresarial, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_PerfilEmpresarial_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Pemp_ID", perfilEmpresarial.Pemp_ID);
                    comando.Parameters.AddWithValue("@Pemp_Nombre", perfilEmpresarial.Pemp_Nombre);
                    comando.Parameters.AddWithValue("@Pemp_Descripcion", perfilEmpresarial.Pemp_Descripcion);                   
                    comando.Parameters.AddWithValue("@Pemp_UrlImagen", perfilEmpresarial.Pemp_UrlImagen);
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","PerfilEmpresarial", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "PerfilEmpresarial", ip, id, conexion, (SqlTransaction)transaccion);

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
                    // En PerfilEmpresarial de excepción, deshacer la transacción
                    await transaccion.RollbackAsync();
                    throw new Exception("Error en ActualizarPerfilEmpresarialAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el PerfilEmpresarial", ex);
            }
        }

        public async Task<List<PerfilEmpresarialBE>> ListarPerfilEmpresarialsAsync()
        {
            try
            {
                var PerfilEmpresarials = new List<PerfilEmpresarialBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_PerfilEmpresarial_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    PerfilEmpresarials.Add(new PerfilEmpresarialBE
                    {
                        Pemp_ID = reader["Pemp_ID"] != DBNull.Value ? Convert.ToInt32(reader["Pemp_ID"]) : 0,
                        Pemp_Nombre = reader["Pemp_Nombre"] != DBNull.Value ? reader["Pemp_Nombre"].ToString() : "",
                        Pemp_Descripcion = reader["Pemp_Descripcion"] != DBNull.Value ? reader["Pemp_Descripcion"].ToString() : "",
                        Pemp_UrlImagen = reader["Pemp_UrlImagen"] != DBNull.Value ? reader["Pemp_UrlImagen"].ToString() : ""
                    });
                }

                return PerfilEmpresarials;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los PerfilEmpresarials", ex);
            }
        }

    }
}
