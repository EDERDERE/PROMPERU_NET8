using Microsoft.Data.SqlClient;
using System.Data;

namespace PROMPERU.DB
{
    public class ConexionDB
    {
        private readonly string _cadenaConexion;

        public ConexionDB(string cadenaConexion)
        {
            _cadenaConexion = cadenaConexion;
        }

        public async Task<SqlConnection> ObtenerConexionAsync()
        {
            var conexion = new SqlConnection(_cadenaConexion);
            if (conexion.State == ConnectionState.Closed)
            {
                await conexion.OpenAsync();
            }
            return conexion;
        }
    }
}
