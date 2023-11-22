namespace API_Server.Models
{
	public class InvoiceDetail
	{
		public int Id { get; set; }
		public int InvoiceId { get; set; }
		public int ProductId { get; set; }
		public int Quantity { get; set; }
		public int UnitPrice { get; set; }
		public Product Product { get; set; }
		public Invoice Invoice { get; set; }
	}
}
