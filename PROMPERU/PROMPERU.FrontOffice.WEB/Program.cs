using Microsoft.AspNetCore.Authentication.Cookies;
using PROMPERU.BE;
using PROMPERU.BL;
using PROMPERU.DA;
using PROMPERU.DB;
using Serilog;
using ServiceExterno;

var builder = WebApplication.CreateBuilder(args);

// Configurar Serilog desde appsettings.json
// Configuración de Serilog desde appsettings.json
builder.Host.UseSerilog((context, services, configuration) =>
    configuration
        .ReadFrom.Configuration(context.Configuration) // Cargar configuración de appsettings.json
        .WriteTo.Console() // Escribir también en consola (opcional)
);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configurar sesiones
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Tiempo de expiración
    options.Cookie.HttpOnly = true; // Evitar acceso desde JavaScript
    options.Cookie.IsEssential = true; // Requerido para funcionalidad de sesión
});

// Agregar autenticación con cookies
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Test/Index"; // Redirige a Login si no está autenticado
        options.LogoutPath = "/Test/CerrarSesion"; // Ruta para cerrar sesión
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30); // Expira en 30 minutos
    });

builder.Services.AddAuthorization();

builder.Services.AddScoped(sp => new ConexionDB(builder.Configuration.GetConnectionString("DefaultConnection")));

//servicios externos (SUNAT)
builder.Services.Configure<SunatApiSettings>(builder.Configuration.GetSection("SunatApiSettings"));
builder.Services.AddHttpClient<SunatService>();

//servicios externos (SUNAT PROM PERU)
builder.Services.Configure<SunatPromPeruApiSettings>(builder.Configuration.GetSection("SunatPromPeruApiSettings"));
builder.Services.AddHttpClient<SunatPromPeruService>();

//servicios externos (CORREO)
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));
builder.Services.AddScoped<EmailService>();


// Registrar los servicios
builder.Services.AddScoped<UsuarioDA>();
builder.Services.AddScoped<UsuarioBL>();
builder.Services.AddScoped<BannerDA>();
builder.Services.AddScoped<BannerBL>();
builder.Services.AddScoped<AuditoriaDA>();
builder.Services.AddScoped<MultimediaDA>();
builder.Services.AddScoped<MultimediaBL>();
builder.Services.AddScoped<InformacionDA>();
builder.Services.AddScoped<InformacionBL>();
builder.Services.AddScoped<RequisitoDA>();
builder.Services.AddScoped<RequisitoBL>();
builder.Services.AddScoped<InscripcionDA>();
builder.Services.AddScoped<InscripcionBL>();
builder.Services.AddScoped<BeneficioDA>();
builder.Services.AddScoped<BeneficioBL>();
builder.Services.AddScoped<CursoDA>();
builder.Services.AddScoped<CursoBL>();
builder.Services.AddScoped<CasoDA>();
builder.Services.AddScoped<CasoBL>();
builder.Services.AddScoped<LogoDA>();
builder.Services.AddScoped<LogoBL>();
builder.Services.AddScoped<MenuDA>();
builder.Services.AddScoped<MenuBL>();
builder.Services.AddScoped<FooterDA>();
builder.Services.AddScoped<FooterBL>();
builder.Services.AddScoped<LogroDA>();
builder.Services.AddScoped<LogroBL>();
builder.Services.AddScoped<TestimonioDA>();
builder.Services.AddScoped<TestimonioBL>();
builder.Services.AddScoped<PerfilEmpresarialDA>();
builder.Services.AddScoped<PerfilEmpresarialBL>();
builder.Services.AddScoped<EmpresaDA>();
builder.Services.AddScoped<EmpresaBL>();
builder.Services.AddScoped<FormularioContactoDA>();
builder.Services.AddScoped<FormularioContactoBL>();
builder.Services.AddScoped<RegionDA>();
builder.Services.AddScoped<RegionBL>();
builder.Services.AddScoped<TipoEmpresaDA>();
builder.Services.AddScoped<TipoEmpresaBL>();
builder.Services.AddScoped<ContenidoInteractivoDA>();
builder.Services.AddScoped<ContenidoInteractivoBL>();
builder.Services.AddScoped<CursoModalidadDA>();
builder.Services.AddScoped<UbigeoDA>();
builder.Services.AddScoped<UbigeoBL>();
builder.Services.AddScoped<ContactoDA>();
builder.Services.AddScoped<ContactoBL>();
builder.Services.AddScoped<PortadaTestDA>();
builder.Services.AddScoped<PortadaTestBL>();
builder.Services.AddScoped<TestDA>();
builder.Services.AddScoped<TestBL>();
builder.Services.AddScoped<ContenidoTestDA>();
builder.Services.AddScoped<FormularioTestDA>();
builder.Services.AddScoped<PreguntaDA>();
builder.Services.AddScoped<PreguntaCursoDA>();
builder.Services.AddScoped<RespuestaDA>();


builder.Services.AddScoped<PROMPERU.BL.Interfaces.ILoggerService, PROMPERU.BL.Services.LoggerService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Activar sesiones
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
