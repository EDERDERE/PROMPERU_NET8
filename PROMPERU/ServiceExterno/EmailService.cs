using System;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace ServiceExterno
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task EnviarCorreoAsync(string mensaje, string tipoCorreo)
        {
            try
            {
                var smtpSettings = _config.GetSection("SmtpSettings");
                string destinatario = smtpSettings["Destinatario"];
                string asunto = ObtenerAsunto(tipoCorreo); // Asunto dinámico según tipo

                // Validar configuración SMTP
                if (smtpSettings == null)
                    throw new Exception("No se encontró la configuración de SMTP en appsettings.json");
              

                // Validar destinatario
                if (string.IsNullOrWhiteSpace(destinatario))
                    throw new ArgumentException("El destinatario del correo no puede estar vacío.", nameof(destinatario));

                using (var client = new SmtpClient(smtpSettings["Host"], int.Parse(smtpSettings["Port"])))
                {
                    client.Credentials = new NetworkCredential(smtpSettings["User"], smtpSettings["Password"]);
                    client.EnableSsl = bool.Parse(smtpSettings["EnableSsl"]);

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(smtpSettings["User"]),
                        Subject = asunto,
                        Body = mensaje, // Mensaje en formato HTML
                        IsBodyHtml = true // Permitir formato HTML
                    };

                    mailMessage.To.Add(destinatario);

                    await client.SendMailAsync(mailMessage);
                }
            }
            catch (SmtpException smtpEx)
            {
                // Error específico de SMTP
                Console.WriteLine($"Error de SMTP: {smtpEx.Message}");
                throw new Exception("Error al enviar el correo: " + smtpEx.Message, smtpEx);
            }
            catch (FormatException formatEx)
            {
                // Error de formato en los datos
                Console.WriteLine($"Error de formato: {formatEx.Message}");
                throw new Exception("Error en el formato de la configuración de correo.", formatEx);
            }
            catch (Exception ex)
            {
                // Cualquier otro error
                Console.WriteLine($"Error general: {ex.Message}");
                throw new Exception("Ocurrió un error inesperado al enviar el correo.", ex);
            }
        }
        private string ObtenerAsunto(string tipo)
        {
            var smtpSettings = _config.GetSection("SmtpSettings:Asuntos");

            return tipo switch
            {
                "Contacto" => smtpSettings["Contacto"] ?? "Nuevo Contacto Registrado",
                "Test" => smtpSettings["Test"] ?? "Nueva Empresa Registrada",
                _ => smtpSettings["Otro"] ?? "Nuevo Registro en la Plataforma"
            };
        }

    }
}
