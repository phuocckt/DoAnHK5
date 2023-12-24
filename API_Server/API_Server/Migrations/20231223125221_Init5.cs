using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Server.Migrations
{
    public partial class Init5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clothes_Style_StyleId",
                table: "Clothes");

            migrationBuilder.DropTable(
                name: "Style");

            migrationBuilder.DropIndex(
                name: "IX_Clothes_StyleId",
                table: "Clothes");

            migrationBuilder.DropColumn(
                name: "StyleId",
                table: "Clothes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StyleId",
                table: "Clothes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Style",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Style", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clothes_StyleId",
                table: "Clothes",
                column: "StyleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clothes_Style_StyleId",
                table: "Clothes",
                column: "StyleId",
                principalTable: "Style",
                principalColumn: "Id");
        }
    }
}
