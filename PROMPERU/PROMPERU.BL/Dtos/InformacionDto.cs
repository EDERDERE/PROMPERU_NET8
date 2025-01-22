using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class InformacionDto
    {
        public int id { get; set; }
        public string titulo { get; set; }
        public string tituloSeccion { get; set; }
        public string description { get; set; }
        public string urlPortada { get; set; }
        public string urlVideo { get; set; }
    }   
}
