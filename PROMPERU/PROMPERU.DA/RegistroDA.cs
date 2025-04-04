using Microsoft.Data.SqlClient;
using Microsoft.Win32;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class RegistroDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public RegistroDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }


        // Inserta un nuevo Registro y devuelve la fila creada
        public async Task<int> InsertarRegistroAsync(RegistroBE registro)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_RepresentanteLegal_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Eval_Ruc", registro.Eval_Ruc);
                comando.Parameters.AddWithValue("@Regi_NombreApellido", registro.Regi_NombreApellido);
                comando.Parameters.AddWithValue("@Regi_TipoDocumento", registro.Regi_TipoDocumento);
                comando.Parameters.AddWithValue("@Regi_NumeroDocumento", registro.Regi_NumeroDocumento);
                comando.Parameters.AddWithValue("@Regi_NumeroPartida", registro.Regi_NumeroPartida);
                comando.Parameters.AddWithValue("@Regi_NumeroAsiento", registro.Regi_NumeroAsiento);
                comando.Parameters.AddWithValue("@Regi_Ciudad", registro.Regi_Ciudad);

                var outRegiID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outRegiID);

                await comando.ExecuteNonQueryAsync();

                int regiID = (int)outRegiID.Value;

                return regiID;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Registro", ex);
            }
        }

        public async Task<int> ActualizarRegistroAsync(RegistroBE registro)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_RepresentanteLegal_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Eval_Ruc", registro.Eval_Ruc);
                    comando.Parameters.AddWithValue("@Regi_NombreApellido", registro.Regi_NombreApellido);
                    comando.Parameters.AddWithValue("@Regi_TipoDocumento", registro.Regi_TipoDocumento);
                    comando.Parameters.AddWithValue("@Regi_NumeroDocumento", registro.Regi_NumeroDocumento);
                    comando.Parameters.AddWithValue("@Regi_NumeroPartida", registro.Regi_NumeroPartida);
                    comando.Parameters.AddWithValue("@Regi_NumeroAsiento", registro.Regi_NumeroAsiento);
                    comando.Parameters.AddWithValue("@Regi_Ciudad", registro.Regi_Ciudad);

                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await transaccion.CommitAsync();
                    }
                    else
                    {
                        await transaccion.RollbackAsync();
                    }

                    return filasAfectadas;
                }
                catch (Exception ex)
                {
                    await transaccion.RollbackAsync();
                    throw new Exception("Error en ActualizarRegistroAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el Registro", ex);
            }
        }


        public async Task<List<RegistroBE>> ListarRepresentanteLegalAsync( string ruc)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_RepresentanteLegal_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                var registros = new List<RegistroBE>();
                comando.Parameters.AddWithValue("@Eval_Ruc", ruc);

                await using var reader = await comando.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var registro = new RegistroBE
                    {
                        Eval_Ruc = reader.GetString(reader.GetOrdinal("Eval_Ruc")),
                        Regi_NombreApellido = reader.GetString(reader.GetOrdinal("Regi_NombreApellido")),
                        Regi_TipoDocumento = reader.GetString(reader.GetOrdinal("Regi_TipoDocumento")),
                        Regi_NumeroDocumento = reader.GetString(reader.GetOrdinal("Regi_NumeroDocumento")),
                        Regi_NumeroPartida = reader.GetString(reader.GetOrdinal("Regi_NumeroPartida")),
                        Regi_NumeroAsiento = reader.GetString(reader.GetOrdinal("Regi_NumeroAsiento")),
                        Regi_Ciudad = reader.GetString(reader.GetOrdinal("Regi_Ciudad"))
                    };

                    registros.Add(registro);
                }

                return registros;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Registros", ex);
            }
        }



    }
}
