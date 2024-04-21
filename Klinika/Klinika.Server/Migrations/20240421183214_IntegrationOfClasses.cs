using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Klinika.Server.Migrations
{
    /// <inheritdoc />
    public partial class IntegrationOfClasses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blocks",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    specializationId = table.Column<int>(type: "int", nullable: false),
                    Blockid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blocks", x => x.id);
                    table.ForeignKey(
                        name: "FK_Blocks_Blocks_Blockid",
                        column: x => x.Blockid,
                        principalTable: "Blocks",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Blocks_Specializations_specializationId",
                        column: x => x.specializationId,
                        principalTable: "Specializations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.id);
                    table.ForeignKey(
                        name: "FK_Patients_AspNetUsers_id",
                        column: x => x.id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PrimaryCareDoctors",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    specializationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrimaryCareDoctors", x => x.id);
                    table.ForeignKey(
                        name: "FK_PrimaryCareDoctors_AspNetUsers_id",
                        column: x => x.id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrimaryCareDoctors_Specializations_specializationId",
                        column: x => x.specializationId,
                        principalTable: "Specializations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SpecializedDoctors",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    specializationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecializedDoctors", x => x.id);
                    table.ForeignKey(
                        name: "FK_SpecializedDoctors_AspNetUsers_id",
                        column: x => x.id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SpecializedDoctors_Specializations_specializationId",
                        column: x => x.specializationId,
                        principalTable: "Specializations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceDesks",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    operatingHours = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    blockId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceDesks", x => x.id);
                    table.ForeignKey(
                        name: "FK_ServiceDesks_Blocks_blockId",
                        column: x => x.blockId,
                        principalTable: "Blocks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Administrators",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    serviceDeskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrators", x => x.id);
                    table.ForeignKey(
                        name: "FK_Administrators_AspNetUsers_id",
                        column: x => x.id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Administrators_ServiceDesks_serviceDeskId",
                        column: x => x.serviceDeskId,
                        principalTable: "ServiceDesks",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Administrators_serviceDeskId",
                table: "Administrators",
                column: "serviceDeskId");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_Blockid",
                table: "Blocks",
                column: "Blockid");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_specializationId",
                table: "Blocks",
                column: "specializationId");

            migrationBuilder.CreateIndex(
                name: "IX_PrimaryCareDoctors_specializationId",
                table: "PrimaryCareDoctors",
                column: "specializationId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceDesks_blockId",
                table: "ServiceDesks",
                column: "blockId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecializedDoctors_specializationId",
                table: "SpecializedDoctors",
                column: "specializationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administrators");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "PrimaryCareDoctors");

            migrationBuilder.DropTable(
                name: "SpecializedDoctors");

            migrationBuilder.DropTable(
                name: "ServiceDesks");

            migrationBuilder.DropTable(
                name: "Blocks");
        }
    }
}
