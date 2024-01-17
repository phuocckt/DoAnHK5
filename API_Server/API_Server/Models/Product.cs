using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
	public class Product
	{
		public int Id { get; set; }
		public int Price { get; set; }
		public int ClothesId { get; set; }
		public int SizeId { get; set; }
		public int ColorId { get; set; }
		public int ImageId { get; set; }
		public int Stock {  get; set; }
		public int? RateId { get; set; }
		public bool Status { get; set; }
		public Size Size { get; set; }
		public Clothes Clothes { get; set; }
		public Image Image {  get; set; }
		public Color Color {  get; set; }
	}
}
