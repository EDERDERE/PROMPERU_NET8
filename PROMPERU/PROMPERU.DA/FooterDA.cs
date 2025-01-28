using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class FooterDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public FooterDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Footer y devuelve la fila creada
        public async Task<FooterBE> InsertarFooterAsync(FooterBE footer, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Footer_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
          
                comando.Parameters.AddWithValue("@Foot_Nombre", footer.Foot_Nombre);
                comando.Parameters.AddWithValue("@Foot_Contacto", footer.Foot_Contacto);
                comando.Parameters.AddWithValue("@Foot_UrlIconContacto", footer.Foot_UrlIconContacto);
                comando.Parameters.AddWithValue("@Foot_Ubicacion", footer.Foot_Ubicacion);
                comando.Parameters.AddWithValue("@Foot_UrlIconUbicacion", footer.Foot_UrlIconUbicacion);
                comando.Parameters.AddWithValue("@Foot_UrlLogoPrincipal", footer.Foot_UrlLogoPrincipal);
                comando.Parameters.AddWithValue("@Foot_UrlLogoSecundario", footer.Foot_UrlLogoSecundario);
                comando.Parameters.AddWithValue("@Foot_Ayuda", footer.Foot_Ayuda);
                comando.Parameters.AddWithValue("@Foot_Comunicate", footer.Foot_Comunicate);
                comando.Parameters.AddWithValue("@Foot_UrlIconMensaje", footer.Foot_UrlIconMensaje);
                comando.Parameters.AddWithValue("@Foot_UrlIconWhatssap", footer.Foot_UrlIconWhatssap);        

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Footer", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Footer", ex);
            }
        }

        private async Task<FooterBE> ObtenerFooterPorIDAsync(int footer_ID)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Footer_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Footer_ID", footer_ID);

                await conexion.OpenAsync();
                await using var reader = await comando.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new FooterBE
                    {
                        Foot_ID = reader["Foot_ID"] != DBNull.Value ? Convert.ToInt32(reader["Foot_ID"]) : 0,
                        Foot_Nombre = reader["Foot_Nombre"] != DBNull.Value ? reader["Foot_Nombre"].ToString() : "",
                        Foot_Contacto = reader["Foot_Contacto"] != DBNull.Value ? reader["Foot_Contacto"].ToString() : "",
                        Foot_UrlIconContacto = reader["Foot_UrlIconContacto"] != DBNull.Value ? reader["Foot_UrlIconContacto"].ToString() : "",
                        Foot_Ubicacion = reader["Foot_Ubicacion"] != DBNull.Value ? reader["Foot_Ubicacion"].ToString() : "",
                        Foot_UrlIconUbicacion = reader["Foot_UrlIconUbicacion"] != DBNull.Value ? reader["Foot_UrlIconUbicacion"].ToString() : "",
                        Foot_UrlLogoPrincipal = reader["Foot_UrlLogoPrincipal"] != DBNull.Value ? reader["Foot_UrlLogoPrincipal"].ToString() : "",
                        Foot_UrlLogoSecundario = reader["Foot_UrlLogoSecundario"] != DBNull.Value ? reader["Foot_UrlLogoSecundario"].ToString() : "",
                        Foot_Ayuda = reader["Foot_Ayuda"] != DBNull.Value ? reader["Foot_Ayuda"].ToString() : "",
                        Foot_Comunicate = reader["Foot_Comunicate"] != DBNull.Value ? reader["Foot_Comunicate"].ToString() : "",
                        Foot_UrlIconMensaje = reader["Foot_UrlIconMensaje"] != DBNull.Value ? reader["Foot_UrlIconMensaje"].ToString() : "",
                        Foot_UrlIconWhatssap = reader["Foot_UrlIconWhatssap"] != DBNull.Value ? reader["Foot_UrlIconWhatssap"].ToString() : ""
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el Footer por ID", ex);
            }
        }

        public async Task<int> EliminarFooterAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Footer_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Logr_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Footer", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Footer", ex);
            }
        }

        public async Task<int> ActualizarFooterAsync(FooterBE footer, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Footer_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Foot_ID", footer.Foot_ID);
                    comando.Parameters.AddWithValue("@Foot_Nombre", footer.Foot_Nombre);
                    comando.Parameters.AddWithValue("@Foot_Contacto", footer.Foot_Contacto);
                    comando.Parameters.AddWithValue("@Foot_UrlIconContacto", footer.Foot_UrlIconContacto);
                    comando.Parameters.AddWithValue("@Foot_Ubicacion", footer.Foot_Ubicacion);
                    comando.Parameters.AddWithValue("@Foot_UrlIconUbicacion", footer.Foot_UrlIconUbicacion);
                    comando.Parameters.AddWithValue("@Foot_UrlLogoPrincipal", footer.Foot_UrlLogoPrincipal);
                    comando.Parameters.AddWithValue("@Foot_UrlLogoSecundario", footer.Foot_UrlLogoSecundario);
                    comando.Parameters.AddWithValue("@Foot_Ayuda", footer.Foot_Ayuda);
                    comando.Parameters.AddWithValue("@Foot_Comunicate", footer.Foot_Comunicate);
                    comando.Parameters.AddWithValue("@Foot_UrlIconMensaje", footer.Foot_UrlIconMensaje);
                    comando.Parameters.AddWithValue("@Foot_UrlIconWhatssap", footer.Foot_UrlIconWhatssap);
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Footer", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Footer", ip, id, conexion, (SqlTransaction)transaccion);

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
                    // En Footer de excepción, deshacer la transacción
                    await transaccion.RollbackAsync();
                    throw new Exception("Error en ActualizarFooterAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Footer", ex);
            }
        }

        public async Task<List<FooterBE>> ListarFootersAsync()
        {
            try
            {
                var Footers = new List<FooterBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Footer_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Footers.Add(new FooterBE
                    {
                        Foot_ID = reader["Foot_ID"] != DBNull.Value ? Convert.ToInt32(reader["Foot_ID"]) : 0,
                        Foot_Nombre = reader["Foot_Nombre"] != DBNull.Value ? reader["Foot_Nombre"].ToString() : "",
                        Foot_Contacto = reader["Foot_Contacto"] != DBNull.Value ? reader["Foot_Contacto"].ToString() : "",
                        Foot_UrlIconContacto = reader["Foot_UrlIconContacto"] != DBNull.Value ? reader["Foot_UrlIconContacto"].ToString() : "",
                        Foot_Ubicacion = reader["Foot_Ubicacion"] != DBNull.Value ? reader["Foot_Ubicacion"].ToString() : "",
                        Foot_UrlIconUbicacion = reader["Foot_UrlIconUbicacion"] != DBNull.Value ? reader["Foot_UrlIconUbicacion"].ToString() : "",
                        Foot_UrlLogoPrincipal = reader["Foot_UrlLogoPrincipal"] != DBNull.Value ? reader["Foot_UrlLogoPrincipal"].ToString() : "",
                        Foot_UrlLogoSecundario = reader["Foot_UrlLogoSecundario"] != DBNull.Value ? reader["Foot_UrlLogoSecundario"].ToString() : "",
                        Foot_Ayuda = reader["Foot_Ayuda"] != DBNull.Value ? reader["Foot_Ayuda"].ToString() : "",
                        Foot_Comunicate = reader["Foot_Comunicate"] != DBNull.Value ? reader["Foot_Comunicate"].ToString() : "",
                        Foot_UrlIconMensaje = reader["Foot_UrlIconMensaje"] != DBNull.Value ? reader["Foot_UrlIconMensaje"].ToString() : "",
                        Foot_UrlIconWhatssap = reader["Foot_UrlIconWhatssap"] != DBNull.Value ? reader["Foot_UrlIconWhatssap"].ToString() : ""

                    });
                }

                return Footers;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Footers", ex);
            }
        }

    }
}
