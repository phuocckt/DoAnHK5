using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
	public class Comment
	{
		public int Id { get; set; }
		public string Content { get; set; }
		public DateTime Date { get; set; }
		public string UserId { get; set; }
		public int ClothesId { get; set; }
		public int? ParentCommentId { get; set; }
		[ForeignKey(nameof(ParentCommentId))]
		public Comment ParentComment { get; set; }
		public Clothes Clothes { get; set; }
	}
}
