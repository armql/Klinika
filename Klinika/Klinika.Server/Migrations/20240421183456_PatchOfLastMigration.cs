using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Klinika.Server.Migrations
{
    /// <inheritdoc />
    public partial class PatchOfLastMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Blocks_Blockid",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_Blockid",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "Blockid",
                table: "Blocks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Blockid",
                table: "Blocks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_Blockid",
                table: "Blocks",
                column: "Blockid");

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Blocks_Blockid",
                table: "Blocks",
                column: "Blockid",
                principalTable: "Blocks",
                principalColumn: "id");
        }
    }
}
