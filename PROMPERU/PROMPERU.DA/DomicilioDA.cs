using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class DomicilioDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public DomicilioDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Domicilio y devuelve la fila creada
        public async Task<int> InsertarDomicilioAsync(DomicilioBE domicilio)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Domicilio_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Domi_Distrito", domicilio.Domi_Direccion);
                comando.Parameters.AddWithValue("@Domi_Distrito", domicilio.Domi_Distrito);
                comando.Parameters.AddWithValue("@Domi_Urbanizacion", domicilio.Domi_Urbanizacion);
                comando.Parameters.AddWithValue("@Domi_CodigoPostal", domicilio.Domi_CodigoPostal);

                var outDomiID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outDomiID);
                
                await comando.ExecuteNonQueryAsync();

                int domiID = (int)outDomiID.Value;
              

                return domiID;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Domicilio", ex);
            }
        }      



        public async Task<int> ActualizarDomicilioAsync(DomicilioBE domicilio)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Domicilio_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Domi_ID", domicilio.Domi_ID);
                    comando.Parameters.AddWithValue("@Domi_Distrito", domicilio.Domi_Direccion);
                    comando.Parameters.AddWithValue("@Domi_Distrito", domicilio.Domi_Distrito);
                    comando.Parameters.AddWithValue("@Domi_Urbanizacion", domicilio.Domi_Urbanizacion);
                    comando.Parameters.AddWithValue("@Domi_CodigoPostal", domicilio.Domi_CodigoPostal);                


                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Domicilio", ip, id);

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
                    throw new Exception("Error en ActualizarDomicilioAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Domicilio", ex);
            }
        }

        public async Task<List<DomicilioBE>> ListarDomiciliosAsync()
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Domicilio_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                var domicilios = new List<DomicilioBE>();

                await using var reader = await comando.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var domicilio = new DomicilioBE
                    {
                        Domi_ID = reader.GetInt32(reader.GetOrdinal("Domi_ID")),
                        Domi_Direccion = reader.GetString(reader.GetOrdinal("Domi_Direccion")),
                        Domi_Distrito = reader.GetString(reader.GetOrdinal("Domi_Distrito")),
                        Domi_Urbanizacion = reader.GetString(reader.GetOrdinal("Domi_Urbanizacion")),
                        Domi_CodigoPostal = reader.GetString(reader.GetOrdinal("Domi_CodigoPostal"))
                    };

                    domicilios.Add(domicilio);
                }

                return domicilios;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Domicilios", ex);
            }
        }

    }
}
