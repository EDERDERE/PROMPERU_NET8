using Microsoft.AspNetCore.Mvc;
using PROMPERU.BL;
using PROMPERU.BL.Dtos;
using ServiceExterno;

namespace PROMPERU.FrontOffice.WEB.Controllers
{  
    public class ContactoController : Controller
    {
        private readonly EmailService _emailService;
        private readonly ContactoBL _contactoBL;

        public ContactoController(EmailService emailService, ContactoBL contactoBL)
        {
            _emailService = emailService;
            _contactoBL = contactoBL;
        }

        [HttpPost]
        [Route("Contacto/Guardar")]
        public async Task<IActionResult> GuardarContacto([FromBody] ContactoDto contacto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool resultado = await _contactoBL.ProcesarContactoAsync(contacto);
            if (resultado)
            {
                return Ok(new { message = "Contacto guardado y correo enviado." });
            }
            return StatusCode(500, "Error al procesar el contacto.");
        }
       
    }
}
