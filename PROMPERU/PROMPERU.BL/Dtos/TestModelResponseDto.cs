﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.ExtendedProperties;

namespace PROMPERU.BL.Dtos
{
    public class TestModelResponseDto
    {
        public List<Step> Steps { get; set; }
        public ActiveTest? ActiveTest { get; set; }
        public Evaluated? CompanyData { get; set; }
        public Registration? Registration { get; set; }
        public TitularRepresentative? TitularRepresentative { get; set; }
    }

    public class Step
    {
        public int Id { get; set; }
        public int StepNumber { get; set; }
        public string IconName { get; set; }
        public string IconUrl { get; set; }
        public bool Current { get; set; }
        public bool IsComplete { get; set; }
        public bool isApproved { get; set; }

    }
    public class Evaluated
    {
        public int? ID { get; set; }
        public string LegalName { get; set; } // Razón Social
        public string FullName { get; set; } // Nombres y Apellidos
        public string TradeName { get; set; } // Nombre Comercial
        public string Ruc { get; set; } // RUC
        public string Region { get; set; } // Región
        public string Province { get; set; } // Provincia
        public string Phone { get; set; } // Teléfono
        public string Email { get; set; } // Correo Electrónico
        public string Address { get; set; } // Dirección FIscal
        public DateTime? StartDate { get; set; } // Fecha de inicio de actividades
        public string LegalEntityType { get; set; } // Tipo de Personería
        public string CompanyType { get; set; } // Tipo de Empresa
        public string TourismServiceProviderType { get; set; } // Tipo de prestador de servicios turísticos
        public string BusinessActivity { get; set; } // Objeto social / Actividad económica
        public string Landline { get; set; } // Teléfono fijo
        public string Website { get; set; } // Página web
        public string TourismBusinessType { get; set; } // Tipo de empresa turística
        public string LodgingCategory { get; set; } // Categoría y/o clasificación del establecimiento de hospedaje     
        public string? RegistrationNumber { get; set; } // Partida Registral N°
        public string EntryNumber { get; set; } // Asiento N°
        public string City { get; set; } // Ciudad (Oficina Registral)       
        public string District { get; set; } // Distrito
        public string Urbanization { get; set; } // Urbanización
        public string PostalCode { get; set; } // Código postal
    }
    public class TestResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Test { get; set; }
        public Dictionary<string, bool> Validations { get; set; } = new();
    }
    
    public class ResponseTestDiagnosticoInicialDto
    {
        public decimal DisapprovedCoursesCount { get; set; }
        public decimal ApprovedCoursesCount { get; set; }
        public decimal CoursesCount { get; set; }
        public IEnumerable<CoursesScore> ApprovedCourses { get; set; }
        public IEnumerable<CoursesScore> DisapprovedCourses { get; set; }
        public decimal GlobalScore { get; set; }

    }

    public class ResponseTestInscripcionProgramaDto
    {       
        public Evaluated CompanyData { get; set; }
        public  LegalRepresentative LegalRepresentative { get; set; }      

    }

    public class ResponseTestInscripcionCursoDto
    {
        public ProcesoCursoDto ProcesoCurso { get; set; }

    }
    public class ResponseTestDiagnosticoSalidaDto
    {
        public CoursesScore TesInicial { get; set; }
        public CoursesScore TestFinal { get; set; }
    }


    public class CoursesScore
    {
        public string CourseName { get; set; }
        public decimal IndividualScore { get; set; }
        public decimal GlobalScore { get; set; }
        public string CourseStatus { get; set; }
    }      
}