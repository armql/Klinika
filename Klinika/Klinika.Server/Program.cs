
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Klinika.Server.Configurations;
using Klinika.Server.Controllers;
using Klinika.Server.Hub;
using Klinika.Server.Services;
using Microsoft.Extensions.FileProviders;
using MongoDB.Driver;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;

namespace Klinika.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("ApplicationDbContextConnection") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

            //Add Identity
            builder.Services
                .AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            //Config Identity
            builder.Services.AddIdentityCore<ApplicationUser>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
            });
            builder.Services.Configure<MongoSettings>(builder.Configuration.GetSection("MongoDatabase"));
            builder.Services.AddSingleton<FeeServices>();
            builder.Services.AddSingleton<ReservationServices>();
            builder.Services.AddSingleton<PatientsServices>();
            builder.Services.AddSingleton<SpecializedServices>();
            builder.Services.AddSingleton<RegisteredServices>();
            builder.Services.AddSingleton<SharedDatabase>();
            
            // Add Auth and JwtBearer
            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
                        ValidAudience = builder.Configuration["JWT:ValidAudience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
                        ClockSkew = TimeSpan.Zero // Ensure tokens expire exactly at token expiration time
                    };
                });

            //Needed for AccountController
            builder.Services.AddTransient<IRoleStore<IdentityRole>, RoleStore<IdentityRole, ApplicationDbContext>>();
            builder.Services.AddTransient<RoleManager<IdentityRole>>();
            builder.Services.AddTransient<UserManager<ApplicationUser>>();
            builder.Services.AddScoped<RoleController>();
            builder.Services.AddScoped<ReservationServices>();
            builder.Services.AddScoped<RoleController>();

            builder.Services.AddControllers().AddNewtonsoftJson();
            builder.Services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });
            // Add services to the container.

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSignalR();
            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("reactApp", builder =>
                {
                    builder.WithOrigins("https://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Images")),
                RequestPath = "/Images"
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();
            }

            app.MapHub<NotificationHub>("/notificationHub");
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("reactApp");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chatHub");
            });

            
            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
