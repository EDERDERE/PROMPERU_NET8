using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class EmpresaDto
    {
        public int id { get; set; }
        public int orden { get; set; }
        public string nombreEmpresa { get; set; }
        public string urlImagen { get; set; }
        public string descripcion { get; set; }
        public string titulo { get; set; }
        public string nombreBoton { get; set; }
        public string urlBoton { get; set; }
        public string correo { get; set; }
        public string paginaWeb { get; set; }
        public string urlLogo { get; set; }
        public string mercados { get; set; }
        public string rUC { get; set; }
        public string razonSocial { get; set; }
        public string certificaciones { get; set; }
        public string tipoEmpresa { get; set; }
        public string region { get; set; }
        public string redesSociales { get; set; }
        public string redesSocialesDos { get; set; }
        public string redesSocialesTres { get; set; }
        public string redesSocialesCuatro { get; set; }
        public string direccion { get; set; }
        public int id_region { get; set; }
        public int id_tipoempresa { get; set; }
        public int id_provincia { get; set; }
        public int id_distrito { get; set; }
        public string celular { get; set; }
        public string celularDos { get; set; }

    }
}
