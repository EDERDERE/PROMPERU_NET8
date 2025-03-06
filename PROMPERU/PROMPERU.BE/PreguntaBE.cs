namespace PROMPERU.BE
{
    public class PreguntaBE
    {
        public int ID { get; set; }
        public int Preg_NumeroPregunta { get; set; }
        public int Insc_ID { get; set; }
        public string Preg_TextoPregunta { get; set; }
        public bool? Preg_EsComputable { get; set; } // 1=Computable, 0=No Computable
        public string Preg_TipoRespuesta { get; set; } // 'S' = Selección Única, 'M' = Múltiple, 'T' = Texto
        public string Preg_Categoria { get; set; }
        public int Curs_ID { get; set; }
        public string Curs_Nombre_Curso { get; set; }
    }
}
