using Microsoft.Data.SqlClient;

namespace PROMPERU.DB
{
    public class ConexionDB
    {
        private readonly string _cadenaConexion;

        public ConexionDB(string cadenaConexion)
        {
            _cadenaConexion = cadenaConexion;
        }

        public SqlConnection ObtenerConexion()
        {
            return new SqlConnection(_cadenaConexion);
        }
    }
}
