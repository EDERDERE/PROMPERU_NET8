namespace PROMPERU.BE
{
    public class CursoBE
    {
        public int Curs_ID { get; set; }  
        public int Curs_Orden { get; set; }
        public string Curs_Titulo { get; set; }
        public string Curs_TituloSeccion { get; set; }
        public string Curs_NombreBotonTitulo { get; set; }
        public string Curs_UrlIconBoton { get; set; }
        public string Curs_NombreCurso { get; set; }
        public string Curs_CodigoCurso { get; set; }
        public string Curs_Objetivo { get; set; }
        public string Curs_Descripcion { get; set; }
        public string Curs_Modalidad { get; set; }       
        public int Curs_DuracionHoras { get; set; }
        public DateTime? Curs_FechaInicio { get; set; }
        public DateTime? Curs_FechaFin { get; set; }
        public string Curs_NombreBoton { get; set; }
        public string Curs_UrlIcon { get; set; }
        public string Curs_UrlImagen { get; set; }
        public string Curs_LinkBoton { get; set; }
        public int Curs_EsHabilitado { get; set; }
        public string Curs_Evento { get; set; }
        public int Teve_ID { get; set; }
        public int Tmod_ID { get; set; }
        public string Curs_TituloCalendario { get; set; }
        public string Curs_DescripcionCalendario { get; set; }
        public List<TipoModalidadBE> TipoModalidadList { get; set; }
     
    }
}
