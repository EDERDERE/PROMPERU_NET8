using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace PROMPERU.DA
{
    public class UsuarioDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public UsuarioDA(ConexionDB conexionDB, AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }
        public async Task<int> RegistrarUsuarioAsync(UsuarioBE usuario,string usuarioLogin, string ip)
        {
            try
            {
                int nuevoId = 0;

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Usuario_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                comando.Parameters.AddWithValue("@Usua_Usuario", usuario.Usua_Usuario);
                comando.Parameters.AddWithValue("@Usua_Contrasenia", usuario.Usua_Contrasenia);
                //comando.Parameters.AddWithValue("@Usua_Cargo", usuario.Usua_Cargo);

                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);

                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                if (nuevoID > 0)
                {
                    await _auditoriaDA.RegistrarAuditoriaAsync(usuarioLogin, "I", "Usuario", ip, nuevoID);
                }             

                return nuevoID;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al registrar Usuario", ex);
            }
        }
        public async Task<UsuarioBE> ValidarUsuarioAsync(string usuario)
        {
            try
            {
                UsuarioBE usuarioValidado = null;

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_ValidarUsuario", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                comando.Parameters.AddWithValue("Usuario", usuario);

         
                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    usuarioValidado = new UsuarioBE
                    {
                        Usua_ID = reader.GetInt32(reader.GetOrdinal("Usua_ID")),
                        Usua_Usuario = reader.GetString(reader.GetOrdinal("Usua_Usuario")),
                        Usua_Contrasenia = reader.GetString(reader.GetOrdinal("Usua_Contrasenia")),
                        Usua_Cargo = reader.GetString(reader.GetOrdinal("Usua_Cargo"))
                    };
                }

                return usuarioValidado;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los Usuario", ex);
            }
        }
        public async Task<bool> CambiarContraseniaAsync(int usuarioId, string nuevaContrasenia)
        {
            try
            {              

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_CambiarContraseniaUsuario", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                comando.Parameters.AddWithValue("@NuevaContrasenia", nuevaContrasenia);
                comando.Parameters.AddWithValue("@UsuarioID", usuarioId);

                var filasAfectadas = (int)(await comando.ExecuteScalarAsync());                
                

                return filasAfectadas > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al cambiar contraseña", ex);
            }
        }

        public async Task<List<UsuarioBE>> ListarUsuariosAsync()
        {
            try
            {
                List<UsuarioBE> usuarios = new List<UsuarioBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Usuario_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    usuarios.Add(new UsuarioBE
                    {
                        Usua_ID = Convert.ToInt32(reader["Usua_ID"]),
                        Usua_Usuario = reader["Usua_Usuario"].ToString(),
                        Usua_Cargo = reader["Usua_Cargo"].ToString()
                    });
                }

                return usuarios;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar usuarios", ex);
            }
        }
        public async Task<UsuarioBE> ObtenerUsuarioPorIdAsync(int usuarioId)
        {
            try
            {
                UsuarioBE usuario = null;

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Usuario_SEL_PorId", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                comando.Parameters.AddWithValue("@Usua_ID", usuarioId);

                await using var reader = await comando.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    usuario = new UsuarioBE
                    {
                        Usua_ID = Convert.ToInt32(reader["Usua_ID"]),
                        Usua_Usuario = reader["Usua_Usuario"].ToString(),
                        Usua_Contrasenia = reader["Usua_Contrasenia"].ToString(),
                        Usua_Cargo = reader["Usua_Cargo"].ToString()
                    };
                }

                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar usuarios", ex);
            }
        }

        //public async Task<bool> RestablecerContraseniaAsync(int usuarioId)
        //{
        //    try
        //    {

        //        await using var conexion = await _conexionDB.ObtenerConexionAsync();
        //        await using var comando = new SqlCommand("USP_CambiarContraseniaUsuario", conexion)
        //        {
        //            CommandType = CommandType.StoredProcedure
        //        };
        //        comando.Parameters.AddWithValue("@NuevaContrasenia", nuevaContrasenia);
        //        comando.Parameters.AddWithValue("@UsuarioID", usuarioId);

        //        var filasAfectadas = (int)(await comando.ExecuteScalarAsync());


        //        return filasAfectadas > 0;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error al cambiar contraseña", ex);
        //    }
        //}


        public async Task<int> ActualizarUsuarioAsync(UsuarioBE usuario, string contraseniaEncriptada, string usuarioLogin, string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();

                await using var transaccion = await conexion.BeginTransactionAsync();
                try
                {
                    // Configuración del comando SQL
                    await using var comando = new SqlCommand("USP_Usuario_UPD", conexion, (SqlTransaction)transaccion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    // Parámetros del procedimiento almacenado
                    comando.Parameters.AddWithValue("@Usua_ID", usuario.Usua_ID);
                    comando.Parameters.AddWithValue("@Usua_Usuario", usuario.Usua_Usuario);
                    comando.Parameters.AddWithValue("@Usua_Contrasenia", contraseniaEncriptada);

                    // Ejecución del comando
                    var filasAfectadas = (int)(await comando.ExecuteScalarAsync());

                    if (filasAfectadas > 0)
                    {
                        // Registrar la auditoría
                        await _auditoriaDA.RegistrarAuditoriaConTransaccionAsync(usuarioLogin, "E", "Usuario", ip, id, conexion, (SqlTransaction)transaccion);

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
                    throw new Exception("Error en ActualizarUsuarioAsync: La transacción fue revertida.", ex);
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al actualizar el Usuario", ex);
            }
        }

    }
}
