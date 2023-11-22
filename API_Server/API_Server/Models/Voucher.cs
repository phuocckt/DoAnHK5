namespace API_Server.Models
{
	public class Voucher
	{
		public int Id { get; set; }
		public string Code { get; set; }
		public string Discound { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public string Description { get; set; }
		public bool Status { get; set; }
	}
}
