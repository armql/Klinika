using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Klinika.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeColumnNameofIDinSpecializationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Specializations",
                newName: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "Specializations",
                newName: "Id");
        }
    }
}
