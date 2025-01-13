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
    public class AuditoriaDA
    {
        private readonly ConexionDB _conexionDB;

        public AuditoriaDA(ConexionDB conexionDB)
        {
            _conexionDB = conexionDB;
        }

        public async Task RegistrarAuditoriaAsync(string usuario, string accion,string nombretabla ,string ip, int id)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Auditoria_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };
                  
                comando.Parameters.AddWithValue("@ID", id);
                comando.Parameters.AddWithValue("@NombreTabla", nombretabla);          
                comando.Parameters.AddWithValue("@Audi_Usuario", usuario);          
                comando.Parameters.AddWithValue("@Audi_Ip", ip);           
                // Acción que se va a realizar: I = Insertar, A = Actualizar, E = Eliminar
                comando.Parameters.AddWithValue("@Audi_Accion", accion);

                await comando.ExecuteNonQueryAsync(); 
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                throw new Exception("Error al registrar la auditoría.", ex);
            }
        }

        public async Task RegistrarAuditoriaConTransaccionAsync(string usuario,string accion,string nombretabla,string ip,int id,SqlConnection conexion,SqlTransaction transaccion)
        {
            try
            {
                // Configuración del comando SQL
                await using var comando = new SqlCommand("USP_Auditoria_INS", conexion, transaccion)
                {
                    CommandType = CommandType.StoredProcedure,
                    CommandTimeout = 60 // Establece un tiempo de espera razonable
                };

                // Parámetros del procedimiento almacenado
                comando.Parameters.AddWithValue("@ID", id);
                comando.Parameters.AddWithValue("@NombreTabla", nombretabla);
                comando.Parameters.AddWithValue("@Audi_Usuario", usuario);
                comando.Parameters.AddWithValue("@Audi_Ip", ip);
                comando.Parameters.AddWithValue("@Audi_Accion", accion);

                // Ejecutar el comando dentro de la misma transacción
                await comando.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                // Manejo de excepciones para la auditoría
                throw new Exception("Error al registrar la auditoría dentro de la transacción.", ex);
            }
        }

    }
}
