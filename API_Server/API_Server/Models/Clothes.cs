namespace API_Server.Models
{
	public class Clothes
	{
		public int Id { get; set; }
		public string SKU { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int ProductTypeId { get; set; }
		public ProductType ProductType { get; set; }

	}
}
