namespace API_Server.Models
{
	public class Rating
	{
		public int Id { get; set; }
		public string Star {  get; set; }
		public string Comment { get; set; }
		public DateTime Date { get; set; }
		public string UserId { get; set; }
		public string Image {  get; set; }
		public int ProductId { get; set; }
		public User User { get; set; }
		public Product Product {  get; set; }
	}
}
