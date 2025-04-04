using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class TitularRepresentanteDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public TitularRepresentanteDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo TitularRepresentante y devuelve la fila creada
        public async Task<int> InsertarTitularRepresentanteAsync(TitularRepresentanteBE titular)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_TitularRepresentante_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Eval_ID", titular.Eval_ID);
                comando.Parameters.AddWithValue("@Trep_NombreCompleto", titular.Trep_NombreCompleto);
                comando.Parameters.AddWithValue("@Trep_Sexo", titular.Trep_Sexo);
                comando.Parameters.AddWithValue("@Trep_Edad", titular.Trep_Edad);
                comando.Parameters.AddWithValue("@Trep_GradoInstruccion", titular.Trep_GradoInstruccion);
                comando.Parameters.AddWithValue("@Trep_CargoRepresentante", titular.Trep_CargoRepresentante);
                comando.Parameters.AddWithValue("@Trep_CelularRepresentante", titular.Trep_CelularRepresentante);

                var outTrepID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outTrepID);

                await comando.ExecuteNonQueryAsync();

                int trepID = (int)outTrepID.Value;
             

                return trepID;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el TitularRepresentante", ex);
            }
        }                 

        public async Task<int> ActualizarTitularRepresentanteAsync(TitularRepresentanteBE titular)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_TitularRepresentante_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Trep_ID", titular.Trep_ID);
                    comando.Parameters.AddWithValue("@Eval_ID", titular.Eval_ID);
                    comando.Parameters.AddWithValue("@Trep_NombreCompleto", titular.Trep_NombreCompleto);
                    comando.Parameters.AddWithValue("@Trep_Sexo", titular.Trep_Sexo);
                    comando.Parameters.AddWithValue("@Trep_Edad", titular.Trep_Edad);
                    comando.Parameters.AddWithValue("@Trep_GradoInstruccion", titular.Trep_GradoInstruccion);
                    comando.Parameters.AddWithValue("@Trep_CargoRepresentante", titular.Trep_CargoRepresentante);
                    comando.Parameters.AddWithValue("@Trep_CelularRepresentante", titular.Trep_CelularRepresentante);

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
                    throw new Exception("Error en ActualizarTitularRepresentanteAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el TitularRepresentante", ex);
            }
        }

        public async Task<List<TitularRepresentanteBE>> ListarTitularRepresentantesAsync(string ruc)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_TitularRepresentante_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                var titulares = new List<TitularRepresentanteBE>();

                comando.Parameters.AddWithValue("@Eval_ID", ruc);

                await using var reader = await comando.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var titular = new TitularRepresentanteBE
                    {
                        Trep_ID = reader.GetInt32(reader.GetOrdinal("Trep_ID")),
                        Eval_ID = reader.GetInt32(reader.GetOrdinal("Eval_ID")),
                        Trep_NombreCompleto = reader.GetString(reader.GetOrdinal("Trep_NombreCompleto")),
                        Trep_Sexo = reader.GetString(reader.GetOrdinal("Trep_Sexo")),
                        Trep_Edad = reader.GetInt32(reader.GetOrdinal("Trep_Edad")),
                        Trep_GradoInstruccion = reader.GetString(reader.GetOrdinal("Trep_GradoInstruccion")),
                        Trep_CargoRepresentante = reader.GetString(reader.GetOrdinal("Trep_CargoRepresentante")),
                        Trep_CelularRepresentante = reader.GetString(reader.GetOrdinal("Trep_CelularRepresentante"))
                    };

                    titulares.Add(titular);
                }

                return titulares;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Titulares Representantes", ex);
            }
        }

    }
}
