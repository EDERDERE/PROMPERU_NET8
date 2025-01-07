using PROMPERU.BE;
using PROMPERU.DA;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class UsuarioBL
    {
        private readonly UsuarioDA _usuarioDA;

        public UsuarioBL(UsuarioDA usuarioDA)
        {
            _usuarioDA = usuarioDA;
        }

        public async Task<UsuarioBE?> ValidarUsuarioAsync(string usuario, string contrasenia)
        {
            // Obtener el usuario desde la base de datos
            var usuarioBD = await _usuarioDA.ValidarUsuarioAsync(usuario);

            if (usuarioBD == null)
                return null;

            // Comparar la contraseña proporcionada con la almacenada (hash)
            if (VerificarContraseña(contrasenia, usuarioBD.Usua_Contrasenia))
            {
                return usuarioBD;
            }

            return null;
        }

        // Método para encriptar la contraseña usando SHA256
        private string EncriptarContraseña(string contrasenia)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // Computa el hash de la contraseña
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(contrasenia));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString(); // Retorna el hash en formato hexadecimal
            }
        }

        // Verifica si la contraseña proporcionada coincide con la almacenada
        private bool VerificarContraseña(string contrasenia, string contraseniaHash)
        {
            var contraseniaEncriptada = EncriptarContraseña(contrasenia);
            return contraseniaEncriptada == contraseniaHash;
        }
    }
}
