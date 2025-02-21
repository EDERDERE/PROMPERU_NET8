using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class TestimonioDto
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public string urlIcon { get; set; }
        public string urlImagen { get; set; } 
        public string empresa { get; set; }

    }   
}
