namespace PROMPERU.BE
{
        public class TipoModalidadBE
        {
            public int Tmod_ID { get; set; }
            public int Curs_ID { get; set; }        
            public string Tmod_Nombre { get; set; }
            public DateTime? FechaInicio { get; set; }
            public DateTime? FechaFin { get; set; }
        }
}
