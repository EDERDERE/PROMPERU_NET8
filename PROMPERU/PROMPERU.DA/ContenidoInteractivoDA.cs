using Microsoft.Data.SqlClient;
using PROMPERU.BE;
using PROMPERU.DB;
using System.Data;

namespace PROMPERU.DA
{
    public class ContenidoInteractivoDA
    {
        private readonly ConexionDB _conexionDB;
        private readonly AuditoriaDA _auditoriaDA;

        public ContenidoInteractivoDA(ConexionDB conexionDB,AuditoriaDA auditoriaDA)
        {
            _conexionDB = conexionDB;
            _auditoriaDA = auditoriaDA;
        }

        public async Task<List<ContenidoInteractivoBE>> ListarContenidoInteractivosAsync()
        {
            try
            {
                var contenidoInteractivos = new List<ContenidoInteractivoBE>();

                await using var conexion = await _conexionDB.ObtenerConexionAsync();
                await using var comando = new SqlCommand("USP_ContenidoInteractivo_LIS", conexion)
                {
                    CommandType = CommandType.StoredProcedure
                };

                await using var reader = await comando.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    contenidoInteractivos.Add(new ContenidoInteractivoBE
                    {
                        Cint_Id = reader["Cint_ID"] != DBNull.Value ? Convert.ToInt32(reader["Cint_ID"]) : 0,
                        Cint_Titulo = reader["Cint_Titulo"] != DBNull.Value ? reader["Cint_Titulo"].ToString() : "",
                        Cint_Subtitulo = reader["Cint_Subtitulo"] != DBNull.Value ? reader["Cint_Subtitulo"].ToString() : "",

                        Cint_NombreBotonPrincipal = reader["Cint_NombreBotonPrincipal"] != DBNull.Value ? reader["Cint_NombreBotonPrincipal"].ToString() : "",
                        Cint_UrlIconoBotonPrincipal = reader["Cint_UrlIconoBotonPrincipal"] != DBNull.Value ? reader["Cint_UrlIconoBotonPrincipal"].ToString() : "",

                        Cint_NombreBotonSecundario = reader["Cint_NombreBotonSecundario"] != DBNull.Value ? reader["Cint_NombreBotonSecundario"].ToString() : "",
                        Cint_UrlIconoBotonSecundario = reader["Cint_UrlIconoBotonSecundario"] != DBNull.Value ? reader["Cint_UrlIconoBotonSecundario"].ToString() : "",

                        Cint_NombreBotonTerciario = reader["Cint_NombreBotonTerciario"] != DBNull.Value ? reader["Cint_NombreBotonTerciario"].ToString() : "",
                        Cint_UrlIconoBotonTerciario = reader["Cint_UrlIconoBotonTerciario"] != DBNull.Value ? reader["Cint_UrlIconoBotonTerciario"].ToString() : ""
                    });
                }

                return contenidoInteractivos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar los ContenidoInteractivos", ex);
            }
        }

    }
}
