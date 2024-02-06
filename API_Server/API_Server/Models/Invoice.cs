namespace API_Server.Models
{
	public class Invoice
	{
		public int Id { get; set; }
		public DateTime InvoiceDate { get; set; }
		public int Total { get; set; }
		public int? DiscoundTotal { get; set; }
		public string UserId { get; set; }
		public string AddressShip {  get; set; }
		public string Phone { get; set; }
		public int? PaymentMethodId { get; set; }
		public int? VoucherId { get; set; }
		public bool Status { get; set; }
		public Voucher Voucher { get; set; }
		public User User { get; set; }
		public PaymentMethod PaymentMethod { get; set; }
	}
}
