using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrackingService.Repositories.Migrations
{
    public partial class Quotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuoteFile",
                table: "Trackings",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TenderStatusId",
                table: "Trackings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuoteFile",
                table: "Trackings");

            migrationBuilder.DropColumn(
                name: "TenderStatusId",
                table: "Trackings");
        }
    }
}
