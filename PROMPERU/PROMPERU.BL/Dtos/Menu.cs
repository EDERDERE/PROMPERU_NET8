using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class MenuDto
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string urlIconBoton { get; set; }
        public int orden { get; set; }
    }   
}
