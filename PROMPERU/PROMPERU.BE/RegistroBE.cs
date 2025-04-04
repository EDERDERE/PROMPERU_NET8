namespace PROMPERU.BE
{
    public class RegistroBE
    {
        public int Regi_ID { get; set; }  // Registro ID
        public int Domi_ID { get; set; }  // Domicilio ID (FK)
        public string Regi_NumeroPartida { get; set; }  // Número de Partida Registral
        public string Regi_NumeroAsiento { get; set; }  // Número de Asiento
        public string Regi_Ciudad { get; set; }  // Ciudad
    }

}
