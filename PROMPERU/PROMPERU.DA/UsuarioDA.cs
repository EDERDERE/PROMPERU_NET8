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

        public UsuarioDA(ConexionDB conexionDB)
        {
            _conexionDB = conexionDB;
        }
        public async Task<int> RegistrarUsuarioAsync(UsuarioBE usuario)
        {
            try
            {
                int nuevoId = 0;

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_RegistrarUsuario", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                comando.Parameters.AddWithValue("@Usua_Usuario", usuario.Usua_Usuario);
                comando.Parameters.AddWithValue("@Usua_Contrasenia", usuario.Usua_Contrasenia);
                comando.Parameters.AddWithValue("@Usua_Cargo", usuario.Usua_Cargo);


                await using var reader = await comando.ExecuteReaderAsync();

                object result = await comando.ExecuteScalarAsync();
                if (result != null)
                {
                    nuevoId = Convert.ToInt32(result);
                }

                return nuevoId;
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
                await using var comando = new SqlCommand("USP_ListarUsuarios", conexion)
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
                await using var comando = new SqlCommand("USP_ListarUsuarioPorId", conexion)
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

    }
}
