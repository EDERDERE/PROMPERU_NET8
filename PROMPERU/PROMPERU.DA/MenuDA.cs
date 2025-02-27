using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class MenuDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public MenuDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Menu y devuelve la fila creada
        public async Task<MenuBE> InsertarMenuAsync(MenuBE menu, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Menu_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Menu_Nombre", menu.Menu_Nombre);
                comando.Parameters.AddWithValue("@Menu_Orden", menu.Menu_Orden);
                comando.Parameters.AddWithValue("@Menu_UrlIconBoton", menu.Menu_UrlIconBoton);                               

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Menu", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Menu", ex);
            }
        }

        private async Task<MenuBE> ObtenerMenuPorIDAsync(int Menu_ID)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Menu_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Menu_ID", Menu_ID);

                await conexion.OpenAsync();
                await using var reader = await comando.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new MenuBE
                    {
                        Menu_ID = reader["Menu_ID"] != DBNull.Value ? Convert.ToInt32(reader["Menu_ID"]) : 0,
                        Menu_Nombre = reader["Menu_Nombre"] != DBNull.Value ? reader["Menu_Nombre"].ToString() : "",
                        Menu_Orden = reader["Menu_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Menu_Orden"]) : 0,
                        Menu_UrlIconBoton = reader["Menu_UrlIconBoton"] != DBNull.Value ? reader["Menu_UrlIconBoton"].ToString() : "",
                          


                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el Menu por ID", ex);
            }
        }

        public async Task<int> EliminarMenuAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Menu_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Menu_ID", id);
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Menu", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Menu", ex);
            }
        }

        public async Task<int> ActualizarMenuAsync(MenuBE menu, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Menu_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Menu_ID", menu.Menu_ID);
                    comando.Parameters.AddWithValue("@Menu_Nombre", menu.Menu_Nombre);
                    comando.Parameters.AddWithValue("@Menu_Orden", menu.Menu_Orden);
                    comando.Parameters.AddWithValue("@Menu_UrlIconBoton", menu.Menu_UrlIconBoton);
                
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Menu", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Menu", ip, id, conexion, (SqlTransaction)transaccion);

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
                    // En Menu de excepción, deshacer la transacción
                    await transaccion.RollbackAsync();
                    throw new Exception("Error en ActualizarMenuAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Menu", ex);
            }
        }

        public async Task<List<MenuBE>> ListarMenusAsync()
        {
            try
            {
                var Menus = new List<MenuBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Menu_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Menus.Add(new MenuBE
                    {
                        Menu_ID = reader["Menu_ID"] != DBNull.Value ? Convert.ToInt32(reader["Menu_ID"]) : 0,
                        Menu_Orden = reader["Menu_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Menu_Orden"]) : 0,
                        Menu_Nombre = reader["Menu_Nombre"] != DBNull.Value ? reader["Menu_Nombre"].ToString() : "",
                        Menu_UrlIconBoton = reader["Menu_UrlIconBoton"] != DBNull.Value ? reader["Menu_UrlIconBoton"].ToString() : "",
                      

                    });
                }

                return Menus;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Menus", ex);
            }
        }

    }
}
