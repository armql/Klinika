using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Klinika.Server.Migrations
{
    /// <inheritdoc />
    public partial class AdditionOfHelpcenterAndCategorys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "helpCenterCategorys",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    createdBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    creationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_helpCenterCategorys", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "HelpCenters",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    subject = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    message = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HelpCenters", x => x.id);
                    table.ForeignKey(
                        name: "FK_HelpCenters_helpCenterCategorys_categoryId",
                        column: x => x.categoryId,
                        principalTable: "helpCenterCategorys",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HelpCenters_categoryId",
                table: "HelpCenters",
                column: "categoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HelpCenters");

            migrationBuilder.DropTable(
                name: "helpCenterCategorys");
        }
    }
}
