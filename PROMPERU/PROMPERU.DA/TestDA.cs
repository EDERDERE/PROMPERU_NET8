using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;
using System.Data.Common;
using System.Transactions;
using static System.Net.Mime.MediaTypeNames;

namespace PROMPERU.DA
{
    public class TestDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public TestDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Test 
        public async Task<int> InsertarProgresoTestAsync(ProcesoTestBE test)
        {
            await using var conexion = await _conexionDB.ObtenerConexionAsync();
            await using var transaction = await conexion.BeginTransactionAsync(); // Inicia transacción

            try
            {
                await using var comando = new SqlCommand("USP_Inscripcion_Evaluado_INS", conexion, (SqlTransaction)transaction)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Eval_RUC", test.Eval_RUC);
                comando.Parameters.AddWithValue("@Insc_ID", test.Insc_ID);
                comando.Parameters.AddWithValue("@Ieva_Estado", test.Ieva_Estado);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);

                await comando.ExecuteNonQueryAsync();

                await transaction.CommitAsync(); // Confirma la transacción

                return (int)outNuevoID.Value;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); // Revierte la transacción en caso de error
                throw new Exception("Error al insertar el Test", ex);
            }
        }


        public async Task<int> InsertarRespuestaSelectTestAsync(RespuestaSeleccionadaBE rSel)
        {
            await using var conexion = await _conexionDB.ObtenerConexionAsync();
            await using var transaction = await conexion.BeginTransactionAsync(); // Inicia transacción
            
            try
            {             
                await using var comando = new SqlCommand("USP_RespuestaSeleccionada_INS", conexion, (SqlTransaction)transaction)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Insc_ID", rSel.Preg_ID);
                comando.Parameters.AddWithValue("@Preg_NumeroTest", rSel.Eval_RUC);
                comando.Parameters.AddWithValue("@Preg_TextoTest", rSel.Rsel_TextoRespuesta);
                comando.Parameters.AddWithValue("@Preg_EsComputable", rSel.Resp_ID);           

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);

                await comando.ExecuteNonQueryAsync();               

                await transaction.CommitAsync(); // Confirma la transacción

                return (int)outNuevoID.Value;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); // Revierte la transacción en caso de error
                throw new Exception("Error al insertar el Test", ex);
            }
        }
        public async Task<int> EliminarTestAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Test_DEL", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Insc_ID", id);
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Test", ip, id, conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Test", ex);
            }
        }

        //public async Task<int> ActualizarTestAsync(TestBE Test, string usuario, string ip, int id)
        //{
        //    try
        //    {
        //        await using var conexion = await _conexionDB.ObtenerConexionAsync();                

        //        await using var transaccion = await conexion.BeginTransactionAsync();
        //        try
        //        {
        //            // Configuración del comando SQL
        //            await using var comando = new SqlCommand("USP_Test_UPD", conexion, (SqlTransaction)transaccion)
        //            {
        //                CommandType = CommandType.StoredProcedure
        //            };

        //            // Parámetros del procedimiento almacenado
        //            comando.Parameters.AddWithValue("@Preg_ID", Test.ID);
        //            comando.Parameters.AddWithValue("@Insc_ID", Test.Insc_ID);
        //            comando.Parameters.AddWithValue("@Preg_NumeroTest", Test.Preg_NumeroTest);
        //            comando.Parameters.AddWithValue("@Preg_TextoTest", Test.Preg_TextoTest);
        //            comando.Parameters.AddWithValue("@Preg_EsComputable", Test.Preg_EsComputable);
        //            comando.Parameters.AddWithValue("@Preg_TipoRespuesta", Test.Preg_TipoRespuesta);
        //            comando.Parameters.AddWithValue("@Preg_Categoria", Test.Preg_Categoria);                   


        //            // Ejecución del comando
        //            var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

        //            if (filasAfectadas > 0)
        //            {
        //                // Registrar la auditoría
        //                //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Test", ip, id);
        //                await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Test", ip, id, conexion, (SqlTransaction)transaccion);

        //                // Confirmar la transacción
        //                await transaccion.CommitAsync();
        //            }
        //            else
        //            {
        //                // Si no se afecta ninguna fila, deshacer la transacción
        //                await transaccion.RollbackAsync();
        //            }

        //            return filasAfectadas;
        //        }
        //        catch (Exception ex)
        //        {
        //            // En caso de excepción, deshacer la transacción
        //            await transaccion.RollbackAsync();
        //            throw new Exception("Error en ActualizarTestAsync: La transacción fue revertida.", ex);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Manejo de excepciones
        //        throw new Exception("Error al actualizar el Test", ex);
        //    }
        //}

        public async Task<List<EtapaBE>> ListarTestsAsync()
        {
            try
            {
                var Tests = new List<EtapaBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Test_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Tests.Add(new EtapaBE
                    {
                        ID = Convert.ToInt32(reader["Insc_ID"]),                
                        Titulo = reader["Insc_TituloPaso"].ToString()                                    
                    });
                }

                return Tests;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Tests", ex);
            }
        }
        public async Task<List<ProcesoTestBE>> ListarProcesoTestsAsync(string ruc)
        {
            try
            {
                var Tests = new List<ProcesoTestBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_ProcesoTest_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Eval_RUC", ruc);

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Tests.Add(new ProcesoTestBE
                    {
                        Eval_ID = Convert.ToInt32(reader["Eval_ID"]),
                        Eval_RUC = reader["Eval_RUC"].ToString(),
                        Insc_ID = Convert.ToInt32(reader["Insc_ID"]),
                        Eval_Etapa = reader["Eval_Etapa"].ToString(),
                        Ieva_Estado = reader["Ieva_Estado"].ToString()
                    });
                }

                return Tests;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Tests", ex);
            }
        }
        public async Task<List<RespuestaSeleccionadaBE>> ListarRespuestaSelectTestsAsync(string ruc)
        {
            try
            {
                var Tests = new List<RespuestaSeleccionadaBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_RespuestaSeleccionada_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Eval_RUC", ruc);

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Tests.Add(new RespuestaSeleccionadaBE
                    {
                        Preg_ID = reader["Preg_ID"] != DBNull.Value ? Convert.ToInt32(reader["Preg_ID"]) : 0,
                        Eval_RUC = reader["Eval_RUC"] != DBNull.Value ? reader["Eval_RUC"].ToString() : "",
                        Rsel_TextoRespuesta = reader["Rsel_TextoRespuesta"] != DBNull.Value ? reader["Rsel_TextoRespuesta"].ToString() : "",
                        Resp_ID = reader["Preg_ID"] != DBNull.Value ? Convert.ToInt32(reader["Resp_ID"]) : 0
                    });
                }

                return Tests;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Tests", ex);
            }
        }
    }
}
