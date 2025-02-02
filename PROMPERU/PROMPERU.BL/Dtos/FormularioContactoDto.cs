using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class FormularioContactoDto
    {
        public int id { get; set; }
        public string titulo { get; set; }
        public string descripcion { get; set; }
        public string urlImagen { get; set; }
        public string subTitulo { get; set; }
        public string descripcionSubTitulo { get; set; }
        public string direccion { get; set; }
        public string subTituloDos { get; set; }
        public string correo { get; set; }
        public string telefono { get; set; }
        public string horario { get; set; }
        public string tituloSeccion { get; set; }
        public string urlPoliticas { get; set; }
        public string nombreBoton { get; set; }
        public string urlIconBoton { get; set; }
        public string nombreBotonDos { get; set; }
        public string urlIconBotonDos { get; set; }

    }   
}
