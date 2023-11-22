using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace API_Server.Models
{
	public class User : IdentityUser
	{
		public string FullName { get; set; }
		public DateTime BirthDay { get; set; }
		public int Phone {  get; set; }
		public string Address { get; set; }
	}
}
