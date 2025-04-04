using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Utilities
{
    public static class EtapasConstants
    {
        public const int TesDiagnostico = 2;
        public const int TesInscripcionPrograma = 3;
        public const int TesInscripcionCurso = 4;
        public const int TesSalida = 5;

    }

    public static class EstadoCurso
    {
        public const string Aprobado = "APROBADO";
        public const string Desaprobado = "PENDIENTE";

    }
    public static class EstadoEtapaTest
    {
        public const string Terminado = "COMPLETADO";
        public const string EnProceso = "PENDIENTE";
    }
}
