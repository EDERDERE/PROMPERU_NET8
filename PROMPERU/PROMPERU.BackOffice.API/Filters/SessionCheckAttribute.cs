using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace PROMPERU.BackOffice.API.Filters
{
    public class SessionCheckAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var usuario = context.HttpContext.Session.GetString("Usuario");

            // Excluir acciones específicas
            var controller = context.RouteData.Values["controller"]?.ToString();
            var action = context.RouteData.Values["action"]?.ToString();

            if (controller == "Login" && action == "Index")
            {
                base.OnActionExecuting(context);
                return; // No aplicar filtro a Login
            }

            // Si no hay sesión, redirigir al Login
            if (string.IsNullOrEmpty(usuario))
            {
                context.Result = new RedirectToActionResult("Index", "Login", null);
            }


            base.OnActionExecuting(context);
        }
    }
}
