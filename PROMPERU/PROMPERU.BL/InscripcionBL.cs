using PROMPERU.BE;
using PROMPERU.BL.Dtos;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class InscripcionBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly InscripcionDA _inscripcionDA;

        // Constructor con inyección de dependencias
        public InscripcionBL(InscripcionDA inscripcionDA)
        {
            _inscripcionDA = inscripcionDA ?? throw new ArgumentNullException(nameof(InscripcionDA));
        }

        public async Task<InscripcionBE> InsertarInscripcionAsync(InscripcionBE inscripcion, string usuario, string ip)
        {
            try
            {
                return await _inscripcionDA.InsertarInscripcionAsync(inscripcion, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Inscripcion", ex);
            }
        }

        public async Task<bool> ActualizarInscripcionAsync(InscripcionBE inscripcion, string usuario, string ip, int id)
        {
            try
            {
                return await _inscripcionDA.ActualizarInscripcionAsync(inscripcion, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Inscripcion", ex);
            }
        }

        public async Task<bool> EliminarInscripcionAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _inscripcionDA.EliminarInscripcionAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Inscripcion", ex);
            }
        }

        //public async Task<InscripcionBE> ObtenerInscripcionAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _InscripcionDA.ObtenerInscripcionPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Inscripcion", ex);
        //    }
        //}

        public async Task<List<InscripcionBE>> ListarInscripcionsAsync()
        {
            try
            {
                return await _inscripcionDA.ListarInscripcionsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Inscripcions", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteInscripcionsAsync()
        //{
        //    try
        //    {
        //        return await _InscripcionDA.ObtenerReporteInscripcionsAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Inscripcions", ex);
        //    }
        //}

        public async Task<List<EtapaDto>> ListarEtapasInscripcionAsync()
        {
            try
            {                               
                var inscripcion = await _inscripcionDA.ListarInscripcionsAsync();
                var etapa = inscripcion.Where(x=>x.Insc_Orden > 0).Select(e => new EtapaDto
                {
                   id = e.Insc_ID,
                   paso = e.Insc_Paso,
                   nombreIcono = e.Insc_TituloPaso,
                   urIcono      = e.Insc_URLImagen
                }).ToList();

                return etapa;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Inscripcions", ex);
            }
        }
    }
}
