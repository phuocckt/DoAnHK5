﻿namespace API_Server.Models
{
	public class Cart
	{
		public int Id { get; set; }
		public string? UserId { get; set; }
		public int ProductId { get; set; }
		public int Quantity { get; set; }
		public User User { get; set; }
		public Product Product { get; set; }
	}
}
