﻿// <auto-generated />
using System;
using Klinika.Server.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Klinika.Server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Klinika.Server.Models.Block", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("specializationId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("specializationId");

                    b.ToTable("Blocks");
                });

            modelBuilder.Entity("Klinika.Server.Models.Consultation", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<DateTime>("creationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("evaluation")
                        .IsRequired()
                        .HasMaxLength(5000)
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("notes")
                        .IsRequired()
                        .HasMaxLength(5000)
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("reservationId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("reservationId");

                    b.ToTable("Consultations");
                });

            modelBuilder.Entity("Klinika.Server.Models.Data.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<DateTime>("birthDate")
                        .HasColumnType("date");

                    b.Property<string>("firstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("gender")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("lastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("password")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("profileImage")
                        .HasColumnType("int");

                    b.Property<string>("refreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("refreshTokenExpiryTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.HasIndex("profileImage");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Klinika.Server.Models.HelpCenter", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("categoryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("creationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("message")
                        .IsRequired()
                        .HasMaxLength(5000)
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("subject")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("id");

                    b.HasIndex("categoryId");

                    b.ToTable("HelpCenters");
                });

            modelBuilder.Entity("Klinika.Server.Models.HelpCenterCategory", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("createdBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("creationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("id");

                    b.ToTable("HelpCenterCategorys");
                });

            modelBuilder.Entity("Klinika.Server.Models.Image", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("createdBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("creationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("fileName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("filePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("fileUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Klinika.Server.Models.Planet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Planets");
                });

            modelBuilder.Entity("Klinika.Server.Models.Reservation", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<DateTime>("creationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("date")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("patientId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("reasonOfConsultation")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<int>("slot")
                        .HasColumnType("int");

                    b.Property<string>("specializedDoctorId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("id");

                    b.HasIndex("patientId");

                    b.HasIndex("specializedDoctorId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("Klinika.Server.Models.Satellite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("PlanetId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PlanetId");

                    b.ToTable("Satellites");
                });

            modelBuilder.Entity("Klinika.Server.Models.ServiceDesk", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("blockId")
                        .HasColumnType("int");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("operatingHours")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("id");

                    b.HasIndex("blockId");

                    b.ToTable("ServiceDesks");
                });

            modelBuilder.Entity("Klinika.Server.Models.Specialization", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("createdBy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("creationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("id");

                    b.ToTable("Specializations");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.Administrator", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("serviceDeskId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("serviceDeskId");

                    b.ToTable("Administrators");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.Patient", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.PrimaryCareDoctor", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("specializationId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("specializationId");

                    b.ToTable("PrimaryCareDoctors");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.SpecializedDoctor", b =>
                {
                    b.Property<string>("id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("specializationId")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("specializationId");

                    b.ToTable("SpecializedDoctors");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Klinika.Server.Models.Block", b =>
                {
                    b.HasOne("Klinika.Server.Models.Specialization", "Specialization")
                        .WithMany("Blocks")
                        .HasForeignKey("specializationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Specialization");
                });

            modelBuilder.Entity("Klinika.Server.Models.Consultation", b =>
                {
                    b.HasOne("Klinika.Server.Models.Reservation", "reservation")
                        .WithMany("Consultations")
                        .HasForeignKey("reservationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("reservation");
                });

            modelBuilder.Entity("Klinika.Server.Models.Data.ApplicationUser", b =>
                {
                    b.HasOne("Klinika.Server.Models.Image", "image")
                        .WithMany("ApplicationUsers")
                        .HasForeignKey("profileImage");

                    b.Navigation("image");
                });

            modelBuilder.Entity("Klinika.Server.Models.HelpCenter", b =>
                {
                    b.HasOne("Klinika.Server.Models.HelpCenterCategory", "HelpCenterCategory")
                        .WithMany("HelpCenter")
                        .HasForeignKey("categoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("HelpCenterCategory");
                });

            modelBuilder.Entity("Klinika.Server.Models.Reservation", b =>
                {
                    b.HasOne("Klinika.Server.Models.User.Patient", "patient")
                        .WithMany("Reservations")
                        .HasForeignKey("patientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Klinika.Server.Models.User.SpecializedDoctor", "specializedDoctor")
                        .WithMany("Reservations")
                        .HasForeignKey("specializedDoctorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("patient");

                    b.Navigation("specializedDoctor");
                });

            modelBuilder.Entity("Klinika.Server.Models.Satellite", b =>
                {
                    b.HasOne("Klinika.Server.Models.Planet", "Planet")
                        .WithMany()
                        .HasForeignKey("PlanetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Planet");
                });

            modelBuilder.Entity("Klinika.Server.Models.ServiceDesk", b =>
                {
                    b.HasOne("Klinika.Server.Models.Block", "Block")
                        .WithMany("ServiceDesks")
                        .HasForeignKey("blockId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Block");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.Administrator", b =>
                {
                    b.HasOne("Klinika.Server.Models.Data.ApplicationUser", "User")
                        .WithMany("Administrators")
                        .HasForeignKey("id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Klinika.Server.Models.ServiceDesk", "ServiceDesk")
                        .WithMany("Administrators")
                        .HasForeignKey("serviceDeskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ServiceDesk");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.Patient", b =>
                {
                    b.HasOne("Klinika.Server.Models.Data.ApplicationUser", "User")
                        .WithMany("Patients")
                        .HasForeignKey("id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.PrimaryCareDoctor", b =>
                {
                    b.HasOne("Klinika.Server.Models.Data.ApplicationUser", "User")
                        .WithMany("PrimaryCareDoctors")
                        .HasForeignKey("id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Klinika.Server.Models.Specialization", "Specialization")
                        .WithMany("PrimaryCareDoctors")
                        .HasForeignKey("specializationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Specialization");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.SpecializedDoctor", b =>
                {
                    b.HasOne("Klinika.Server.Models.Data.ApplicationUser", "User")
                        .WithMany("SpecializedDoctors")
                        .HasForeignKey("id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Klinika.Server.Models.Specialization", "Specialization")
                        .WithMany("SpecializedDoctors")
                        .HasForeignKey("specializationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Specialization");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Klinika.Server.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Klinika.Server.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Klinika.Server.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Klinika.Server.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Klinika.Server.Models.Block", b =>
                {
                    b.Navigation("ServiceDesks");
                });

            modelBuilder.Entity("Klinika.Server.Models.Data.ApplicationUser", b =>
                {
                    b.Navigation("Administrators");

                    b.Navigation("Patients");

                    b.Navigation("PrimaryCareDoctors");

                    b.Navigation("SpecializedDoctors");
                });

            modelBuilder.Entity("Klinika.Server.Models.HelpCenterCategory", b =>
                {
                    b.Navigation("HelpCenter");
                });

            modelBuilder.Entity("Klinika.Server.Models.Image", b =>
                {
                    b.Navigation("ApplicationUsers");
                });

            modelBuilder.Entity("Klinika.Server.Models.Reservation", b =>
                {
                    b.Navigation("Consultations");
                });

            modelBuilder.Entity("Klinika.Server.Models.ServiceDesk", b =>
                {
                    b.Navigation("Administrators");
                });

            modelBuilder.Entity("Klinika.Server.Models.Specialization", b =>
                {
                    b.Navigation("Blocks");

                    b.Navigation("PrimaryCareDoctors");

                    b.Navigation("SpecializedDoctors");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.Patient", b =>
                {
                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("Klinika.Server.Models.User.SpecializedDoctor", b =>
                {
                    b.Navigation("Reservations");
                });
#pragma warning restore 612, 618
        }
    }
}
