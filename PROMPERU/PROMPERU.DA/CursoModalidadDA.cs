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
    public class CursoModalidadDA
    {
        private readonly ConexionDB _conexionDB;

        public CursoModalidadDA(ConexionDB conexionDB)
        {
            _conexionDB = conexionDB;
        }

        public async Task RegistrarCursoModalidadAsync(TipoModalidadBE modalidad)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_CursoModalidad_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                  
                comando.Parameters.AddWithValue("@Curs_ID", modalidad.Curs_ID);
                comando.Parameters.AddWithValue("@Tmod_ID", modalidad.Tmod_ID);          
                comando.Parameters.AddWithValue("@Cmod_FechaInicio", (object)modalidad.FechaInicio ?? DBNull.Value);          
                comando.Parameters.AddWithValue("@Cmod_FechaFin", (object)modalidad.FechaFin ?? DBNull.Value);      

                await comando.ExecuteNonQueryAsync(); 
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al registrar la CursoModalidad.", ex);
            }
        }

        public async Task ActualizarCursoModalidadAsync(TipoModalidadBE modalidad)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_CursoModalidad_UPD", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.Parameters.AddWithValue("@Curs_ID", modalidad.Curs_ID);
                comando.Parameters.AddWithValue("@Tmod_ID", modalidad.Tmod_ID);
                comando.Parameters.AddWithValue("@Cmod_FechaInicio", (object)modalidad.FechaInicio ?? DBNull.Value);
                comando.Parameters.AddWithValue("@Cmod_FechaFin", (object)modalidad.FechaFin ?? DBNull.Value);

                await comando.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al registrar la CursoModalidad.", ex);
            }
        }
    }
}
