using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class UsuarioDto
    {
        public int id { get; set; }
        public string usuario { get; set; }
        public string contrasenia { get; set; }
        public string cargo { get; set; }
    }   
}
