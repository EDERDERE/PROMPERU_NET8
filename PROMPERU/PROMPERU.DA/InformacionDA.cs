using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class InformacionDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public InformacionDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Informacion y devuelve la fila creada
        public async Task<InformacionBE> InsertarInformacionAsync(InformacionBE informacion, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Informacion_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                             
                comando.Parameters.AddWithValue("@Info_Titulo", informacion.Info_Titulo);
                comando.Parameters.AddWithValue("@Info_TituloSeccion", informacion.Info_TituloSeccion);
                comando.Parameters.AddWithValue("@Info_Descripcion", informacion.Info_Descripcion);
                comando.Parameters.AddWithValue("@Info_URLPortada", informacion.Info_URLPortada);
                comando.Parameters.AddWithValue("@Info_URLVideo", informacion.Info_URLVideo);
                comando.Parameters.AddWithValue("@Info_DescripcionBanner", informacion.Info_DescripcionBanner);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Informacion", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Informacion", ex);
            }
        }

        private async Task<InformacionBE> ObtenerInformacionPorIDAsync(int Info_ID)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Informacion_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Info_ID", Info_ID);

                await conexion.OpenAsync();
                await using var reader = await comando.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new InformacionBE
                    {
                        Info_ID = Convert.ToInt32(reader["Info_ID"]),
                        Info_Titulo = reader["Info_Titulo"].ToString(),
                        Info_TituloSeccion = reader["Info_TituloSeccion"].ToString(),
                        Info_Descripcion = reader["Info_Descripcion"].ToString(),
                        Info_URLPortada = reader["Info_URLPortada"].ToString(),
                        Info_URLVideo = reader["Info_URLVideo"].ToString(),
                        Info_DescripcionBanner= reader["Info_DescripcionBanner"].ToString()
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el Informacion por ID", ex);
            }
        }

        public async Task<int> EliminarInformacionAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Informacion_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Info_ID", id);
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Informacion", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Informacion", ex);
            }
        }

        public async Task<int> ActualizarInformacionAsync(InformacionBE informacion, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Informacion_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };                   

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Info_ID", informacion.Info_ID);
                    comando.Parameters.AddWithValue("@Info_Titulo", informacion.Info_Titulo);
                    comando.Parameters.AddWithValue("@Info_TituloSeccion", informacion.Info_TituloSeccion);
                    comando.Parameters.AddWithValue("@Info_Descripcion", informacion.Info_Descripcion);
                    comando.Parameters.AddWithValue("@Info_URLPortada", informacion.Info_URLPortada);
                    comando.Parameters.AddWithValue("@Info_URLVideo", informacion.Info_URLVideo);
                    comando.Parameters.AddWithValue("@Info_DescripcionBanner", informacion.Info_DescripcionBanner);



                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Informacion", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Informacion", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarInformacionAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Informacion", ex);
            }
        }

        public async Task<List<InformacionBE>> ListarInformacionsAsync()
        {
            try
            {
                var Informacions = new List<InformacionBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Informacion_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Informacions.Add(new InformacionBE
                    {
                        Info_ID = Convert.ToInt32(reader["Info_ID"]),
                        Info_Titulo = reader["Info_Titulo"].ToString(),
                        Info_TituloSeccion = reader["Info_TituloSeccion"].ToString(),
                        Info_Descripcion = reader["Info_Descripcion"].ToString(),
                        Info_URLPortada = reader["Info_URLPortada"].ToString(),
                        Info_URLVideo = reader["Info_URLVideo"].ToString(),
                        Info_DescripcionBanner = reader["Info_DescripcionBanner"].ToString()
                    });
                }

                return Informacions;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Informacions", ex);
            }
        }

    }
}
