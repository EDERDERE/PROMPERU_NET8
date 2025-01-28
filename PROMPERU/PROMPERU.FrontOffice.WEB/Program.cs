using PROMPERU.BL;
using PROMPERU.DA;
using PROMPERU.DB;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddScoped(sp => new ConexionDB(builder.Configuration.GetConnectionString("DefaultConnection")));

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

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
