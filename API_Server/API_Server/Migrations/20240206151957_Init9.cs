using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Server.Migrations
{
    public partial class Init9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceDetail_Invoice_InvoiceId",
                table: "InvoiceDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceDetail_Product_ProductId",
                table: "InvoiceDetail");

            migrationBuilder.AlterColumn<int>(
                name: "UnitPrice",
                table: "InvoiceDetail",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "InvoiceDetail",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "InvoiceDetail",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceId",
                table: "InvoiceDetail",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceDetail_Invoice_InvoiceId",
                table: "InvoiceDetail",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceDetail_Product_ProductId",
                table: "InvoiceDetail",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceDetail_Invoice_InvoiceId",
                table: "InvoiceDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceDetail_Product_ProductId",
                table: "InvoiceDetail");

            migrationBuilder.AlterColumn<int>(
                name: "UnitPrice",
                table: "InvoiceDetail",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "InvoiceDetail",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "InvoiceDetail",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceId",
                table: "InvoiceDetail",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceDetail_Invoice_InvoiceId",
                table: "InvoiceDetail",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceDetail_Product_ProductId",
                table: "InvoiceDetail",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
