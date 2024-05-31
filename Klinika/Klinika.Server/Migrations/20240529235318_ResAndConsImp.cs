using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Klinika.Server.Migrations
{
    /// <inheritdoc />
    public partial class ResAndConsImp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    reasonOfConsultation = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    creationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    slot = table.Column<int>(type: "int", nullable: false),
                    specializedDoctorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    patientId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.id);
                    table.ForeignKey(
                        name: "FK_Reservations_Patients_patientId",
                        column: x => x.patientId,
                        principalTable: "Patients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservations_SpecializedDoctors_specializedDoctorId",
                        column: x => x.specializedDoctorId,
                        principalTable: "SpecializedDoctors",
                        principalColumn: "id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Consultations",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    notes = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    evaluation = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    creationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    reservationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultations", x => x.id);
                    table.ForeignKey(
                        name: "FK_Consultations_Reservations_reservationId",
                        column: x => x.reservationId,
                        principalTable: "Reservations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Consultations_reservationId",
                table: "Consultations",
                column: "reservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_patientId",
                table: "Reservations",
                column: "patientId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_specializedDoctorId",
                table: "Reservations",
                column: "specializedDoctorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Consultations");

            migrationBuilder.DropTable(
                name: "Reservations");
        }
    }
}
