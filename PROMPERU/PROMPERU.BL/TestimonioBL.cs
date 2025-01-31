using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class TestimonioBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly TestimonioDA _testimonioDA;

        // Constructor con inyección de dependencias
        public TestimonioBL(TestimonioDA testimonioDA)
        {
            _testimonioDA = testimonioDA ?? throw new ArgumentNullException(nameof(TestimonioDA));
        }

        public async Task<TestimonioBE> InsertarTestimonioAsync(TestimonioBE testimonio, string usuario, string ip)
        {
            try
            {
                return await _testimonioDA.InsertarTestimonioAsync(testimonio, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Testimonio", ex);
            }
        }

        public async Task<bool> ActualizarTestimonioAsync(TestimonioBE testimonio, string usuario, string ip, int id)
        {
            try
            {
                return await _testimonioDA.ActualizarTestimonioAsync(testimonio, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Testimonio", ex);
            }
        }

        public async Task<bool> EliminarTestimonioAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _testimonioDA.EliminarTestimonioAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Testimonio", ex);
            }
        }

        //public async Task<TestimonioBE> ObtenerTestimonioAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _TestimonioDA.ObtenerTestimonioPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Testimonio", ex);
        //    }
        //}

        public async Task<List<TestimonioBE>> ListarTestimoniosAsync()
        {
            try
            {
                return await _testimonioDA.ListarTestimoniosAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Testimonios", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteTestimoniosAsync()
        //{
        //    try
        //    {
        //        return await _TestimonioDA.ObtenerReporteTestimoniosAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Testimonios", ex);
        //    }
        //}
    }
}
