using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AlterOrderTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentType",
                table: "Orders",
                newName: "MortgagePaperType");

            migrationBuilder.AddColumn<string>(
                name: "MortgagePaperImageBack",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MortgagePaperImageFont",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MortgagePaperImageBack",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "MortgagePaperImageFont",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "MortgagePaperType",
                table: "Orders",
                newName: "PaymentType");
        }
    }
}
