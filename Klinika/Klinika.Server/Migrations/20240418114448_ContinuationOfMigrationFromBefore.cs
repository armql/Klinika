using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Klinika.Server.Migrations
{
    /// <inheritdoc />
    public partial class ContinuationOfMigrationFromBefore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HelpCenters_helpCenterCategorys_categoryId",
                table: "HelpCenters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_helpCenterCategorys",
                table: "helpCenterCategorys");

            migrationBuilder.RenameTable(
                name: "helpCenterCategorys",
                newName: "HelpCenterCategorys");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HelpCenterCategorys",
                table: "HelpCenterCategorys",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_HelpCenters_HelpCenterCategorys_categoryId",
                table: "HelpCenters",
                column: "categoryId",
                principalTable: "HelpCenterCategorys",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HelpCenters_HelpCenterCategorys_categoryId",
                table: "HelpCenters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HelpCenterCategorys",
                table: "HelpCenterCategorys");

            migrationBuilder.RenameTable(
                name: "HelpCenterCategorys",
                newName: "helpCenterCategorys");

            migrationBuilder.AddPrimaryKey(
                name: "PK_helpCenterCategorys",
                table: "helpCenterCategorys",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_HelpCenters_helpCenterCategorys_categoryId",
                table: "HelpCenters",
                column: "categoryId",
                principalTable: "helpCenterCategorys",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
