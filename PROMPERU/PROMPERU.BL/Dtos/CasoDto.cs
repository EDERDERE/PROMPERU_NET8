using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class CasoDto
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public int orden { get; set; }
        public string titulo { get; set; }
        public string urlVideo { get; set; }
        public string tituloVideo { get; set; }
        public string nombreBoton { get; set; }
        public string urlBoton { get; set; }
        public string description { get; set; }
        public string urlIcon { get; set; }
        public string urlPerfil { get; set; }
        public string urlCabecera { get; set; }

    }   
}
