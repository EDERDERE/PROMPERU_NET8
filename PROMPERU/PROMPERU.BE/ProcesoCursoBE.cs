namespace PROMPERU.BE
{
    public class ProcesoCursoBE
    {
        public int? ID { get; set; }
        public string Eval_RUC { get; set; }
        public int Insc_ID { get; set; }
        public int Curs_ID { get; set; }
        public string Curs_CodigoCurso { get; set; }
        public string Curs_NombreCurso { get; set; }        
        public string Curs_LinkBoton { get; set; }
        public string TipoEvento { get; set; }
        public DateTime? Cmod_FechaInicio { get; set; }
        public DateTime? Cmod_FechaFin { get; set; }         
        public decimal Ceva_PuntajeIndividual { get; set; }
        public decimal Ceva_PuntajeGlobal { get; set; }
        public string Ceva_Estado { get; set; }

    }
}
