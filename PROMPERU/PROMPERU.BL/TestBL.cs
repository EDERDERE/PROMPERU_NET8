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

        public async Task<TestModelDto> crearTestAsync(RequisitoBE requisito, string usuario, string ip)
        {
            try
            {
                var testModel = new TestModelDto();
                //return await _requisitoDA.InsertarRequisitoAsync(requisito, usuario, ip);
                return testModel;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Requisito", ex);
            }
        }

        public async Task<bool> ActualizarRequisitoAsync(RequisitoBE requisito, string usuario, string ip, int id)
        {
            try
            {
                //return await _requisitoDA.ActualizarRequisitoAsync(requisito, usuario, ip, id) > 0;

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Requisito", ex);
            }
        }
    }
}
