namespace PROMPERU.BE
{
    public class PreguntaBE
    {
        public int ID { get; set; }
        public int NumeroPregunta { get; set; }
        public int ID_PortalTest { get; set; }
        public string TextoPregunta { get; set; }
        public bool EsComputable { get; set; } // 1=Computable, 0=No Computable
        public char TipoPregunta { get; set; } // 'S' = Selección Única, 'M' = Múltiple, 'T' = Texto
        public string Titulo { get; set; }
        public string Titulo2 { get; set; }
        public string Descripcion { get; set; }
        public string Descripcion2 { get; set; }
    }
}
