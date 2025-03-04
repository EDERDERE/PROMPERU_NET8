using PROMPERU.BE;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using static PROMPERU.BE.TestBE;

namespace PROMPERU.BL
{
    public class TestBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly CursoDA _cursoDA;
        private readonly InscripcionDA _inscripcionDA;

        // Constructor con inyección de dependencias
        public TestBL(CursoDA cursoDA , InscripcionDA inscripcionDA )
        {
            _cursoDA = cursoDA;
            _inscripcionDA = inscripcionDA;
        }
          
        public async Task<List<TestBE>> ListarTestsAsync()
        {
            try
            {
                var listado = new List<TestBE>();

                var cursos = await _cursoDA.ListarCursosAsync();
                var inscripcions = await _inscripcionDA.ListarInscripcionsAsync();
                var etapas = inscripcions.Where(x => x.Insc_Orden > 0).Select(e => new EtapaBE
                {
                    ID = e.Insc_ID,
                    Paso = e.Insc_Paso,
                    Titulo = e.Insc_TituloPaso,
                    UrlIcono = e.Insc_URLImagen
                }).ToList();

                var test = new TestBE()
                {
                    Cursos = cursos, 
                    Etapas = etapas
                };

                listado.Add(test);

                return listado;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Tests", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteTestsAsync()
        //{
        //    try
        //    {
        //        return await _TestDA.ObtenerReporteTestsAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Tests", ex);
        //    }
        //}
    }
}
