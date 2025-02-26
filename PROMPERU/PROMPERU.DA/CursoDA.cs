using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class CursoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;
        private readonly CursoModalidadDA _cursoModalidadDA;

        public CursoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA,CursoModalidadDA cursoModalidadDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
            _cursoModalidadDA = cursoModalidadDA;
        }

        // Inserta un nuevo Curso y devuelve la fila creada
        public async Task<CursoBE> InsertarCursoAsync(CursoBE curso, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Curso_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
              
                comando.Parameters.AddWithValue("@Curs_Orden", curso.Curs_Orden);
                comando.Parameters.AddWithValue("@Curs_Titulo", curso.Curs_Titulo);
                comando.Parameters.AddWithValue("@Curs_TituloSeccion", curso.Curs_TituloSeccion);
                comando.Parameters.AddWithValue("@Curs_NombreBoton", curso.Curs_NombreBoton);
                comando.Parameters.AddWithValue("@Curs_UrlIconBoton", curso.Curs_UrlIconBoton);
                comando.Parameters.AddWithValue("@Curs_NombreCurso", curso.Curs_NombreCurso);
                comando.Parameters.AddWithValue("@Curs_CodigoCurso", curso.Curs_CodigoCurso);

                comando.Parameters.AddWithValue("@Curs_DescripcionCalendario", curso.Curs_DescripcionCalendario);
                comando.Parameters.AddWithValue("@Curs_Descripcion", curso.Curs_Descripcion);
                comando.Parameters.AddWithValue("@Curs_TituloCalendario", curso.Curs_TituloCalendario);
                comando.Parameters.AddWithValue("@Curs_DuracionHoras", curso.Curs_DuracionHoras);
                comando.Parameters.AddWithValue("@Curs_FechaInicio", curso.Curs_FechaInicio);
                comando.Parameters.AddWithValue("@Curs_FechaFin", curso.Curs_FechaFin);
                comando.Parameters.AddWithValue("@Curs_NombreBotonTitulo", curso.Curs_NombreBotonTitulo);
                comando.Parameters.AddWithValue("@Curs_UrlIcon", curso.Curs_UrlIcon);
                comando.Parameters.AddWithValue("@Curs_UrlImagen", curso.Curs_UrlImagen);
                comando.Parameters.AddWithValue("@Curs_LinkBoton", curso.Curs_LinkBoton);
                comando.Parameters.AddWithValue("@Curs_EsHabilitado", curso.Curs_EsHabilitado);
                comando.Parameters.AddWithValue("@Teve_ID", curso.Teve_ID);
                comando.Parameters.AddWithValue("@Tmod_ID", curso.Tmod_ID);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    foreach (var item in curso.TipoModalidadList)
                    {
                        item.Curs_ID = nuevoID;
                        await _cursoModalidadDA.RegistrarCursoModalidadAsync(item);
                    }                 

                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I","Curso", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Curso", ex);
            }
        }

        public async Task<int> EliminarCursoAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_Curso_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Curs_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "Curso", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el Curso", ex);
            }
        }

        public async Task<int> ActualizarCursoAsync(CursoBE curso, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Curso_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Curs_ID", curso.Curs_ID);
                    comando.Parameters.AddWithValue("@Curs_Orden", curso.Curs_Orden);
                    comando.Parameters.AddWithValue("@Curs_Titulo", curso.Curs_Titulo);
                    comando.Parameters.AddWithValue("@Curs_TituloSeccion", curso.Curs_TituloSeccion);
                    comando.Parameters.AddWithValue("@Curs_NombreBoton", curso.Curs_NombreBoton);
                    comando.Parameters.AddWithValue("@Curs_UrlIconBoton", curso.Curs_UrlIconBoton);
                    comando.Parameters.AddWithValue("@Curs_NombreCurso", curso.Curs_NombreCurso);
                    comando.Parameters.AddWithValue("@Curs_CodigoCurso", curso.Curs_CodigoCurso);
                    comando.Parameters.AddWithValue("@Curs_DescripcionCalendario", curso.Curs_DescripcionCalendario);
                    comando.Parameters.AddWithValue("@Curs_Descripcion", curso.Curs_Descripcion);
                    comando.Parameters.AddWithValue("@Curs_TituloCalendario", curso.Curs_TituloCalendario);
                    comando.Parameters.AddWithValue("@Curs_DuracionHoras", curso.Curs_DuracionHoras);
                    //comando.Parameters.AddWithValue("@Curs_FechaInicio", (object)curso.Curs_FechaInicio ?? DBNull.Value);
                    //comando.Parameters.AddWithValue("@Curs_FechaFin", (object)curso.Curs_FechaFin ?? DBNull.Value);
                    comando.Parameters.AddWithValue("@Curs_NombreBotonTitulo", curso.Curs_NombreBotonTitulo);
                    comando.Parameters.AddWithValue("@Curs_UrlIcon", curso.Curs_UrlIcon);
                    comando.Parameters.AddWithValue("@Curs_UrlImagen", curso.Curs_UrlImagen);
                    comando.Parameters.AddWithValue("@Curs_LinkBoton", curso.Curs_LinkBoton);
                    comando.Parameters.AddWithValue("@Curs_EsHabilitado", curso.Curs_EsHabilitado);
                    comando.Parameters.AddWithValue("@Teve_ID", curso.Teve_ID);
                    comando.Parameters.AddWithValue("@Tmod_ID", curso.Tmod_ID);
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        if (curso.TipoModalidadList != null)
                        {
                            foreach (var item in curso.TipoModalidadList)
                            {
                                item.Curs_ID = curso.Curs_ID;
                                await _cursoModalidadDA.ActualizarCursoModalidadAsync(item);
                            }
                        }                      


                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","Curso", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "Curso", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarCursoAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Curso", ex);
            }
        }

        public async Task<List<CursoBE>> ListarCursosAsync()
        {
            try
            {
                var Cursos = new List<CursoBE>();
                var modalidades = new List<TipoModalidadBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Curso_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Cursos.Add(new CursoBE
                    {
                        Curs_ID = reader["Curs_ID"] != DBNull.Value ? Convert.ToInt32(reader["Curs_ID"]) : 0,
                        Curs_Orden = reader["Curs_Orden"] != DBNull.Value ? Convert.ToInt32(reader["Curs_Orden"]) : 0,
                        Curs_Titulo = reader["Curs_Titulo"] != DBNull.Value ? reader["Curs_Titulo"].ToString() : "",
                        Curs_TituloSeccion = reader["Curs_TituloSeccion"] != DBNull.Value ? reader["Curs_TituloSeccion"].ToString() : "",
                        Curs_NombreBoton = reader["Curs_NombreBoton"] != DBNull.Value ? reader["Curs_NombreBoton"].ToString() : "",
                        Curs_UrlIconBoton = reader["Curs_UrlIconBoton"] != DBNull.Value ? reader["Curs_UrlIconBoton"].ToString() : "",
                        Curs_NombreCurso = reader["Curs_NombreCurso"] != DBNull.Value ? reader["Curs_NombreCurso"].ToString() : "",
                        Curs_CodigoCurso = reader["Curs_CodigoCurso"] != DBNull.Value ? reader["Curs_CodigoCurso"].ToString() : "",
                        Curs_DescripcionCalendario = reader["Curs_DescripcionCalendario"] != DBNull.Value ? reader["Curs_DescripcionCalendario"].ToString() : "",
                        Curs_Descripcion = reader["Curs_Descripcion"] != DBNull.Value ? reader["Curs_Descripcion"].ToString() : "",
                        Curs_TituloCalendario = reader["Curs_TituloCalendario"] != DBNull.Value ? reader["Curs_TituloCalendario"].ToString() : "",
                        Curs_DuracionHoras = reader["Curs_DuracionHoras"] != DBNull.Value ? Convert.ToInt32(reader["Curs_DuracionHoras"]) : 0,
                        //Curs_FechaInicio = reader["Curs_FechaInicio"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["Curs_FechaInicio"]),
                        //Curs_FechaFin = reader["Curs_FechaFin"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["Curs_FechaFin"]),
                        Curs_NombreBotonTitulo = reader["Curs_NombreBotonTitulo"] != DBNull.Value ? reader["Curs_NombreBotonTitulo"].ToString() : "",
                        Curs_UrlIcon = reader["Curs_UrlIcon"] != DBNull.Value ? reader["Curs_UrlIcon"].ToString() : "",
                        Curs_UrlImagen = reader["Curs_UrlImagen"] != DBNull.Value ? reader["Curs_UrlImagen"].ToString() : "",
                        Curs_LinkBoton = reader["Curs_LinkBoton"] != DBNull.Value ? reader["Curs_LinkBoton"].ToString() : "",
                        Curs_EsHabilitado = reader["Curs_EsHabilitado"] != DBNull.Value ? Convert.ToInt32(reader["Curs_EsHabilitado"]) : 0,
                        Curs_Evento = reader["Curs_Evento"] != DBNull.Value ? reader["Curs_Evento"].ToString() : "",
                        Teve_ID = reader["ID_Evento"] != DBNull.Value ? Convert.ToInt32(reader["ID_Evento"]) : 0,
                        TipoModalidadList = new List<TipoModalidadBE>()


                    });
                }
                // Pasar al segundo conjunto de resultados
                if (await reader.NextResultAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        modalidades.Add(new TipoModalidadBE
                        {
                            Curs_ID = reader["Curs_ID"] != DBNull.Value ? Convert.ToInt32(reader["Curs_ID"]) : 0,
                            Tmod_ID = reader["Tmod_ID"] != DBNull.Value ? Convert.ToInt32(reader["Tmod_ID"]) : 0,
                            FechaInicio = reader["Cmod_FechaInicio"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["Cmod_FechaInicio"]),
                            FechaFin = reader["Cmod_FechaFin"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["Cmod_FechaFin"]),
                            Tmod_Nombre = reader["Tmod_Nombre"] != DBNull.Value ? (reader["Tmod_Nombre"]).ToString() : "",
                        });
                    }
                }
                // **Asociar las modalidades a los cursos correspondientes**
                var cursosDict = Cursos.ToDictionary(c => c.Curs_ID); // Para acceso rápido
                foreach (var modalidad in modalidades)
                {
                    if (cursosDict.TryGetValue(modalidad.Curs_ID, out var curso))
                    {
                        curso.TipoModalidadList.Add(modalidad);
                    }
                }

                return Cursos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Cursos", ex);
            }
        }
        public async Task<List<TipoEventoBE>> ListarTipoEventosAsync()
        {
            try
            {
                var TipoEvento = new List<TipoEventoBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_TipoEvento_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    TipoEvento.Add(new TipoEventoBE
                    {
                        Teve_ID = reader["Teve_ID"] != DBNull.Value ? Convert.ToInt32(reader["Teve_ID"]) : 0,
                        Teve_Nombre = reader["Teve_Nombre"] != DBNull.Value ? reader["Teve_Nombre"].ToString() : ""                       

                    });
                }

                return TipoEvento;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Tipo Eventos", ex);
            }
        }

        public async Task<List<TipoModalidadBE>> ListarTipoModalidadsAsync()
        {
            try
            {
                var TipoModalidad = new List<TipoModalidadBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_TipoModalidad_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    TipoModalidad.Add(new TipoModalidadBE
                    {
                        Tmod_ID = reader["Tmod_ID"] != DBNull.Value ? Convert.ToInt32(reader["Tmod_ID"]) : 0,
                        Tmod_Nombre = reader["Tmod_Nombre"] != DBNull.Value ? reader["Tmod_Nombre"].ToString() : ""

                    });
                }

                return TipoModalidad;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Tipo Modalidads", ex);
            }
        }
    }
}
