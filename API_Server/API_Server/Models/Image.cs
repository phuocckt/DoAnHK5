using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
	public class Image
	{
		public int Id { get; set; }
		public string Name { get; set; }
		[NotMapped]
		public IFormFile NameFile { get; set; }
		public bool Status { get; set; }
		public int? ProductId { get; set; }
	}
}
