namespace PROMPERU.BE
{
    public class UbigeoBE
    {
        public class Region
        {
            public int Regi_ID { get; set; }
            public string Regi_Ubigeo { get; set; }
            public string Regi_Nombre { get; set; }
            public List<Provincia> Provincias { get; set; }

            public Region()
            {
                Provincias = new List<Provincia>();
            }
        }

        public class Provincia
        {
            public int Prov_ID { get; set; }
            public string Prov_Ubigeo { get; set; }
            public string Prov_Nombre { get; set; }
            public int Regi_ID { get; set; } // Relación con la Región
            public List<Distrito> Distritos { get; set; }

            public Provincia()
            {
                Distritos = new List<Distrito>();
            }
        }

        public class Distrito
        {
            public int Dist_ID { get; set; }
            public string Dist_Ubigeo { get; set; }
            public string Dist_Nombre { get; set; }
            public int Prov_ID { get; set; } // 
        }

    }
}
