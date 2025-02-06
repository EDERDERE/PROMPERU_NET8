using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class BeneficioDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public BeneficioDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Beneficio y devuelve la fila creada
        public async Task<BeneficioBE> InsertarBeneficioAsync(BeneficioBE beneficio, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Beneficio_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
              
                comando.Parameters.AddWithValue("@Bene_Nombre", beneficio.Bene_Nombre);
                comando.Parameters.AddWithValue("@Bene_Descripcion", beneficio.Bene_Descripcion);
                comando.Parameters.AddWithValue("@Bene_Orden", beneficio.Bene_Orden);
                comando.Parameters.AddWithValue("@Bene_URLImagen", beneficio.Bene_URLImagen);
                comando.Parameters.AddWithValue("@Bene_URLIcon", beneficio.Bene_URLIcon);
                comando.Parameters.AddWithValue("@Bene_NombreBoton", beneficio.Bene_NombreBoton);
                comando.Parameters.AddWithValue("@Bene_URLImagenBanner", beneficio.Bene_URLImagenBanner);
                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Beneficio", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Beneficio", ex);
            }
        }

        //private async Task<BeneficioBE> ObtenerBeneficioPorIDAsync(int bene_ID)
        //{
        //    try
        //    {
        //        await using var conexion = await _conexionDB.ObtenerConexionAsync();
        //        await using var comando = new SqlCommand("USP_Beneficio_SEL", conexion)
        //        {
        //            CommandType = CommandType.StoredProcedure
        //        };

        //        comando.Parameters.AddWithValue("@Bene_ID", bene_ID);

        //        await conexion.OpenAsync();
        //        await using var reader = await comando.ExecuteReaderAsync();

        //        if (await reader.ReadAsync())
        //        {
        //            return new BeneficioBE
        //            {
        //                Bene_ID = Convert.ToInt32(reader["Bene_ID"]),
        //                Bene_Orden = Convert.ToInt32(reader["Bene_Orden"]),
        //                Bene_Nombre = reader["Bene_Nombre"].ToString(),
        //                Bene_Descripcion = reader["Bene_Descripcion"].ToString(),
        //                Bene_URLIcon = reader["Bene_URLIcon"].ToString(),
        //                Bene_URLImagen = reader["Bene_URLImagen"].ToString()
        //            };
        //        }

        //        return null;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error al obtener el Beneficio por ID", ex);
        //    }
        //}

        public async Task<int> EliminarBeneficioAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Beneficio_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Bene_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Beneficio", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Beneficio", ex);
            }
        }

        public async Task<int> ActualizarBeneficioAsync(BeneficioBE beneficio, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Beneficio_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Bene_ID", beneficio.Bene_ID);
                    comando.Parameters.AddWithValue("@Bene_Titulo", beneficio.Bene_Titulo);
                    comando.Parameters.AddWithValue("@Bene_Nombre", beneficio.Bene_Nombre);
                    comando.Parameters.AddWithValue("@Bene_Descripcion", beneficio.Bene_Descripcion);
                    comando.Parameters.AddWithValue("@Bene_Orden", beneficio.Bene_Orden);
                    comando.Parameters.AddWithValue("@Bene_URLImagen", beneficio.Bene_URLImagen);
                    comando.Parameters.AddWithValue("@Bene_URLIcon", beneficio.Bene_URLIcon);
                    comando.Parameters.AddWithValue("@Bene_NombreBoton", beneficio.Bene_NombreBoton);
                    comando.Parameters.AddWithValue("@Bene_URLImagenBanner", beneficio.Bene_URLImagenBanner);

                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Beneficio", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Beneficio", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarBeneficioAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Beneficio", ex);
            }
        }

        public async Task<List<BeneficioBE>> ListarBeneficiosAsync()
        {
            try
            {
                var Beneficios = new List<BeneficioBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Beneficio_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Beneficios.Add(new BeneficioBE
                    {
                        Bene_ID = reader["Bene_ID"] != DBNull.Value ? Convert.ToInt32(reader["Bene_ID"]) : 0,
                        Bene_Orden = reader["Bene_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Bene_Orden"]) : 0,
                        Bene_Titulo = reader["Bene_Titulo"] != DBNull.Value ? reader["Bene_Titulo"].ToString() : "",
                        Bene_Nombre = reader["Bene_Nombre"] != DBNull.Value ? reader["Bene_Nombre"].ToString() : "",
                        Bene_Descripcion = reader["Bene_Descripcion"] != DBNull.Value ? reader["Bene_Descripcion"].ToString() : "",
                        Bene_URLIcon = reader["Bene_URLIcon"] != DBNull.Value ? reader["Bene_URLIcon"].ToString() : "",
                        Bene_URLImagen = reader["Bene_URLImagen"] != DBNull.Value ? reader["Bene_URLImagen"].ToString() : "",
                        Bene_NombreBoton = reader["Bene_NombreBoton"] != DBNull.Value ? reader["Bene_NombreBoton"].ToString() : "",
                        Bene_URLImagenBanner = reader["Bene_URLImagenBanner"] != DBNull.Value ? reader["Bene_URLImagenBanner"].ToString() : "",

                    });
                }

                return Beneficios;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Beneficios", ex);
            }
        }

    }
}
