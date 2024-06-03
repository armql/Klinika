using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Klinika.Server.Migrations
{
    /// <inheritdoc />
    public partial class ForeignKeyInApplicationUsersForImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "profileImage",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_profileImage",
                table: "AspNetUsers",
                column: "profileImage");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Images_profileImage",
                table: "AspNetUsers",
                column: "profileImage",
                principalTable: "Images",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Images_profileImage",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_profileImage",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "profileImage",
                table: "AspNetUsers");
        }
    }
}
