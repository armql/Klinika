using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Klinika.Server.Migrations
{
    /// <inheritdoc />
    public partial class RefreshTokenImplementation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "refreshToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "refreshTokenExpiryTime",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "refreshToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "refreshTokenExpiryTime",
                table: "AspNetUsers");
        }
    }
}
