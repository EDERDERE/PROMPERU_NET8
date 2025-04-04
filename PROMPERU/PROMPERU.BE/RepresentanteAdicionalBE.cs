namespace PROMPERU.BE
{
    public class RepresentanteAdicionalBE
    {
        public int Radi_ID { get; set; }  // ID del Representante Adicional
        public int Trep_ID { get; set; }  // FK al TitularRepresentante
        public string Radi_NombreCompleto { get; set; }  // Nombre Completo del Representante Adicional 
        public string Radi_CorreoElectronico { get; set; }  // Correo Electrónico
        public string Radi_NumeroCelular { get; set; }  // Número de Celular
    }

}
