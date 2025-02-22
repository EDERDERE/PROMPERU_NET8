using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;
using System.Diagnostics.Contracts;

namespace PROMPERU.DA
{
    public class ContactoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;    

        public ContactoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        // Inserta un nuevo Contacto y devuelve la fila creada
        public async Task<int> InsertarContactoAsync(ContactoBE contacto)
        {
            try
            {
                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_Contacto_INS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                comando.CommandType = System.Data.CommandType.StoredProcedure;
                comando.Parameters.AddWithValue("@Nombre", contacto.Nombre);
                comando.Parameters.AddWithValue("@Apellido", contacto.Apellido);
                comando.Parameters.AddWithValue("@CorreoElectronico", contacto.CorreoElectronico);
                comando.Parameters.AddWithValue("@Celular", contacto.Celular);
                comando.Parameters.AddWithValue("@RUC", contacto.RUC);
                comando.Parameters.AddWithValue("@IdTipoEmpresa", contacto.IdTipoEmpresa);
                comando.Parameters.AddWithValue("@IdRegion", contacto.IdRegion);
                comando.Parameters.AddWithValue("@Mensaje", contacto.Mensaje);   
                
                var outNuevoID = new SqlParameter("@NuevoID", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                comando.Parameters.Add(outNuevoID);

                await comando.ExecuteNonQueryAsync();

                int nuevoID = (int)outNuevoID.Value;

                return nuevoID;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al insertar el Contacto", ex);
            }
        }

      
    }
}
