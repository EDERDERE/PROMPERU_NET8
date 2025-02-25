using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class TestimonioDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public TestimonioDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Testimonio y devuelve la fila creada
        public async Task<TestimonioBE> InsertarTestimonioAsync(TestimonioBE testimonio, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Testimonio_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
          
                comando.Parameters.AddWithValue("@Test_Nombre", testimonio.Test_Nombre);
                comando.Parameters.AddWithValue("@Test_Descripcion", testimonio.Test_Descripcion);
                comando.Parameters.AddWithValue("@Test_UrlIcon", testimonio.Test_UrlIcon);
                comando.Parameters.AddWithValue("@Test_UrlImagen", testimonio.Test_UrlImagen);
                comando.Parameters.AddWithValue("@Test_NombreEmpresa", testimonio.Test_NombreEmpresa);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Testimonio", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Testimonio", ex);
            }
        }

       
        public async Task<int> EliminarTestimonioAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Testimonio_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Test_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Testimonio", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Testimonio", ex);
            }
        }

        public async Task<int> ActualizarTestimonioAsync(TestimonioBE Testimonio, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Testimonio_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Test_ID", Testimonio.Test_ID);
                    comando.Parameters.AddWithValue("@Test_Nombre", Testimonio.Test_Nombre);
                    comando.Parameters.AddWithValue("@Test_Descripcion", Testimonio.Test_Descripcion);
                    comando.Parameters.AddWithValue("@Test_UrlIcon", Testimonio.Test_UrlIcon);
                    comando.Parameters.AddWithValue("@Test_UrlImagen", Testimonio.Test_UrlImagen);
                    comando.Parameters.AddWithValue("@Test_NombreEmpresa", Testimonio.Test_NombreEmpresa);
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Testimonio", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Testimonio", ip, id, conexion, (SqlTransaction)transaccion);

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
                    // En Testimonio de excepción, deshacer la transacción
                    await transaccion.RollbackAsync();
                    throw new Exception("Error en ActualizarTestimonioAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Testimonio", ex);
            }
        }

        public async Task<List<TestimonioBE>> ListarTestimoniosAsync()
        {
            try
            {
                var testimonios = new List<TestimonioBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Testimonio_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    testimonios.Add(new TestimonioBE
                    {
                        Test_ID = reader["Test_ID"] != DBNull.Value ? Convert.ToInt32(reader["Test_ID"]) : 0,
                        Test_Nombre = reader["Test_Nombre"] != DBNull.Value ? reader["Test_Nombre"].ToString() : "",
                        Test_Descripcion = reader["Test_Descripcion"] != DBNull.Value ? reader["Test_Descripcion"].ToString() : "",
                        Test_UrlIcon = reader["Test_UrlIcon"] != DBNull.Value ? reader["Test_UrlIcon"].ToString() : "",
                        Test_UrlImagen = reader["Test_UrlImagen"] != DBNull.Value ? reader["Test_UrlImagen"].ToString() : "",
                        Test_NombreEmpresa = reader["Test_NombreEmpresa"] != DBNull.Value ? reader["Test_NombreEmpresa"].ToString() : "",
                        Regi_Nombre = reader["Regi_Nombre"] != DBNull.Value ? reader["Regi_Nombre"].ToString() : ""


                    });
                }

                return testimonios;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Testimonios", ex);
            }
        }

    }
}
