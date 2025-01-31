using PROMPERU.BE;
using PROMPERU.DA;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace PROMPERU.BL
{
    public class MenuBL
    {
        //private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly MenuDA _menuDA;

        // Constructor con inyección de dependencias
        public MenuBL(MenuDA menuDA)
        {
            _menuDA = menuDA ?? throw new ArgumentNullException(nameof(MenuDA));
        }

        public async Task<MenuBE> InsertarMenuAsync(MenuBE menu, string usuario, string ip)
        {
            try
            {
                return await _menuDA.InsertarMenuAsync(menu, usuario, ip);
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al insertar el Menu", ex);
            }
        }

        public async Task<bool> ActualizarMenuAsync(MenuBE Menu, string usuario, string ip, int id)
        {
            try
            {
                return await _menuDA.ActualizarMenuAsync(Menu, usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al actualizar el Menu", ex);
            }
        }

        public async Task<bool> EliminarMenuAsync(string usuario, string ip, int id)
        {
            try
            {
                return await _menuDA.EliminarMenuAsync(usuario, ip, id) > 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al eliminar el Menu", ex);
            }
        }

        //public async Task<MenuBE> ObtenerMenuAsync(int bannID)
        //{
        //    try
        //    {
        //        return await _MenuDA.ObtenerMenuPorIDAsync(bannID);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al obtener el Menu", ex);
        //    }
        //}

        public async Task<List<MenuBE>> ListarMenusAsync()
        {
            try
            {
                return await _menuDA.ListarMenusAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error en la lógica de negocio al listar los Menus", ex);
            }
        }

        //public async Task<DataTable> ObtenerReporteMenusAsync()
        //{
        //    try
        //    {
        //        return await _MenuDA.ObtenerReporteMenusAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Error en la lógica de negocio al generar el reporte de los Menus", ex);
        //    }
        //}
    }
}
