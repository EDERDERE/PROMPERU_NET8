using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.DA
{
    public class UsuarioDA
    {
        private readonly ConexionDB _conexionDB;

        public UsuarioDA(ConexionDB conexionDB)
        {
            _conexionDB = conexionDB;
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

    }
}
