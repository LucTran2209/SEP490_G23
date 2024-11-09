using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InintUpdateFixRentalShop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "RentalShops");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "RentalShops",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "RentalShops");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "RentalShops",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
