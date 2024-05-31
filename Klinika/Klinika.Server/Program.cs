
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
using MongoDB.Driver;

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
            builder.Services.AddSignalR();
            builder.Services.Configure<MongoSettings>(builder.Configuration.GetSection("MongoDatabase"));
            builder.Services.AddSingleton<MetricServices>();
            
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
            builder.Services.AddScoped<MetricServices>();


            builder.Services.AddControllers().AddNewtonsoftJson();

            // Add services to the container.

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            //logs out user, if called and user is logged in
            // app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
            // {
            //
            //     await signInManager.SignOutAsync();
            //     return Results.Ok();
            //
            // }).RequireAuthorization();
            //
            // app.MapPost("/login", async (SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, string email, string password) =>
            // {
            //     var user = await userManager.FindByEmailAsync(email);
            //     if (user == null || !await userManager.CheckPasswordAsync(user, password))
            //     {
            //         return Results.BadRequest("Invalid email or password");
            //     }
            //
            //     await signInManager.SignInAsync(user, true);
            //     return Results.Ok();
            // });
            //
            // //logs out user, if called and user is logged in
            // app.MapPost("/register", async (UserManager<ApplicationUser> userManager, string email, string password, string firstName, string lastName, string phoneNumber) =>
            // {
            //     var user = new ApplicationUser
            //     {
            //         Email = email,
            //         UserName = email,
            //         firstName = firstName,
            //         lastName = lastName,
            //         PhoneNumber = phoneNumber
            //     };
            //
            //     var result = await userManager.CreateAsync(user, password);
            //     if (!result.Succeeded)
            //     {
            //         return Results.BadRequest(result.Errors);
            //     }
            //
            //     return Results.Ok();
            // });
            //
            // app.MapPost("/forgot-password", async (UserManager<ApplicationUser> userManager, string email) =>
            // {
            //     var user = await userManager.FindByEmailAsync(email);
            //     if (user == null)
            //     {
            //         return Results.BadRequest("User not found");
            //     }
            //
            //     var token = await userManager.GeneratePasswordResetTokenAsync(user);
            //     //Send email with token
            //     return Results.Ok();
            // });
            //
            // app.MapPost("/reset-password", async (UserManager<ApplicationUser> userManager, string email, string token, string password) =>
            // {
            //     var user = await userManager.FindByEmailAsync(email);
            //     if (user == null)
            //     {
            //         return Results.BadRequest("User not found");
            //     }
            //
            //     var result = await userManager.ResetPasswordAsync(user, token, password);
            //     if (!result.Succeeded)
            //     {
            //         return Results.BadRequest(result.Errors);
            //     }
            //
            //     return Results.Ok();
            // });
            //
            // app.MapPost("/change-password", async (UserManager<ApplicationUser> userManager, string email, string currentPassword, string newPassword) =>
            // {
            //     var user = await userManager.FindByEmailAsync(email);
            //     if (user == null)
            //     {
            //         return Results.BadRequest("User not found");
            //     }
            //
            //     var result = await userManager.ChangePasswordAsync(user, currentPassword, newPassword);
            //     if (!result.Succeeded)
            //     {
            //         return Results.BadRequest(result.Errors);
            //     }
            //
            //     return Results.Ok();
            // });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.MapHub<NotificationHub>("/notificationHub");
            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
