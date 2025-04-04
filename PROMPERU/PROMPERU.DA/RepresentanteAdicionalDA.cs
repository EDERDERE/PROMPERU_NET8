using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class RepresentanteAdicionalDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public RepresentanteAdicionalDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo RepresentanteAdicional y devuelve la fila creada
        public async Task<int> InsertarRepresentanteAdicionalAsync(RepresentanteAdicionalBE representante)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_RepresentanteAdicional_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Trep_ID", representante.Trep_ID);
                comando.Parameters.AddWithValue("@Radi_NombreCompleto", representante.Radi_NombreCompleto);
                comando.Parameters.AddWithValue("@Radi_CorreoElectronico", representante.Radi_CorreoElectronico);
                comando.Parameters.AddWithValue("@Radi_NumeroCelular", representante.Radi_NumeroCelular);

                var outRadiID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outRadiID);

                await comando.ExecuteNonQueryAsync();

                int radiID = (int)outRadiID.Value;

                return radiID;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el RepresentanteAdicional", ex);
            }
        }      

        public async Task<int> ActualizarRepresentanteAdicionalAsync(RepresentanteAdicionalBE representante)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_RepresentanteAdicional_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Radi_ID", representante.Radi_ID);
                    comando.Parameters.AddWithValue("@Trep_ID", representante.Trep_ID);
                    comando.Parameters.AddWithValue("@Radi_NombreCompleto", representante.Radi_NombreCompleto);
                    comando.Parameters.AddWithValue("@Radi_CorreoElectronico", representante.Radi_CorreoElectronico);
                    comando.Parameters.AddWithValue("@Radi_NumeroCelular", representante.Radi_NumeroCelular);


                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","RepresentanteAdicional", ip, id);
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
                    throw new Exception("Error en ActualizarRepresentanteAdicionalAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el RepresentanteAdicional", ex);
            }
        }

        public async Task<List<RepresentanteAdicionalBE>> ListarRepresentanteAdicionalsAsync()
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_RepresentanteAdicional_LST", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                var representantes = new List<RepresentanteAdicionalBE>();

                await using var reader = await comando.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var representante = new RepresentanteAdicionalBE
                    {
                        Radi_ID = reader.GetInt32(reader.GetOrdinal("Radi_ID")),
                        Trep_ID = reader.GetInt32(reader.GetOrdinal("Trep_ID")),
                        Radi_NombreCompleto = reader.GetString(reader.GetOrdinal("Radi_NombreCompleto")),
                        Radi_CorreoElectronico = reader.GetString(reader.GetOrdinal("Radi_CorreoElectronico")),
                        Radi_NumeroCelular = reader.GetString(reader.GetOrdinal("Radi_NumeroCelular"))
                    };

                    representantes.Add(representante);
                }

                return representantes;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Representantes Adicionales", ex);
            }
        }

    }
}
