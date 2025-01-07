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

        public async Task<UsuarioBE?> ValidarUsuarioAsync(string usuario)
        {
            try
            {
                using (SqlConnection conexion = _conexionDB.ObtenerConexion())
                {
                    using (SqlCommand comando = new SqlCommand("USP_ValidarUsuario", conexion))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        // Parámetros
                        comando.Parameters.AddWithValue("@Usuario", usuario);           

                        await conexion.OpenAsync();

                        using (SqlDataReader reader = await comando.ExecuteReaderAsync())
                        {
                            // Si hay resultados, se crea y devuelve el objeto Usuario
                            if (await reader.ReadAsync())
                            {
                                return new UsuarioBE
                                {
                                    Usua_ID = reader.GetInt32(reader.GetOrdinal("Usua_ID")),
                                    Usua_Usuario = reader.GetString(reader.GetOrdinal("Usua_Usuario")),
                                    Usua_Contrasenia = reader.GetString(reader.GetOrdinal("Usua_Contrasenia")),
                                    Usua_Cargo = reader.GetString(reader.GetOrdinal("Usua_Cargo"))
                                };
                            }
                        }
                    }
                }

                // Si no hay resultados, devuelve null
                return null;
            }
            catch (Exception ex)
            {
                // Manejo del error, puedes registrar el error o lanzar una excepción personalizada
                throw new Exception("Error al validar el usuario.", ex);
            }
        }

    }
}
