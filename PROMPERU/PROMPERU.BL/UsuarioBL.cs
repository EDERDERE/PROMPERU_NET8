using PROMPERU.BE;
using PROMPERU.BL.Interfaces;
using PROMPERU.DA;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class UsuarioBL
    {
        private readonly UsuarioDA _usuarioDA;
        private readonly ILoggerService _logger;

        public UsuarioBL(UsuarioDA usuarioDA, ILoggerService logger)
        {
            _usuarioDA = usuarioDA;
            _logger = logger;
        }
        public async Task<int> RegistrarUsuarioAsync(UsuarioBE usuario, string cargoUsuario)
        {
            if (cargoUsuario != "Super_Admin")
                throw new UnauthorizedAccessException("Solo un Super_Admin puede crear un Admin.");

            // Validaciones básicas antes de registrar
            if (string.IsNullOrWhiteSpace(usuario.Usua_Usuario))
                throw new ArgumentException("El usuario no puede estar vacío.");

            if (string.IsNullOrWhiteSpace(usuario.Usua_Contrasenia))
                throw new ArgumentException("La contraseña no puede estar vacía.");

            if (string.IsNullOrWhiteSpace(usuario.Usua_Cargo))
                throw new ArgumentException("El cargo no puede estar vacío.");

            if (usuario.Usua_Cargo != "Admin")
                throw new ArgumentException("Solo se puede crear usuarios con el cargo de 'Admin'.");

            // Encriptar la contraseña antes de guardarla
            usuario.Usua_Contrasenia = EncriptarContraseña(usuario.Usua_Contrasenia);

            return await _usuarioDA.RegistrarUsuarioAsync(usuario);
        }
        public async Task<UsuarioBE?> ValidarUsuarioAsync(string usuario, string contrasenia)
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError("Ocurrió un error al ejecutar la acción.", ex);
                throw;
            }          

      
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

        public async Task<bool> CambiarContraseniaAsync(int usuarioId, string nuevaContrasenia, string cargoUsuario)
        {
            if (cargoUsuario != "Admin")
            {
                throw new UnauthorizedAccessException("Solo los Admin pueden cambiar su propia contraseña.");
            }

            if (usuarioId <= 0)
                throw new ArgumentException("El ID de usuario no es válido.");

            if (string.IsNullOrWhiteSpace(nuevaContrasenia))
                throw new ArgumentException("La nueva contraseña no puede estar vacía.");

            // Encriptar la nueva contraseña antes de guardarla
            string contraseniaEncriptada = EncriptarContraseña(nuevaContrasenia);

            // Llamar a la capa de datos para actualizar la contraseña
            return await _usuarioDA.CambiarContraseniaAsync(usuarioId, contraseniaEncriptada);
        }

        public async Task<List<UsuarioBE>> ListarUsuariosAsync(string cargoUsuario, int usuarioId)
        {
            // Si es Super_Admin, se pueden ver todos los usuarios sin las contraseñas
            if (cargoUsuario == "Super_Admin")
            {
                return await _usuarioDA.ListarUsuariosAsync();
            }
            else if (cargoUsuario == "Admin")
            {
                // Si es Admin, solo se muestra su propio usuario sin la contraseña
                return new List<UsuarioBE> { await _usuarioDA.ObtenerUsuarioPorIdAsync(usuarioId) };
            }
            else
            {
                throw new UnauthorizedAccessException("No tienes permisos para visualizar los usuarios.");
            }
        }

        //public async Task<bool> RestablecerContraseniaAsync(int usuarioId, string cargoUsuario)
        //{
        //    // Verifica que el Super_Admin pueda restablecer la contraseña de un Admin
        //    if (cargoUsuario != "Super_Admin")
        //    {
        //        throw new UnauthorizedAccessException("Solo el Super_Admin puede restablecer contraseñas de Admin.");
        //    }

        //    if (usuarioId <= 0)
        //        throw new ArgumentException("El ID de usuario no es válido.");

        //    return await _usuarioDA.RestablecerContraseniaAsync(usuarioId);
        //}
    }
}
