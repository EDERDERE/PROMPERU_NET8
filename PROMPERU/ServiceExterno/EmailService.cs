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

        public async Task EnviarCorreoAsync(string mensaje, string tipoCorreo, byte[]? archivoAdjunto = null, string? destinatarioExtra = null)
        {
            try
            {
                var smtpSettings = _config.GetSection("SmtpSettings");
                string destinatarioConfig = smtpSettings["Destinatario"]; // Destinatario desde configuración
                string asunto = ObtenerAsunto(tipoCorreo); // Asunto dinámico según tipo

                if (smtpSettings == null)
                    throw new Exception("No se encontró la configuración de SMTP en appsettings.json");

                if (string.IsNullOrWhiteSpace(destinatarioConfig) && string.IsNullOrWhiteSpace(destinatarioExtra))
                    throw new ArgumentException("Debe haber al menos un destinatario.", nameof(destinatarioExtra));

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

                    // Agregar destinatarios
                    if (!string.IsNullOrWhiteSpace(destinatarioConfig))
                        mailMessage.To.Add(destinatarioConfig);
                    if (!string.IsNullOrWhiteSpace(destinatarioExtra))
                        mailMessage.To.Add(destinatarioExtra);

                    // Adjuntar PDF si existe
                    if (archivoAdjunto != null && archivoAdjunto.Length > 0)
                    {
                        using (MemoryStream pdfStream = new MemoryStream(archivoAdjunto))
                        {
                            mailMessage.Attachments.Add(new Attachment(pdfStream, "ReporteCursos.pdf", "application/pdf"));
                            await client.SendMailAsync(mailMessage);
                        }
                    }
                    else
                    {
                        await client.SendMailAsync(mailMessage);
                    }
                }
            }
            catch (SmtpException smtpEx)
            {
                Console.WriteLine($"Error de SMTP: {smtpEx.Message}");
                throw new Exception("Error al enviar el correo: " + smtpEx.Message, smtpEx);
            }
            catch (FormatException formatEx)
            {
                Console.WriteLine($"Error de formato: {formatEx.Message}");
                throw new Exception("Error en el formato de la configuración de correo.", formatEx);
            }
            catch (Exception ex)
            {
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
                "Test" => smtpSettings["Test"] ?? "Test Registrado",
                _ => smtpSettings["Otro"] ?? "Nuevo Registro en la Plataforma"
            };
        }

    }
}
