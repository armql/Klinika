using Klinika.Server.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Linq;
using System.Threading.Tasks;

namespace Klinika.Server.Models.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Specialization> Specializations { get; set; }

        public DbSet<HelpCenter> HelpCenters { get; set; }

        public DbSet<HelpCenterCategory> HelpCenterCategorys { get; set; }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<PrimaryCareDoctor> PrimaryCareDoctors { get; set; }
        public DbSet<SpecializedDoctor> SpecializedDoctors { get; set; }
        public DbSet<Administrator> Administrators { get; set; }

        public DbSet<ServiceDesk> ServiceDesks { get; set; }

        public DbSet<Block> Blocks { get; set; }
        
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Consultation> Consultations { get; set; }
        
        


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.ApplyConfiguration(new ApplicationUserEntityConfiguration());

            builder.Entity<Specialization>()
                .HasKey(x => x.id);

            builder.Entity<HelpCenterCategory>()
                .HasKey(x => x.id);

            builder.Entity<HelpCenter>()
                .HasKey(x => x.id);

            builder.Entity<Patient>()
                .HasKey(x => x.id);

            builder.Entity<SpecializedDoctor>()
                .HasKey(x => x.id);

            builder.Entity<PrimaryCareDoctor>()
                .HasKey(x => x.id);

            builder.Entity<Administrator>()
                .HasKey(x => x.id);

            builder.Entity<ServiceDesk>()
                .HasKey(x => x.id);

            builder.Entity<Block>()
                .HasKey(x => x.id);
            
            builder.Entity<Reservation>()
                .HasKey(x => x.id);
            
            builder.Entity<Consultation>()
                .HasKey(x => x.id);
            

            

        }
        public class ApplicationUserEntityConfiguration : IEntityTypeConfiguration<ApplicationUser>
        {
            public void Configure(EntityTypeBuilder<ApplicationUser> builder)
            {
                builder.Property(u => u.firstName).HasMaxLength(50);
                builder.Property(u => u.lastName).HasMaxLength(50);
                builder.Property(u => u.gender).HasMaxLength(50);
            }
        }
    }
}
