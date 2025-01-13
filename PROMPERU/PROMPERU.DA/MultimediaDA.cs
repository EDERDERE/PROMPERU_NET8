using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class MultimediaDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public MultimediaDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Multimedia y devuelve la fila creada
        public async Task<MultimediaBE> InsertarMultimediaAsync(MultimediaBE multimedia, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Multimedia_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Mult_URLImagen", multimedia.Mult_URLImagen);
                comando.Parameters.AddWithValue("@Mult_URLVideo", multimedia.Mult_URLVideo);
                comando.Parameters.AddWithValue("@Mult_URLIcon", multimedia.Mult_URLIcon);
                comando.Parameters.AddWithValue("@Mult_URLFile", multimedia.Mult_URLFile);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);

                await conexion.OpenAsync();
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Multimedia", ip, nuevoID);
                }

                return await ObtenerMultimediaPorIDAsync(nuevoID);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Multimedia", ex);
            }
        }

        private async Task<MultimediaBE> ObtenerMultimediaPorIDAsync(int nuevoID)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Multimedia_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Mult_ID", nuevoID);

                await conexion.OpenAsync();
                await using var reader = await comando.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new MultimediaBE
                    {
                        Mult_ID = Convert.ToInt32(reader["Mult_ID"]),
                        Mult_URLImagen = reader["Mult_URLImagen"].ToString(),
                        Mult_URLVideo = reader["Mult_URLVideo"].ToString(),
                        Mult_URLIcon = reader["Mult_URLIcon"].ToString(),
                        Mult_URLFile = reader["Mult_URLFile"].ToString()
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el Multimedia por ID", ex);
            }
        }

        public async Task<int> EliminarMultimediaAsync(int bannID, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await conexion.OpenAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Multimedia_DEL", conexion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Mult_ID", bannID);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "D", "Multimedia", ip, id);
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
                throw new Exception("Error al eliminar el Multimedia", ex);
            }
        }

        public async Task<int> ActualizarMultimediaAsync(MultimediaBE Multimedia, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await conexion.OpenAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Multimedia_UPD", conexion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Mult_ID", Multimedia.Mult_ID);
                    comando.Parameters.AddWithValue("@Mult_URLImagen", Multimedia.Mult_URLImagen);
                    comando.Parameters.AddWithValue("@Mult_URLVideo", Multimedia.Mult_URLVideo);
                    comando.Parameters.AddWithValue("@Mult_URLIcon", Multimedia.Mult_URLIcon);
                    comando.Parameters.AddWithValue("@Mult_URLFile", Multimedia.Mult_URLFile);

                    // Ejecución del comando
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Multimedia", ip, id);

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
                catch
                {
                    // En caso de excepción, deshacer la transacción
                    await transaccion.RollbackAsync();
                    throw;
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Multimedia", ex);
            }
        }

        public async Task<List<MultimediaBE>> ListarMultimediasAsync()
        {
            try
            {
                var Multimedias = new List<MultimediaBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Multimedia_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await conexion.OpenAsync();
                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Multimedias.Add(new MultimediaBE
                    {
                        Mult_ID = Convert.ToInt32(reader["Mult_ID"]),
                        Mult_URLImagen = reader["Mult_URLImagen"].ToString(),
                        Mult_URLVideo = reader["Mult_URLVideo"].ToString(),
                        Mult_URLIcon = reader["Mult_URLIcon"].ToString(),
                        Mult_URLFile = reader["Mult_URLFile"].ToString()
                    });
                }

                return Multimedias;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Multimedias", ex);
            }
        }

    }
}
