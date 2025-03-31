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
                    comando.Parameters.AddWithValue("@Ieva_ID", test.ID);
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

                comando.Parameters.AddWithValue("@Preg_ID", rSel.Preg_ID);
                comando.Parameters.AddWithValue("@Eval_RUC", rSel.Eval_RUC);
                comando.Parameters.AddWithValue("@Rsel_TextoRespuesta", rSel.Rsel_TextoRespuesta);
                comando.Parameters.AddWithValue("@Resp_ID", rSel.Resp_ID);           

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
        public async Task<int> ActualizarRespuestaSelectTestAsync(RespuestaSeleccionadaBE rSel)
        {
            await using var conexion = await _conexionDB.ObtenerConexionAsync();
            await using var transaction = await conexion.BeginTransactionAsync(); // Inicia transacción

            try
            {
                await using var comando = new SqlCommand("USP_RespuestaSeleccionada_UPD", conexion, (SqlTransaction)transaction)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Preg_ID", rSel.Preg_ID);
                comando.Parameters.AddWithValue("@Eval_RUC", rSel.Eval_RUC);
                comando.Parameters.AddWithValue("@Rsel_TextoRespuesta", rSel.Rsel_TextoRespuesta);
                comando.Parameters.AddWithValue("@Resp_ID", rSel.Resp_ID);

               
                var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                if (filasAfectadas > 0)
                {
                   // Confirmar la transacción
                    await transaction.CommitAsync();
                }
                else
                {
                    // Si no se afecta ninguna fila, deshacer la transacción
                    await transaction.RollbackAsync();
                }

                return filasAfectadas;
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
        public async Task<int> EliminarProgresoTestAsync(int Insc_ID, string ruc)
            {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_ProgresoTest_DEL", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Insc_ID", Insc_ID);
                    comando.Parameters.AddWithValue("@Eval_RUC", ruc);
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
                        ID = reader["Rsel_ID"] != DBNull.Value ? Convert.ToInt32(reader["Rsel_ID"]) : 0,
                        Preg_ID = reader["Preg_ID"] != DBNull.Value ? Convert.ToInt32(reader["Preg_ID"]) : 0,
                        Eval_RUC = reader["Eval_RUC"] != DBNull.Value ? reader["Eval_RUC"].ToString() : "",
                        Rsel_TextoRespuesta = reader["Rsel_TextoRespuesta"] != DBNull.Value ? reader["Rsel_TextoRespuesta"].ToString() : "",
                        Resp_ID = reader["Resp_ID"] != DBNull.Value ? Convert.ToInt32(reader["Resp_ID"]) : 0
                    });
                }

                return Tests;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Tests", ex);
            }
        }
        public async Task<int> InsertarDatosGeneralesTestAsync(EvaluadoBE datos)
        {
            await using var conexion = await _conexionDB.ObtenerConexionAsync();
            await using var transaction = await conexion.BeginTransactionAsync(); // Inicia transacción

            try
            {
                await using var comando = new SqlCommand("USP_DatosGenerales_INS", conexion, (SqlTransaction)transaction)
                {
                    CommandType = CommandType.StoredProcedure
                };
                               
                comando.Parameters.AddWithValue("@Eval_RazonSocial", datos.RazonSocial);
                comando.Parameters.AddWithValue("@Eval_NombresApellidos", datos.NombresApellidos);
                comando.Parameters.AddWithValue("@Eval_NombreComercial", datos.NombreComercial);
                comando.Parameters.AddWithValue("@Eval_Ruc", datos.Ruc);
                comando.Parameters.AddWithValue("@Eval_Region", datos.Region);
                comando.Parameters.AddWithValue("@Eval_Provincia", datos.Provincia);
                comando.Parameters.AddWithValue("@Eval_Telefono", datos.Telefono);
                comando.Parameters.AddWithValue("@Eval_CorreoElectronico", datos.CorreoElectronico);
                comando.Parameters.AddWithValue("@Eval_FechaInicioActividades", (object)datos.FechaInicioActividades ?? DBNull.Value);
                comando.Parameters.AddWithValue("@Eval_TipoPersoneria", datos.TipoPersoneria);
                comando.Parameters.AddWithValue("@Eval_TipoEmpresa", datos.TipoEmpresa);
                comando.Parameters.AddWithValue("@Eval_TipoPrestadorServiciosTuristicos", datos.TipoPrestadorServiciosTuristicos);
                comando.Parameters.AddWithValue("@Eval_ActividadEconomica", datos.ActividadEconomica);
                comando.Parameters.AddWithValue("@Eval_TelefonoFijo", datos.TelefonoFijo);
                comando.Parameters.AddWithValue("@Eval_PaginaWeb", datos.PaginaWeb);
                comando.Parameters.AddWithValue("@Eval_TipoEmpresaTuristica", datos.TipoEmpresaTuristica);
                comando.Parameters.AddWithValue("@Eval_CategoriaHospedaje", datos.CategoriaHospedaje);

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

        public async Task<List<EvaluadoBE>> ListarDatosGeneralesTestsAsync(string ruc)
        {
            try
            {
                var Tests = new List<EvaluadoBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_DatosGenerales_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Eval_Ruc", ruc);

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Tests.Add(new EvaluadoBE
                    {
                        ID = reader["Eval_ID"] != DBNull.Value ? Convert.ToInt32(reader["Eval_ID"]) : 0,
                        RazonSocial = reader["Eval_RazonSocial"] != DBNull.Value ? reader["Eval_RazonSocial"].ToString() : "",                     
                        NombresApellidos = reader["Eval_NombresApellidos"] != DBNull.Value ? reader["Eval_NombresApellidos"].ToString() : "",
                        NombreComercial = reader["Eval_NombreComercial"] != DBNull.Value ? reader["Eval_NombreComercial"].ToString() : "",
                        Ruc = reader["Eval_Ruc"] != DBNull.Value ? reader["Eval_Ruc"].ToString() : "",
                        Region = reader["Eval_Region"] != DBNull.Value ? reader["Eval_Region"].ToString() : "",
                        Provincia = reader["Eval_Provincia"] != DBNull.Value ? reader["Eval_Provincia"].ToString() : "",
                        Telefono = reader["Eval_Telefono"] != DBNull.Value ? reader["Eval_Telefono"].ToString() : "",
                        CorreoElectronico = reader["Eval_CorreoElectronico"] != DBNull.Value ? reader["Eval_CorreoElectronico"].ToString() : "",
                        FechaInicioActividades = reader["Eval_FechaInicioActividades"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["Eval_FechaInicioActividades"]),
                        TipoPersoneria = reader["Eval_TipoPersoneria"] != DBNull.Value ? reader["Eval_TipoPersoneria"].ToString() : "",
                        TipoEmpresa = reader["Eval_TipoEmpresa"] != DBNull.Value ? reader["Eval_TipoEmpresa"].ToString() : "",
                        TipoPrestadorServiciosTuristicos = reader["Eval_TipoPrestadorServiciosTuristicos"] != DBNull.Value ? reader["Eval_TipoPrestadorServiciosTuristicos"].ToString() : "",
                        ActividadEconomica = reader["Eval_ActividadEconomica"] != DBNull.Value ? reader["Eval_ActividadEconomica"].ToString() : "",
                        TelefonoFijo = reader["Eval_TelefonoFijo"] != DBNull.Value ? reader["Eval_TelefonoFijo"].ToString() : "",
                        PaginaWeb = reader["Eval_PaginaWeb"] != DBNull.Value ? reader["Eval_PaginaWeb"].ToString() : "",
                        TipoEmpresaTuristica = reader["Eval_TipoEmpresaTuristica"] != DBNull.Value ? reader["Eval_TipoEmpresaTuristica"].ToString() : "",
                        CategoriaHospedaje = reader["Eval_CategoriaHospedaje"] != DBNull.Value ? reader["Eval_CategoriaHospedaje"].ToString() : "",
                        
                    });
                }

                return Tests;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Tests", ex);
            }
        }

        public async Task<int> ActualizarDatosGeneralesTestAsync(EvaluadoBE datos)
        {
            await using var conexion = await _conexionDB.ObtenerConexionAsync();
            await using var transaction = await conexion.BeginTransactionAsync(); // Inicia transacción

            try
            {              
                await using var comando = new SqlCommand("USP_DatosGenerales_UPD", conexion, (SqlTransaction)transaction)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Eval_ID", datos.ID);
                comando.Parameters.AddWithValue("@Eval_RazonSocial", datos.RazonSocial);
                comando.Parameters.AddWithValue("@Eval_NombresApellidos", datos.NombresApellidos);
                comando.Parameters.AddWithValue("@Eval_NombreComercial", datos.NombreComercial);
                comando.Parameters.AddWithValue("@Eval_Ruc", datos.Ruc);
                comando.Parameters.AddWithValue("@Eval_Region", datos.Region);
                comando.Parameters.AddWithValue("@Eval_Provincia", datos.Provincia);
                comando.Parameters.AddWithValue("@Eval_Telefono", datos.Telefono);
                comando.Parameters.AddWithValue("@Eval_CorreoElectronico", datos.CorreoElectronico);
                comando.Parameters.AddWithValue("@Eval_FechaInicioActividades", (object)datos.FechaInicioActividades ?? DBNull.Value);
                comando.Parameters.AddWithValue("@Eval_TipoPersoneria", datos.TipoPersoneria);
                comando.Parameters.AddWithValue("@Eval_TipoEmpresa", datos.TipoEmpresa);
                comando.Parameters.AddWithValue("@Eval_TipoPrestadorServiciosTuristicos", datos.TipoPrestadorServiciosTuristicos);
                comando.Parameters.AddWithValue("@Eval_ActividadEconomica", datos.ActividadEconomica);
                comando.Parameters.AddWithValue("@Eval_TelefonoFijo", datos.TelefonoFijo);
                comando.Parameters.AddWithValue("@Eval_PaginaWeb", datos.PaginaWeb);
                comando.Parameters.AddWithValue("@Eval_TipoEmpresaTuristica", datos.TipoEmpresaTuristica);
                comando.Parameters.AddWithValue("@Eval_CategoriaHospedaje", datos.CategoriaHospedaje);


                var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                if (filasAfectadas > 0)
                {           
                    // Confirmar la transacción
                    await transaction.CommitAsync();
                }
                else
                {
                    // Si no se afecta ninguna fila, deshacer la transacción
                    await transaction.RollbackAsync();
                }

                return filasAfectadas;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); // Revierte la transacción en caso de error
                throw new Exception("Error al insertar el Test", ex);
            }
        }

        public async Task<List<ProcesoCursoBE>> ObtenerProgresoCursoTestAsync(string ruc , int id)
        {
            try
            {
                var test = new List<ProcesoCursoBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_ProcesoCurso_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    test.Add(new ProcesoCursoBE
                    {
                        ID = Convert.ToInt32(reader["Preg_ID"]),
                        Insc_ID = Convert.ToInt32(reader["Insc_ID"]),
                        Curs_ID = reader["Curs_ID"] != DBNull.Value ? Convert.ToInt32(reader["Curs_ID"]) : 0,
                        Curs_CodigoCurso = reader["Curs_CodigoCurso"] != DBNull.Value ? reader["Curs_CodigoCurso"].ToString() : "",
                        //Preg_NumeroPregunta = Convert.ToInt32(reader["Preg_NumeroPregunta"]),
                        //Preg_TextoPregunta = reader["Preg_TextoPregunta"].ToString(),
                        //Preg_EsComputable = Convert.ToBoolean(reader["Preg_EsComputable"]),
                        //Preg_Etiqueta = reader["Preg_Etiqueta"] != DBNull.Value ? reader["Preg_Etiqueta"].ToString() : "",
                        //Preg_TipoRespuesta = reader["Preg_TipoRespuesta"].ToString(),
                        //Preg_Categoria = reader["Preg_Categoria"].ToString()
                    });
                }

                return test;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los progreso curso", ex);
            }
        }

    }
}
