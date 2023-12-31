using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SignarR_Simple_Project.Data;
using SignarR_Simple_Project.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();


builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCors",
            policy =>
            {
                policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("MyCors");

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();
app.MapHub<UserHub>("/hubs/userCount");
//app.MapHub<DeathlyHallowsHub>("/hubs/deathlyhallows");
//app.MapHub<HouseGroupHub>("/hubs/houseGroupHub");
//app.MapHub<ChatHub>("/hubs/chat");


app.Run();
