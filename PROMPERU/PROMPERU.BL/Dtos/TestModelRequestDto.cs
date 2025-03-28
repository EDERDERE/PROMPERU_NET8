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
        public GeneralData? CompanyData { get; set; }
        public Registration? Registration { get; set; }
        public TitularRepresentative? TitularRepresentative { get; set; }
    }

    public class SelectAnswer
    {
        public string? Input { get; set; }
        public int? Id { get; set; }
    }

  

    public class ActiveTest
    {
        public TestType TestType { get; set; }
        public List<Element>? Elements { get; set; }
    }

    public class Element
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Type { get; set; }
        public string QuestionText { get; set; }
        public bool? IsComputable { get; set; }
        public string Label { get; set; }
        public string Category { get; set; }
        public string AnswerType { get; set; }
        public List<Answer> Answers { get; set; }
        public List<SelectAnswer> SelectAnswers { get; set; }
        public Course Course { get; set; }        
    }

    public class GeneralData
    {
        public int? ID { get; set; }
        public string LegalName { get; set; } // Razón Social
        public string FullName { get; set; } // Nombres y Apellidos
        public string TradeName { get; set; } // Nombre Comercial
        public string Ruc { get; set; } // RUC
        public string Region { get; set; } // Región
        public string Province { get; set; } // Provincia
        public string PhoneNumber { get; set; } // Teléfono
        public string Email { get; set; } // Correo Electrónico
        public DateTime? StartDate { get; set; } // Fecha de inicio de actividades
        public string LegalEntityType { get; set; } // Tipo de Personería
        public string CompanyType { get; set; } // Tipo de Empresa
        public string TourismServiceProviderType { get; set; } // Tipo de prestador de servicios turísticos
        public string BusinessActivity { get; set; } // Objeto social / Actividad económica
        public string Landline { get; set; } // Teléfono fijo
        public string Website { get; set; } // Página web
        public string TourismBusinessType { get; set; } // Tipo de empresa turística
        public string LodgingCategory { get; set; } // Categoría y/o clasificación del establecimiento de hospedaje     
    }
    public class Registration
    {
        // Información de inscripción
        public string RegistrationNumber { get; set; } // Partida Registral N°
        public string EntryNumber { get; set; } // Asiento N°
        public string City { get; set; } // Ciudad (Oficina Registral)

        // Información de domicilio
       public Home? Home { get; set; }
    }

    public class Home
    {
        public string Address { get; set; } // Av./Calle/Psje./Jr.
        public string District { get; set; } // Distrito
        public string Urbanization { get; set; } // Urbanización
        public string PostalCode { get; set; } // Código postal
    }

    public class TitularRepresentative
    {
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
        public string FullName { get; set; } // Nombre y Apellidos
        public string Email { get; set; } // Correo electrónico
        public string PhoneNumber { get; set; } // Número de celular
    }

}
