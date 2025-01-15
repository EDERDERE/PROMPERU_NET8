using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class InscripcionDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public InscripcionDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Inscripcion y devuelve la fila creada
        public async Task<InscripcionBE> InsertarInscripcionAsync(InscripcionBE inscripcion, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Inscripcion_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                             
                comando.Parameters.AddWithValue("@Insc_Titulo", inscripcion.Insc_Titulo);
                comando.Parameters.AddWithValue("@Insc_Contenido", inscripcion.Insc_Contenido);
                comando.Parameters.AddWithValue("@Insc_NombreBoton", inscripcion.Insc_NombreBoton);
                comando.Parameters.AddWithValue("@Insc_URLIconBoton", inscripcion.Insc_URLIconBoton);
                comando.Parameters.AddWithValue("@Insc_Paso", inscripcion.Insc_Paso);
                comando.Parameters.AddWithValue("@Insc_Orden", inscripcion.Insc_Orden);
                comando.Parameters.AddWithValue("@Insc_TituloPaso", inscripcion.Insc_TituloPaso);
                comando.Parameters.AddWithValue("@Insc_Descripcion", inscripcion.Insc_Descripcion);
                comando.Parameters.AddWithValue("@Insc_URLImagen", inscripcion.Insc_URLImagen);             

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Inscripcion", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Inscripcion", ex);
            }
        }

        private async Task<InscripcionBE> ObtenerInscripcionPorIDAsync(int insc_ID)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Inscripcion_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Insc_ID", insc_ID);

                await conexion.OpenAsync();
                await using var reader = await comando.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new InscripcionBE
                    {
                        Insc_ID = Convert.ToInt32(reader["Insc_ID"]),
                        Insc_Titulo = reader["Insc_Titulo"].ToString(),
                        Insc_Contenido = reader["Insc_Contenido"].ToString(),
                        Insc_NombreBoton = reader["Insc_NombreBoton"].ToString(),
                        Insc_URLIconBoton = reader["Insc_URLIconBoton"].ToString(),
                        Insc_Orden = Convert.ToInt32(reader["Insc_Orden"]),
                        Insc_Paso = Convert.ToInt32(reader["Insc_Paso"]),
                        Insc_TituloPaso = reader["Insc_TituloPaso"].ToString(),
                        Insc_Descripcion = reader["Insc_Descripcion"].ToString(),
                        Insc_URLImagen = reader["Insc_URLImagen"].ToString()
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el Inscripcion por ID", ex);
            }
        }

        public async Task<int> EliminarInscripcionAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Inscripcion_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Insc_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Inscripcion", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Inscripcion", ex);
            }
        }

        public async Task<int> ActualizarInscripcionAsync(InscripcionBE inscripcion, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Inscripcion_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Insc_ID", inscripcion.Insc_ID);
                    comando.Parameters.AddWithValue("@Insc_Titulo", inscripcion.Insc_Titulo);
                    comando.Parameters.AddWithValue("@Insc_Contenido", inscripcion.Insc_Contenido);
                    comando.Parameters.AddWithValue("@Insc_NombreBoton", inscripcion.Insc_NombreBoton);
                    comando.Parameters.AddWithValue("@Insc_URLIconBoton", inscripcion.Insc_URLIconBoton);
                    comando.Parameters.AddWithValue("@Insc_Paso", inscripcion.Insc_Paso);
                    comando.Parameters.AddWithValue("@Insc_Orden", inscripcion.Insc_Orden);
                    comando.Parameters.AddWithValue("@Insc_TituloPaso", inscripcion.Insc_TituloPaso);
                    comando.Parameters.AddWithValue("@Insc_Descripcion", inscripcion.Insc_Descripcion);
                    comando.Parameters.AddWithValue("@Insc_URLImagen", inscripcion.Insc_URLImagen);

                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Inscripcion", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Inscripcion", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarInscripcionAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Inscripcion", ex);
            }
        }

        public async Task<List<InscripcionBE>> ListarInscripcionsAsync()
        {
            try
            {
                var Inscripcions = new List<InscripcionBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Inscripcion_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Inscripcions.Add(new InscripcionBE
                    {
                        Insc_ID = reader["Insc_ID"] != DBNull.Value ? Convert.ToInt32(reader["Insc_ID"]) : 0,
                        Insc_Titulo = reader["Insc_Titulo"] != DBNull.Value ? reader["Insc_Titulo"].ToString() : "",
                        Insc_Contenido = reader["Insc_Contenido"] != DBNull.Value ? reader["Insc_Contenido"].ToString() : "",
                        Insc_NombreBoton = reader["Insc_NombreBoton"] != DBNull.Value ? reader["Insc_NombreBoton"].ToString() : "",
                        Insc_URLIconBoton = reader["Insc_URLIconBoton"] != DBNull.Value ? reader["Insc_URLIconBoton"].ToString() : "",
                        Insc_Orden = reader["Insc_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Insc_Orden"]) : 0,
                        Insc_Paso = reader["Insc_Paso"] != DBNull.Value ? Convert.ToInt32(reader["Insc_Paso"]) : 0,
                        Insc_TituloPaso = reader["Insc_TituloPaso"] != DBNull.Value ? reader["Insc_TituloPaso"].ToString() : "",
                        Insc_Descripcion = reader["Insc_Descripcion"] != DBNull.Value ? reader["Insc_Descripcion"].ToString() : "",
                        Insc_URLImagen = reader["Insc_URLImagen"] != DBNull.Value ? reader["Insc_URLImagen"].ToString() : ""

                    });
                }

                return Inscripcions;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Inscripcions", ex);
            }
        }

    }
}
