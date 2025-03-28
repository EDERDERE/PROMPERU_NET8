using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;
using System.Data.Common;
using System.Transactions;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

        public async Task<int> ActualizarProgresoTestAsync(ProcesoTestBE test)
        {
        
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var transaccion = await conexion.BeginTransactionAsync(); // Inicia transacción


                // Configuración del comando SQL
                await using var comando = new SqlCommand("USP_Inscripcion_Evaluado_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Eval_RUC", test.Eval_RUC);
                    comando.Parameters.AddWithValue("@Insc_ID", test.Insc_ID);
                    comando.Parameters.AddWithValue("@Ieva_Estado", test.Ieva_Estado);


                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {               
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
                throw new Exception("Error en ActualizarTestAsync: La transacción fue revertida.", ex);
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
                        ID = reader["Ieva_ID"] != DBNull.Value ? Convert.ToInt32(reader["Ieva_ID"]) : 0,
                        Eval_ID = reader["Eval_ID"] != DBNull.Value ? Convert.ToInt32(reader["Eval_ID"]) : 0,
                        Eval_RUC = reader["Eval_RUC"] != DBNull.Value ? reader["Eval_RUC"].ToString() : "",
                        Insc_ID = reader["Insc_ID"] != DBNull.Value ? Convert.ToInt32(reader["Insc_ID"]) : 0,
                        Eval_Etapa = reader["Eval_Etapa"] != DBNull.Value ? reader["Eval_Etapa"].ToString() : "",
                        Ieva_Estado = reader["Ieva_Estado"] != DBNull.Value ? reader["Ieva_Estado"].ToString() : "",                     
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
        public async Task<int> InsertarDatosGeneralesTestAsync(DatosGeneralesBE datos)
        {
            await using var conexion = await _conexionDB.ObtenerConexionAsync();
            await using var transaction = await conexion.BeginTransactionAsync(); // Inicia transacción

            try
            {
                await using var comando = new SqlCommand("USP_DatosGenerales_INS", conexion, (SqlTransaction)transaction)
                {
                    CommandType = CommandType.StoredProcedure
                };
                               
                comando.Parameters.AddWithValue("@Dgen_RazonSocial", datos.RazonSocial);
                comando.Parameters.AddWithValue("@Dgen_NombresApellidos", datos.NombresApellidos);
                comando.Parameters.AddWithValue("@Dgen_NombreComercial", datos.NombreComercial);
                comando.Parameters.AddWithValue("@Dgen_Ruc", datos.Ruc);
                comando.Parameters.AddWithValue("@Dgen_Region", datos.Region);
                comando.Parameters.AddWithValue("@Dgen_Provincia", datos.Provincia);
                comando.Parameters.AddWithValue("@Dgen_Telefono", datos.Telefono);
                comando.Parameters.AddWithValue("@Dgen_CorreoElectronico", datos.CorreoElectronico);
                comando.Parameters.AddWithValue("@Dgen_FechaInicioActividades", (object)datos.FechaInicioActividades ?? DBNull.Value);
                comando.Parameters.AddWithValue("@Dgen_TipoPersoneria", datos.TipoPersoneria);
                comando.Parameters.AddWithValue("@Dgen_TipoEmpresa", datos.TipoEmpresa);
                comando.Parameters.AddWithValue("@Dgen_TipoPrestadorServiciosTuristicos", datos.TipoPrestadorServiciosTuristicos);
                comando.Parameters.AddWithValue("@Dgen_ActividadEconomica", datos.ActividadEconomica);
                comando.Parameters.AddWithValue("@Dgen_TelefonoFijo", datos.TelefonoFijo);
                comando.Parameters.AddWithValue("@Dgen_PaginaWeb", datos.PaginaWeb);
                comando.Parameters.AddWithValue("@Dgen_TipoEmpresaTuristica", datos.TipoEmpresaTuristica);
                comando.Parameters.AddWithValue("@Dgen_CategoriaHospedaje", datos.CategoriaHospedaje);

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

        public async Task<List<DatosGeneralesBE>> ListarDatosGeneralesTestsAsync(string ruc)
        {
            try
            {
                var Tests = new List<DatosGeneralesBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_DatosGenerales_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Dgen_Ruc", ruc);

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Tests.Add(new DatosGeneralesBE
                    {
                        ID = reader["Dgen_ID"] != DBNull.Value ? Convert.ToInt32(reader["Dgen_ID"]) : 0,
                        RazonSocial = reader["Dgen_RazonSocial"] != DBNull.Value ? reader["Dgen_RazonSocial"].ToString() : "",                     
                        NombresApellidos = reader["Dgen_NombresApellidos"] != DBNull.Value ? reader["Dgen_NombresApellidos"].ToString() : "",
                        NombreComercial = reader["Dgen_NombreComercial"] != DBNull.Value ? reader["Dgen_NombreComercial"].ToString() : "",
                        Ruc = reader["Dgen_Ruc"] != DBNull.Value ? reader["Dgen_Ruc"].ToString() : "",
                        Region = reader["Dgen_Region"] != DBNull.Value ? reader["Dgen_Region"].ToString() : "",
                        Provincia = reader["Dgen_Provincia"] != DBNull.Value ? reader["Dgen_Provincia"].ToString() : "",
                        Telefono = reader["Dgen_Telefono"] != DBNull.Value ? reader["Dgen_Telefono"].ToString() : "",
                        CorreoElectronico = reader["Dgen_CorreoElectronico"] != DBNull.Value ? reader["Dgen_CorreoElectronico"].ToString() : "",
                        FechaInicioActividades = reader["Dgen_FechaInicioActividades"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["Dgen_FechaInicioActividades"]),
                        TipoPersoneria = reader["Dgen_TipoPersoneria"] != DBNull.Value ? reader["Dgen_TipoPersoneria"].ToString() : "",
                        TipoEmpresa = reader["Dgen_TipoEmpresa"] != DBNull.Value ? reader["Dgen_TipoEmpresa"].ToString() : "",
                        TipoPrestadorServiciosTuristicos = reader["Dgen_TipoPrestadorServiciosTuristicos"] != DBNull.Value ? reader["Dgen_TipoPrestadorServiciosTuristicos"].ToString() : "",
                        ActividadEconomica = reader["Dgen_ActividadEconomica"] != DBNull.Value ? reader["Dgen_ActividadEconomica"].ToString() : "",
                        TelefonoFijo = reader["Dgen_TelefonoFijo"] != DBNull.Value ? reader["Dgen_TelefonoFijo"].ToString() : "",
                        PaginaWeb = reader["Dgen_PaginaWeb"] != DBNull.Value ? reader["Dgen_PaginaWeb"].ToString() : "",
                        TipoEmpresaTuristica = reader["Dgen_TipoEmpresaTuristica"] != DBNull.Value ? reader["Dgen_TipoEmpresaTuristica"].ToString() : "",
                        CategoriaHospedaje = reader["Dgen_CategoriaHospedaje"] != DBNull.Value ? reader["Dgen_CategoriaHospedaje"].ToString() : "",
                        
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
