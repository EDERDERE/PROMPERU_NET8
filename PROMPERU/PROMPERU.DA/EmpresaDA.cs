using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class EmpresaDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public EmpresaDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Empresa y devuelve la fila creada
        public async Task<EmpresaBE> InsertarEmpresaAsync(EmpresaBE empresa, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_EmpresaGraduada_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Egra_NombreEmpresa", empresa.Egra_NombreEmpresa);
                comando.Parameters.AddWithValue("@Egra_Imagen", empresa.Egra_Imagen);
                comando.Parameters.AddWithValue("@Egra_Orden", empresa.Egra_Orden);
                comando.Parameters.AddWithValue("@Egra_Descripcion", empresa.Egra_Descripcion);
                comando.Parameters.AddWithValue("@Egra_Titulo", empresa.Egra_Titulo);
                comando.Parameters.AddWithValue("@Egra_NombreBoton", empresa.Egra_NombreBoton);
                comando.Parameters.AddWithValue("@Egra_UrlBoton", empresa.Egra_UrlBoton);
                comando.Parameters.AddWithValue("@Egra_Region", empresa.Egra_Region);
                comando.Parameters.AddWithValue("@Egra_Correo", empresa.Egra_Correo);
                comando.Parameters.AddWithValue("@Egra_PaginaWeb", empresa.Egra_PaginaWeb);          
                comando.Parameters.AddWithValue("@Egra_RUC", empresa.Egra_RUC);
                comando.Parameters.AddWithValue("@Egra_RedesSociales", empresa.Egra_RedesSociales);
                comando.Parameters.AddWithValue("@Egra_RedesSocialesDos", empresa.Egra_RedesSocialesDos);
                comando.Parameters.AddWithValue("@Egra_RedesSocialesTres", empresa.Egra_RedesSocialesTres);
                comando.Parameters.AddWithValue("@Egra_RedesSocialesCuatro", empresa.Egra_RedesSocialesCuatro);
                comando.Parameters.AddWithValue("@Egra_TipoEmpresa", empresa.Egra_TipoEmpresa);
                comando.Parameters.AddWithValue("@Egra_Certificaciones", empresa.Egra_Certificaciones);
                comando.Parameters.AddWithValue("@Egra_UrlLogo", empresa.Egra_UrlLogo);
                comando.Parameters.AddWithValue("@Egra_Mercados", empresa.Egra_MercadosSegmentosAtendidos);
                comando.Parameters.AddWithValue("@Egra_RazonSocial", empresa.Egra_RazonSocial);               
                comando.Parameters.AddWithValue("@Egra_Direccion", empresa.Egra_Direccion);
                comando.Parameters.AddWithValue("@Egra_Direccion", empresa.Egra_Celular);
                comando.Parameters.AddWithValue("@Egra_Direccion", empresa.Egra_CelularDos);
                comando.Parameters.AddWithValue("@Temp_ID", empresa.ID_TipoEmpresa);
                comando.Parameters.AddWithValue("@Regi_ID", empresa.ID_Region);
                comando.Parameters.AddWithValue("@Prov_ID", empresa.ID_Provincia);
                comando.Parameters.AddWithValue("@Dist_ID", empresa.ID_Distrito);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I", "EmpresaGraduada", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el EmpresaGraduada", ex);
            }
        }

        private async Task<EmpresaBE> ObtenerEmpresaPorIDAsync(int egra_ID)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_EmpresaGraduada_SEL", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Egra_ID", egra_ID);

                await conexion.OpenAsync();
                await using var reader = await comando.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new EmpresaBE
                    {
                        Egra_ID = reader["Egra_ID"] != DBNull.Value ? Convert.ToInt32(reader["Egra_ID"]) : 0,
                        Egra_NombreEmpresa = reader["Egra_NombreEmpresa"] != DBNull.Value ? reader["Egra_NombreEmpresa"].ToString() : "",
                        Egra_Imagen = reader["Egra_Imagen"] != DBNull.Value ? reader["Egra_Imagen"].ToString() : "",
                        Egra_Orden = reader["Egra_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Egra_Orden"]) : 0,
                        Egra_Descripcion = reader["Egra_Descripcion"] != DBNull.Value ? reader["Egra_Descripcion"].ToString() : "",
                        Egra_Titulo = reader["Egra_Titulo"] != DBNull.Value ? reader["Egra_Titulo"].ToString() : "",
                        Egra_NombreBoton = reader["Egra_NombreBoton"] != DBNull.Value ? reader["Egra_NombreBoton"].ToString() : "",
                        Egra_UrlBoton = reader["Egra_UrlBoton"] != DBNull.Value ? reader["Egra_UrlBoton"].ToString() : "",
                        Egra_Region = reader["Egra_Region"] != DBNull.Value ? reader["Egra_Region"].ToString() : "",
                        Egra_Correo = reader["Egra_Correo"] != DBNull.Value ? reader["Egra_Correo"].ToString() : "",
                        Egra_PaginaWeb = reader["Egra_PaginaWeb"] != DBNull.Value ? reader["Egra_PaginaWeb"].ToString() : "",
                        Egra_RUC = reader["Egra_RUC"] != DBNull.Value ? reader["Egra_RUC"].ToString() : "",
                        Egra_RedesSociales = reader["Egra_RedesSociales"] != DBNull.Value ? reader["Egra_RedesSociales"].ToString() : "",
                        Egra_RedesSocialesDos = reader["Egra_RedesSocialesDos"] != DBNull.Value ? reader["Egra_RedesSocialesDos"].ToString() : "",
                        Egra_RedesSocialesTres = reader["Egra_RedesSocialesTres"] != DBNull.Value ? reader["Egra_RedesSocialesTres"].ToString() : "",
                        Egra_RedesSocialesCuatro = reader["Egra_RedesSocialesCuatro"] != DBNull.Value ? reader["Egra_RedesSocialesCuatro"].ToString() : "",
                        Egra_TipoEmpresa = reader["Egra_TipoEmpresa"] != DBNull.Value ? reader["Egra_TipoEmpresa"].ToString() : "",
                        Egra_Certificaciones = reader["Egra_Certificaciones"] != DBNull.Value ? reader["Egra_Certificaciones"].ToString() : "",
                        Egra_UrlLogo = reader["Egra_UrlLogo"] != DBNull.Value ? reader["Egra_UrlLogo"].ToString() : "",
                        Egra_MercadosSegmentosAtendidos = reader["Egra_MercadosSegmentosAtendidos"] != DBNull.Value ? reader["Egra_MercadosSegmentosAtendidos"].ToString() : "",
                        Egra_RazonSocial = reader["Egra_RazonSocial"] != DBNull.Value ? reader["Egra_RazonSocial"].ToString() : "",
                        Egra_SegmentosAtendidos = reader["Egra_SegmentosAtendidos"] != DBNull.Value ? reader["Egra_SegmentosAtendidos"].ToString() : "",
                        Egra_Direccion = reader["Egra_Direccion"] != DBNull.Value ? reader["Egra_Direccion"].ToString() : "",
                        ID_TipoEmpresa = reader["ID_TipoEmpresa"] != DBNull.Value ? Convert.ToInt32(reader["ID_TipoEmpresa"]) : 0,
                        TipoEmpresa = reader["TipoEmpresa"] != DBNull.Value ? reader["TipoEmpresa"].ToString() : "",
                        ID_Region = reader["ID_Region"] != DBNull.Value ? Convert.ToInt32(reader["ID_Region"]) : 0,
                        Region = reader["Region"] != DBNull.Value ? reader["Region"].ToString() : "",
                        ID_Provincia = reader["ID_Provincia"] != DBNull.Value ? Convert.ToInt32(reader["ID_Provincia"]) : 0,
                        Provincia = reader["Provincia"] != DBNull.Value ? reader["Provincia"].ToString() : "",
                        ID_Distrito = reader["ID_Distrito"] != DBNull.Value ? Convert.ToInt32(reader["ID_Distrito"]) : 0,
                        Distrito = reader["Distrito"] != DBNull.Value ? reader["Distrito"].ToString() : "",


                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el EmpresaGraduada por ID", ex);
            }
        }

        public async Task<int> EliminarEmpresaAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_EmpresaGraduada_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Egra_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "EmpresaGraduada", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el EmpresaGraduada", ex);
            }
        }

        public async Task<int> ActualizarEmpresaAsync(EmpresaBE empresa, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_EmpresaGraduada_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Egra_ID", empresa.Egra_ID);
                    comando.Parameters.AddWithValue("@Egra_NombreEmpresa", empresa.Egra_NombreEmpresa);
                    comando.Parameters.AddWithValue("@Egra_Imagen", empresa.Egra_Imagen);
                    comando.Parameters.AddWithValue("@Egra_Orden", empresa.Egra_Orden);
                    comando.Parameters.AddWithValue("@Egra_Descripcion", empresa.Egra_Descripcion);
                    comando.Parameters.AddWithValue("@Egra_Titulo", empresa.Egra_Titulo);
                    comando.Parameters.AddWithValue("@Egra_NombreBoton", empresa.Egra_NombreBoton);
                    comando.Parameters.AddWithValue("@Egra_UrlBoton", empresa.Egra_UrlBoton);
                    comando.Parameters.AddWithValue("@Egra_Region", empresa.Egra_Region);
                    comando.Parameters.AddWithValue("@Egra_Correo", empresa.Egra_Correo);
                    comando.Parameters.AddWithValue("@Egra_PaginaWeb", empresa.Egra_PaginaWeb);
                    comando.Parameters.AddWithValue("@Egra_RUC", empresa.Egra_RUC);
                    comando.Parameters.AddWithValue("@Egra_RedesSociales", empresa.Egra_RedesSociales);
                    comando.Parameters.AddWithValue("@Egra_RedesSocialesDos", empresa.Egra_RedesSocialesDos);
                    comando.Parameters.AddWithValue("@Egra_RedesSocialesTres", empresa.Egra_RedesSocialesTres);
                    comando.Parameters.AddWithValue("@Egra_RedesSocialesCuatro", empresa.Egra_RedesSocialesCuatro);
                    comando.Parameters.AddWithValue("@Egra_TipoEmpresa", empresa.Egra_TipoEmpresa);
                    comando.Parameters.AddWithValue("@Egra_Certificaciones", empresa.Egra_Certificaciones);
                    comando.Parameters.AddWithValue("@Egra_UrlLogo", empresa.Egra_UrlLogo);
                    comando.Parameters.AddWithValue("@Egra_Mercados", empresa.Egra_MercadosSegmentosAtendidos);
                    comando.Parameters.AddWithValue("@Egra_RazonSocial", empresa.Egra_RazonSocial);
                    comando.Parameters.AddWithValue("@Egra_Direccion", empresa.Egra_Direccion);
                    comando.Parameters.AddWithValue("@Egra_Direccion", empresa.Egra_Celular);
                    comando.Parameters.AddWithValue("@Egra_Direccion", empresa.Egra_CelularDos);
                    comando.Parameters.AddWithValue("@Temp_ID", empresa.ID_TipoEmpresa);
                    comando.Parameters.AddWithValue("@Regi_ID", empresa.ID_Region);
                    comando.Parameters.AddWithValue("@Prov_ID", empresa.ID_Provincia);
                    comando.Parameters.AddWithValue("@Dist_ID", empresa.ID_Distrito);
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Empresa", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "EmpresaGraduada", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarEmpresaAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Empresa", ex);
            }
        }

        public async Task<List<EmpresaBE>> ListarEmpresasAsync()
        {
            try
            {
                var empresas = new List<EmpresaBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_EmpresaGraduada_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    empresas.Add(new EmpresaBE
                    {
                        Egra_ID = reader["Egra_ID"] != DBNull.Value ? Convert.ToInt32(reader["Egra_ID"]) : 0,
                        Egra_NombreEmpresa = reader["Egra_NombreEmpresa"] != DBNull.Value ? reader["Egra_NombreEmpresa"].ToString() : "",
                        Egra_Imagen = reader["Egra_Imagen"] != DBNull.Value ? reader["Egra_Imagen"].ToString() : "",
                        Egra_Orden = reader["Egra_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Egra_Orden"]) : 0,
                        Egra_Descripcion = reader["Egra_Descripcion"] != DBNull.Value ? reader["Egra_Descripcion"].ToString() : "",
                        Egra_Titulo = reader["Egra_Titulo"] != DBNull.Value ? reader["Egra_Titulo"].ToString() : "",
                        Egra_NombreBoton = reader["Egra_NombreBoton"] != DBNull.Value ? reader["Egra_NombreBoton"].ToString() : "",
                        Egra_UrlBoton = reader["Egra_UrlBoton"] != DBNull.Value ? reader["Egra_UrlBoton"].ToString() : "",
                        Egra_Region = reader["Egra_Region"] != DBNull.Value ? reader["Egra_Region"].ToString() : "",
                        Egra_Correo = reader["Egra_Correo"] != DBNull.Value ? reader["Egra_Correo"].ToString() : "",
                        Egra_PaginaWeb = reader["Egra_PaginaWeb"] != DBNull.Value ? reader["Egra_PaginaWeb"].ToString() : "",
                        Egra_RUC = reader["Egra_RUC"] != DBNull.Value ? reader["Egra_RUC"].ToString() : "",
                        Egra_RedesSociales = reader["Egra_RedesSociales"] != DBNull.Value ? reader["Egra_RedesSociales"].ToString() : "",
                        Egra_RedesSocialesDos = reader["Egra_RedesSocialesDos"] != DBNull.Value ? reader["Egra_RedesSocialesDos"].ToString() : "",
                        Egra_RedesSocialesTres = reader["Egra_RedesSocialesTres"] != DBNull.Value ? reader["Egra_RedesSocialesTres"].ToString() : "",
                        Egra_RedesSocialesCuatro = reader["Egra_RedesSocialesCuatro"] != DBNull.Value ? reader["Egra_RedesSocialesCuatro"].ToString() : "",
                        Egra_TipoEmpresa = reader["Egra_TipoEmpresa"] != DBNull.Value ? reader["Egra_TipoEmpresa"].ToString() : "",
                        Egra_Certificaciones = reader["Egra_Certificaciones"] != DBNull.Value ? reader["Egra_Certificaciones"].ToString() : "",
                        Egra_UrlLogo = reader["Egra_UrlLogo"] != DBNull.Value ? reader["Egra_UrlLogo"].ToString() : "",
                        Egra_MercadosSegmentosAtendidos = reader["Egra_MercadosSegmentosAtendidos"] != DBNull.Value ? reader["Egra_MercadosSegmentosAtendidos"].ToString() : "",
                        Egra_RazonSocial = reader["Egra_RazonSocial"] != DBNull.Value ? reader["Egra_RazonSocial"].ToString() : "",
                        Egra_Direccion = reader["Egra_Direccion"] != DBNull.Value ? reader["Egra_Direccion"].ToString() : "",
                        ID_TipoEmpresa = reader["ID_TipoEmpresa"] != DBNull.Value ? Convert.ToInt32(reader["ID_TipoEmpresa"]) : 0,
                        TipoEmpresa = reader["TipoEmpresa"] != DBNull.Value ? reader["TipoEmpresa"].ToString() : "",
                        ID_Region = reader["ID_Region"] != DBNull.Value ? Convert.ToInt32(reader["ID_Region"]) : 0,
                        Region = reader["Region"] != DBNull.Value ? reader["Region"].ToString() : "",
                        ID_Provincia = reader["ID_Provincia"] != DBNull.Value ? Convert.ToInt32(reader["ID_Provincia"]) : 0,
                        Provincia = reader["Provincia"] != DBNull.Value ? reader["Provincia"].ToString() : "",
                        ID_Distrito = reader["ID_Distrito"] != DBNull.Value ? Convert.ToInt32(reader["ID_Distrito"]) : 0,
                        Distrito = reader["Distrito"] != DBNull.Value ? reader["Distrito"].ToString() : "",
                    });
                }

                return empresas;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los EmpresaGraduada", ex);
            }
        }

    }
}
