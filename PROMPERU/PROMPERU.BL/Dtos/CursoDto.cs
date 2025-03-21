﻿using PROMPERU.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class CursoDto
    {
        public int id { get; set; }
        public int orden { get; set; }
        public string titulo { get; set; }
        public string tituloSeccion { get; set; }
        public string nombreBotonTitulo { get; set; }
        public string urlIconBoton { get; set; }
        public string nombreCurso { get; set; }
        public string codigoCurso { get; set; }
        public string objetivo { get; set; }
        public string description { get; set; }
        public string modalidad { get; set; }
        public int duracionHoras { get; set; }
        public DateTime fechaInicio { get; set; }
        public DateTime fechaFin { get; set; }
        public string nombreBoton { get; set; }
        public string urlIcon { get; set; }
        public string urlImagen { get; set; }
        public string linkBoton { get; set; }
        public int esHabilitado { get; set; }
        public string tituloCalendario { get; set; }
        public int id_evento { get; set; }
        public int id_modalidad { get; set; }
        public string descriptionCalendario { get; set; }
        public List<TipoModalidadBE> ModalidadList { get; set; }
    }   

}
