using Microsoft.Data.SqlClient;
using Microsoft.Win32;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class EvaluadoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public EvaluadoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
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
                comando.Parameters.AddWithValue("@Eval_CategoriaHospedaje", datos.CategoriaHospedaje);
                comando.Parameters.AddWithValue("@Eval_NumeroPartida", datos.NumeroPartida);
                comando.Parameters.AddWithValue("@Eval_NumeroAsiento", datos.NumeroAsiento);
                comando.Parameters.AddWithValue("@Eval_Ciudad", datos.Ciudad);
                comando.Parameters.AddWithValue("@Eval_Distrito", datos.Direccion);
                comando.Parameters.AddWithValue("@Eval_Distrito", datos.Distrito);
                comando.Parameters.AddWithValue("@Eval_Urbanizacion", datos.Urbanizacion);
                comando.Parameters.AddWithValue("@Eval_CodigoPostal", datos.CodigoPostal);


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
                        NumeroPartida = !reader.IsDBNull(reader.GetOrdinal("Eval_NumeroPartida"))
                        ? reader.GetString(reader.GetOrdinal("Eval_NumeroPartida"))    : "",
                        CategoriaHospedaje = !reader.IsDBNull(reader.GetOrdinal("Eval_CategoriaHospedaje"))
                        ? reader.GetString(reader.GetOrdinal("Eval_CategoriaHospedaje"))  : "",
                        Direccion = !reader.IsDBNull(reader.GetOrdinal("Eval_Direccion"))
                        ?  reader.GetString(reader.GetOrdinal("Eval_Direccion")) : "",
                        Distrito = !reader.IsDBNull(reader.GetOrdinal("Eval_Distrito"))
                        ?  reader.GetString(reader.GetOrdinal("Eval_Distrito")): "",
                        Urbanizacion = !reader.IsDBNull(reader.GetOrdinal("Eval_Urbanizacion"))
                        ?  reader.GetString(reader.GetOrdinal("Eval_Urbanizacion")): "",
                        CodigoPostal = !reader.IsDBNull(reader.GetOrdinal("Eval_CodigoPostal"))
                        ?  reader.GetString(reader.GetOrdinal("Eval_CodigoPostal")): ""


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
                comando.Parameters.AddWithValue("@Eval_NumeroPartida", datos.NumeroPartida);
                comando.Parameters.AddWithValue("@Eval_NumeroAsiento", datos.NumeroAsiento);
                comando.Parameters.AddWithValue("@Eval_Ciudad", datos.Ciudad);
                comando.Parameters.AddWithValue("@Eval_Direccion", datos.Direccion);
                comando.Parameters.AddWithValue("@Eval_Distrito", datos.Distrito);
                comando.Parameters.AddWithValue("@Eval_Urbanizacion", datos.Urbanizacion);
                comando.Parameters.AddWithValue("@Eval_CodigoPostal", datos.CodigoPostal);


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



    }
}
