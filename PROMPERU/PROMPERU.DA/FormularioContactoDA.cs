using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class FormularioContactoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public FormularioContactoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo FormularioContacto y devuelve la fila creada
        public async Task<FormularioContactoBE> InsertarFormularioContactoAsync(FormularioContactoBE formularioContacto, string usuario, string ip)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_FormularioContacto_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Fcon_Titulo", formularioContacto.Fcon_Titulo);
                comando.Parameters.AddWithValue("@Fcon_Descripcion", formularioContacto.Fcon_Descripcion);
                comando.Parameters.AddWithValue("@Fcon_UrlImagen", formularioContacto.Fcon_UrlImagen);
                comando.Parameters.AddWithValue("@Fcon_SubTitulo", formularioContacto.Fcon_SubTitulo);
                comando.Parameters.AddWithValue("@Fcon_DescripcionSubTitulo", formularioContacto.Fcon_DescripcionSubTitulo);
                comando.Parameters.AddWithValue("@Fcon_Direccion", formularioContacto.Fcon_Direccion);
                comando.Parameters.AddWithValue("@Fcon_SubTituloDos", formularioContacto.Fcon_SubTituloDos);
                comando.Parameters.AddWithValue("@Fcon_Correo", formularioContacto.Fcon_Correo);
                comando.Parameters.AddWithValue("@Fcon_Telefono", formularioContacto.Fcon_Telefono);
                comando.Parameters.AddWithValue("@Fcon_Horario", formularioContacto.Fcon_Horario);
                comando.Parameters.AddWithValue("@Fcon_TituloSeccion", formularioContacto.Fcon_TituloSeccion);
                comando.Parameters.AddWithValue("@Fcon_UrlPoliticas", formularioContacto.Fcon_UrlPoliticas);
                comando.Parameters.AddWithValue("@Fcon_NombreBoton", formularioContacto.Fcon_NombreBoton);
                comando.Parameters.AddWithValue("@Fcon_UrlIconBoton", formularioContacto.Fcon_UrlIconBoton);
                comando.Parameters.AddWithValue("@Fcon_NombreBotonDos", formularioContacto.Fcon_NombreBotonDos);
                comando.Parameters.AddWithValue("@Fcon_UrlIconBotonDos", formularioContacto.Fcon_UrlIconBotonDos);               



                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);
                
                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "I", "FormularioContacto", ip, nuevoID);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el FormularioContacto", ex);
            }
        }

        //private async Task<FormularioContactoBE> ObtenerFormularioContactoPorIDAsync(int egra_ID)
        //{
        //    try
        //    {
        //        await using var conexion = await _conexionDB.ObtenerConexionAsync();
        //        await using var comando = new SqlCommand("USP_FormularioContacto_SEL", conexion)
        //        {
        //            CommandType = CommandType.StoredProcedure
        //        };

        //        comando.Parameters.AddWithValue("@Egra_ID", egra_ID);

        //        await conexion.OpenAsync();
        //        await using var reader = await comando.ExecuteReaderAsync();

        //        if (await reader.ReadAsync())
        //        {
        //            return new FormularioContactoBE
        //            {
        //                Fcon_ID = reader["Fcon_ID"] != DBNull.Value ? Convert.ToInt32(reader["Fcon_ID"]) : 0,
        //                Fcon_Titulo = reader["Fcon_Titulo"] != DBNull.Value ? reader["Fcon_Titulo"].ToString() : string.Empty,
        //                Fcon_Descripcion = reader["Fcon_Descripcion"] != DBNull.Value ? reader["Fcon_Descripcion"].ToString() : string.Empty,
        //                Fcon_UrlImagen = reader["Fcon_UrlImagen"] != DBNull.Value ? reader["Fcon_UrlImagen"].ToString() : string.Empty,
        //                Fcon_SubTitulo = reader["Fcon_SubTitulo"] != DBNull.Value ? reader["Fcon_SubTitulo"].ToString() : string.Empty,
        //                Fcon_DescripcionSubTitulo = reader["Fcon_DescripcionSubTitulo"] != DBNull.Value ? reader["Fcon_DescripcionSubTitulo"].ToString() : string.Empty,
        //                Fcon_Direccion = reader["Fcon_Direccion"] != DBNull.Value ? reader["Fcon_Direccion"].ToString() : string.Empty,
        //                Fcon_SubTituloDos = reader["Fcon_SubTituloDos"] != DBNull.Value ? reader["Fcon_SubTituloDos"].ToString() : string.Empty,
        //                Fcon_Correo = reader["Fcon_Correo"] != DBNull.Value ? reader["Fcon_Correo"].ToString() : string.Empty,
        //                Fcon_Telefono = reader["Fcon_Telefono"] != DBNull.Value ? reader["Fcon_Telefono"].ToString() : string.Empty,
        //                Fcon_Horario = reader["Fcon_Horario"] != DBNull.Value ? reader["Fcon_Horario"].ToString() : string.Empty,
        //                Fcon_TituloSeccion = reader["Fcon_TituloSeccion"] != DBNull.Value ? reader["Fcon_TituloSeccion"].ToString() : string.Empty,
        //                Fcon_UrlPoliticas = reader["Fcon_UrlPoliticas"] != DBNull.Value ? reader["Fcon_UrlPoliticas"].ToString() : string.Empty,
        //                Fcon_NombreBoton = reader["Fcon_NombreBoton"] != DBNull.Value ? reader["Fcon_NombreBoton"].ToString() : string.Empty,
        //                Fcon_UrlIconBoton = reader["Fcon_UrlIconBoton"] != DBNull.Value ? reader["Fcon_UrlIconBoton"].ToString() : string.Empty,
        //                Fcon_NombreBotonDos = reader["Fcon_NombreBotonDos"] != DBNull.Value ? reader["Fcon_NombreBotonDos"].ToString() : string.Empty,
        //                Fcon_UrlIconBotonDos = reader["Fcon_UrlIconBotonDos"] != DBNull.Value ? reader["Fcon_UrlIconBotonDos"].ToString() : string.Empty,


        //            };
        //        }

        //        return null;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error al obtener el FormularioContacto por ID", ex);
        //    }
        //}

        public async Task<int> EliminarFormularioContactoAsync(string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();               

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    await using var comando = new SqlCommand("USP_FormularioContacto_DEL", conexion,(SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    comando.Parameters.AddWithValue("@Fcont_ID", id);
                    int filasAfectadas = await comando.ExecuteNonQueryAsync();

                    if (filasAfectadas > 0)
                    {
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "D", "FormularioContacto", ip, id,conexion, (SqlTransaction)transaccion);
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
                throw new Exception("Error al eliminar el FormularioContacto", ex);
            }
        }

        public async Task<int> ActualizarFormularioContactoAsync(FormularioContactoBE formularioContacto, string usuario, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();                

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_FormularioContacto_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Fcon_ID", formularioContacto.Fcon_ID);
                    comando.Parameters.AddWithValue("@Fcon_Titulo", formularioContacto.Fcon_Titulo);
                    comando.Parameters.AddWithValue("@Fcon_Descripcion", formularioContacto.Fcon_Descripcion);
                    comando.Parameters.AddWithValue("@Fcon_UrlImagen", formularioContacto.Fcon_UrlImagen);
                    comando.Parameters.AddWithValue("@Fcon_SubTitulo", formularioContacto.Fcon_SubTitulo);
                    comando.Parameters.AddWithValue("@Fcon_DescripcionSubTitulo", formularioContacto.Fcon_DescripcionSubTitulo);
                    comando.Parameters.AddWithValue("@Fcon_Direccion", formularioContacto.Fcon_Direccion);
                    comando.Parameters.AddWithValue("@Fcon_SubTituloDos", formularioContacto.Fcon_SubTituloDos);
                    comando.Parameters.AddWithValue("@Fcon_Correo", formularioContacto.Fcon_Correo);
                    comando.Parameters.AddWithValue("@Fcon_Telefono", formularioContacto.Fcon_Telefono);
                    comando.Parameters.AddWithValue("@Fcon_Horario", formularioContacto.Fcon_Horario);
                    comando.Parameters.AddWithValue("@Fcon_TituloSeccion", formularioContacto.Fcon_TituloSeccion);
                    comando.Parameters.AddWithValue("@Fcon_UrlPoliticas", formularioContacto.Fcon_UrlPoliticas);
                    comando.Parameters.AddWithValue("@Fcon_NombreBoton", formularioContacto.Fcon_NombreBoton);
                    comando.Parameters.AddWithValue("@Fcon_UrlIconBoton", formularioContacto.Fcon_UrlIconBoton);
                    comando.Parameters.AddWithValue("@Fcon_NombreBotonDos", formularioContacto.Fcon_NombreBotonDos);
                    comando.Parameters.AddWithValue("@Fcon_UrlIconBotonDos", formularioContacto.Fcon_UrlIconBotonDos);
                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        //await _auditoriaDA.RegistrarAuditoriaAsync(usuario, "E","FormularioContacto", ip, id);
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuario, "E", "FormularioContacto", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarFormularioContactoAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el FormularioContacto", ex);
            }
        }

        public async Task<List<FormularioContactoBE>> ListarFormularioContactosAsync()
        {
            try
            {
                var formularioContactos = new List<FormularioContactoBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_FormularioContacto_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    formularioContactos.Add(new FormularioContactoBE
                    {
                        Fcon_ID = reader["Fcon_ID"] != DBNull.Value ? Convert.ToInt32(reader["Fcon_ID"]) : 0,
                        Fcon_Titulo = reader["Fcon_Titulo"] != DBNull.Value ? reader["Fcon_Titulo"].ToString() : string.Empty,
                        Fcon_Descripcion = reader["Fcon_Descripcion"] != DBNull.Value ? reader["Fcon_Descripcion"].ToString() : string.Empty,
                        Fcon_UrlImagen = reader["Fcon_UrlImagen"] != DBNull.Value ? reader["Fcon_UrlImagen"].ToString() : string.Empty,
                        Fcon_SubTitulo = reader["Fcon_SubTitulo"] != DBNull.Value ? reader["Fcon_SubTitulo"].ToString() : string.Empty,
                        Fcon_DescripcionSubTitulo = reader["Fcon_DescripcionSubTitulo"] != DBNull.Value ? reader["Fcon_DescripcionSubTitulo"].ToString() : string.Empty,
                        Fcon_Direccion = reader["Fcon_Direccion"] != DBNull.Value ? reader["Fcon_Direccion"].ToString() : string.Empty,
                        Fcon_SubTituloDos = reader["Fcon_SubTituloDos"] != DBNull.Value ? reader["Fcon_SubTituloDos"].ToString() : string.Empty,
                        Fcon_Correo = reader["Fcon_Correo"] != DBNull.Value ? reader["Fcon_Correo"].ToString() : string.Empty,
                        Fcon_Telefono = reader["Fcon_Telefono"] != DBNull.Value ? reader["Fcon_Telefono"].ToString() : string.Empty,
                        Fcon_Horario = reader["Fcon_Horario"] != DBNull.Value ? reader["Fcon_Horario"].ToString() : string.Empty,
                        Fcon_TituloSeccion = reader["Fcon_TituloSeccion"] != DBNull.Value ? reader["Fcon_TituloSeccion"].ToString() : string.Empty,
                        Fcon_UrlPoliticas = reader["Fcon_UrlPoliticas"] != DBNull.Value ? reader["Fcon_UrlPoliticas"].ToString() : string.Empty,
                        Fcon_NombreBoton = reader["Fcon_NombreBoton"] != DBNull.Value ? reader["Fcon_NombreBoton"].ToString() : string.Empty,
                        Fcon_UrlIconBoton = reader["Fcon_UrlIconBoton"] != DBNull.Value ? reader["Fcon_UrlIconBoton"].ToString() : string.Empty,
                        Fcon_NombreBotonDos = reader["Fcon_NombreBotonDos"] != DBNull.Value ? reader["Fcon_NombreBotonDos"].ToString() : string.Empty,
                        Fcon_UrlIconBotonDos = reader["Fcon_UrlIconBotonDos"] != DBNull.Value ? reader["Fcon_UrlIconBotonDos"].ToString() : string.Empty,
                    });
                }

                return formularioContactos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los FormularioContacto", ex);
            }
        }

    }
}
