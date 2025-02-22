using PROMPERU.BE;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;
using ServiceExterno;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class ContactoBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly ContactoDA _contactoDA;
        private readonly EmailService _emailService;

        // Constructor con inyección de dependencias
        public ContactoBL(ContactoDA contactoDA,EmailService emailService)
        {
            _contactoDA = contactoDA ?? throw new ArgumentNullException(nameof(ContactoDA));
            _emailService = emailService;
        }

        public async Task<bool> ProcesarContactoAsync(ContactoDto contacto)
        {
            var contactoBE =  new ContactoBE
            {
                Nombre = contacto.Nombre,
                Apellido = contacto.Apellido,
                CorreoElectronico = contacto.CorreoElectronico,
                Celular = contacto.Celular,
                RUC = contacto.RUC,
                TipoEmpresa = contacto.TipoEmpresa,
                Region = contacto.Region,
                Mensaje = contacto.Mensaje
            };

            int filasAfectadas = await _contactoDA.InsertarContactoAsync(contactoBE);
            if (filasAfectadas > 0)
            {
                //string mensaje = $"Nuevo contacto registrado:\n\nNombre: {contacto.Nombre} {contacto.Apellido}\nCorreo: {contacto.CorreoElectronico}\nMensaje: {contacto.Mensaje}";
             
                await _emailService.EnviarCorreoAsync(GenerarMensajeCorreo(contacto), "Contacto");
                return true;
            }
            return false;
        }

        public string GenerarMensajeCorreo(ContactoDto contacto)
        {
            return $@"
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }}
            .container {{
                max-width: 600px;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px #ccc;
            }}
            h2 {{
                color: #007bff;
                text-align: center;
            }}
            .info {{
                font-size: 16px;
                color: #333;
                margin-bottom: 10px;
            }}
            .highlight {{
                font-weight: bold;
                color: #555;
            }}
            .footer {{
                margin-top: 20px;
                text-align: center;
                font-size: 14px;
                color: #777;
            }}
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Nuevo Contacto Registrado</h2>
            <p class='info'><span class='highlight'>Nombre:</span> {contacto.Nombre} {contacto.Apellido}</p>
            <p class='info'><span class='highlight'>Correo Electrónico:</span> {contacto.CorreoElectronico}</p>
            <p class='info'><span class='highlight'>Celular:</span> {contacto.Celular}</p>
            <p class='info'><span class='highlight'>RUC:</span> {contacto.RUC}</p>
            <p class='info'><span class='highlight'>Tipo de Empresa:</span> {contacto.TipoEmpresa}</p>
            <p class='info'><span class='highlight'>Región:</span> {contacto.Region}</p>
            <p class='info'><span class='highlight'>Mensaje:</span><br> {contacto.Mensaje}</p>
            <div class='footer'>
                <p>Este mensaje fue generado automáticamente.</p>
            </div>
        </div>
    </body>
    </html>";
        }



    }

}
