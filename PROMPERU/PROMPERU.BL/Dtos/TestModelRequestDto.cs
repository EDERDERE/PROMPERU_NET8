using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
  
    public class TestModelRequestDto
    {
        public List<Step> Steps { get; set; }
        public ActiveTest ActiveTest { get; set; }
        public Evaluated? CompanyData { get; set; }
        public Registration? Registration { get; set; }
        public TitularRepresentative? TitularRepresentative { get; set; }
    }

    public class SelectAnswer
    {
        public int? ID { get; set; }
        public string? Input { get; set; }
        public int? Rsel_ID { get; set; }
        
    }



    public class ActiveTest
    {
        public TestType TestType { get; set; }
        public List<Elements>? Elements { get; set; }
        public bool HasInstructions { get; set; } = false; // Por defecto en false
        public Instructions? Instructions { get; set; }
    }
       

    public class Registration
    {
        public string FullName { get; set; } // Nombres y Apellidos
        public string TypeDocument { get; set; } // Tipo de Documento
        public string DocumentNumber { get; set; } // Nymero de documento
        public string? RegistrationNumber { get; set; } // Partida Registral N°
        public string EntryNumber { get; set; } // Asiento N°
        public string City { get; set; } // Ciudad (Oficina Registral)

        // Información de domicilio
       public Home? Home { get; set; }
    }

    public class Home    {

        public string? Address { get; set; } // Av./Calle/Psje./Jr.
        public string District { get; set; } // Distrito
        public string Urbanization { get; set; } // Urbanización
        public string PostalCode { get; set; } // Código postal
    }

    public class LegalRepresentative 
    {
        public string FullName { get; set; } // Nombres y Apellidos
        public string Gender { get; set; } // Sexo
        public string TypeDocument { get; set; } // Tipo de Documento
        public string DocumentNumber { get; set; } // Nymero de documento
        public string? RegistrationNumber { get; set; } // Partida Registral N°
        public string EntryNumber { get; set; } // Asiento N°
        public string City { get; set; } // Ciudad (Oficina Registral)

    }

    public class TitularRepresentative
    {
        public int? ID { get; set; }
        public string FullName { get; set; } // Nombres y Apellidos
        public string Gender { get; set; } // Sexo
        public int Age { get; set; } // Edad
        public string EducationLevel { get; set; } // Grado de instrucción
        public string RepresentativePosition { get; set; } // Cargo del representante
        public string RepresentativePhone { get; set; } // Celular del representante
                                                        
        // Lista de Representantes Adicionales
        public List<AdditionalRepresentative>? AdditionalRepresentatives { get; set; }
    }

    public class AdditionalRepresentative
    {
        public int? ID { get; set; }
        public string FullName { get; set; } // Nombre y Apellidos
        public string Email { get; set; } // Correo electrónico
        public string PhoneNumber { get; set; } // Número de celular
    }

}
