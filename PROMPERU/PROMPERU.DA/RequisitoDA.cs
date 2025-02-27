using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class RequisitoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public RequisitoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Requisito y devuelve la fila creada
        public async Task<RequisitoBE> InsertarRequisitoAsync(RequisitoBE requisito, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Requisito_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                             
                comando.Parameters.AddWithValue("@Requ_Orden", requisito.Requ_Orden);
                comando.Parameters.AddWithValue("@Requ_Titulo", requisito.Requ_Titulo);
                comando.Parameters.AddWithValue("@Requ_TituloSeccion", requisito.Requ_TituloSeccion);
                comando.Parameters.AddWithValue("@Requ_Nombre", requisito.Requ_Nombre);
                comando.Parameters.AddWithValue("@Requ_Descripcion", requisito.Requ_Descripcion);
                comando.Parameters.AddWithValue("@Requ_URLIcon", requisito.Requ_URLIcon);
                comando.Parameters.AddWithValue("@Requ_URLImagen", requisito.Requ_URLImagen);


                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Requisito", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Requisito", ex);
            }
        }
            
        public async Task<int> EliminarRequisitoAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Requisito_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Requ_ID", id);
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Requisito", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Requisito", ex);
            }
        }

        public async Task<int> ActualizarRequisitoAsync(RequisitoBE requisito, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Requisito_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Requ_ID", requisito.Requ_ID);
                    comando.Parameters.AddWithValue("@Requ_Orden", requisito.Requ_Orden);
                    comando.Parameters.AddWithValue("@Requ_Titulo", requisito.Requ_Titulo);
                    comando.Parameters.AddWithValue("@Requ_TituloSeccion", requisito.Requ_TituloSeccion);
                    comando.Parameters.AddWithValue("@Requ_Nombre", requisito.Requ_Nombre);
                    comando.Parameters.AddWithValue("@Requ_Descripcion", requisito.Requ_Descripcion);
                    comando.Parameters.AddWithValue("@Requ_URLIcon", requisito.Requ_URLIcon);
                    comando.Parameters.AddWithValue("@Requ_URLImagen", requisito.Requ_URLImagen);

                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Requisito", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Requisito", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarRequisitoAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Requisito", ex);
            }
        }

        public async Task<List<RequisitoBE>> ListarRequisitosAsync()
        {
            try
            {
                var Requisitos = new List<RequisitoBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Requisito_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Requisitos.Add(new RequisitoBE
                    {
                        Requ_ID = Convert.ToInt32(reader["Requ_ID"]),
                        Requ_Orden = Convert.ToInt32(reader["Requ_Orden"]),
                        Requ_Titulo = reader["Requ_Titulo"].ToString(),
                        Requ_TituloSeccion = reader["Requ_TituloSeccion"].ToString(),
                        Requ_Nombre = reader["Requ_Nombre"].ToString(),
                        Requ_Descripcion = reader["Requ_Descripcion"].ToString(),
                        Requ_URLIcon = reader["Requ_URLIcon"].ToString(),
                        Requ_URLImagen = reader["Requ_URLImagen"].ToString()
                    });
                }

                return Requisitos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Requisitos", ex);
            }
        }

    }
}
