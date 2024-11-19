using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addnotetableshop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminNote",
                table: "RentalShops",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminNote",
                table: "RentalShops");
        }
    }
}
