using PROMPERU.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class ContactoDto
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string CorreoElectronico { get; set; }
        public string Celular { get; set; }
        public string RUC { get; set; }
        public string TipoEmpresa { get; set; }
        public string Region { get; set; }
        public string Mensaje { get; set; }
    }

}
