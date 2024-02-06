using API_Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EshopIdentity.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly UserManager<User> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;

		public UsersController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
		{
			_userManager = userManager;
			_roleManager = roleManager;
			_configuration = configuration;
		}

		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> Login(LoginModels account)
		{
			if (string.IsNullOrEmpty(account.Username))
			{
				return BadRequest("Username cannot be null or empty.");
			}
			var user = await _userManager.FindByNameAsync(account.Username);
			if (user != null && await _userManager.CheckPasswordAsync(user, account.Password))
			{
				var userRoles = await _userManager.GetRolesAsync(user);

				var authClaims = new List<Claim>
				{
					new Claim("username", user.UserName),
					new Claim("fullname", user.FullName),
					new Claim("id", user.Id),
					new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
				};

				foreach (var userRole in userRoles)
				{
					authClaims.Add(new Claim(ClaimTypes.Role, userRole));
				}

				var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

				var token = new JwtSecurityToken(
					issuer: _configuration["JWT:ValidIssuer"],
					audience: _configuration["JWT:ValidAudience"],
					expires: DateTime.Now.AddHours(3),
					claims: authClaims,
					signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
					);

				return Ok(new
				{
					token = new JwtSecurityTokenHandler().WriteToken(token),
					expiration = token.ValidTo
				});
			}
			return Unauthorized();
		}

		[HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register(Register register)
		{
			if (register.Password!= register.Repassword)
			{
				return BadRequest("two passwords do not match");
			}
			if (string.IsNullOrEmpty(register.Username))
			{
				return BadRequest("Username cannot be null or empty.");
			}
			var userExists = await _userManager.FindByNameAsync(register.Username);
			if (userExists != null)
				return StatusCode(StatusCodes.Status500InternalServerError);

			User user = new User()
			{
				Email = register.Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				FullName=register.FullName,
				UserName = register.Username
			};
			var result = await _userManager.CreateAsync(user, register.Password);
			if (!result.Succeeded)
				return StatusCode(StatusCodes.Status500InternalServerError);
			if (await _roleManager.RoleExistsAsync("User"))
			{
				await _userManager.AddToRoleAsync(user, "User");
			}

			return new OkResult();
		}

		[HttpPost]
		[Route("register-admin")]
		public async Task<IActionResult> RegisterAdmin(string Username, string Password, string Email)
		{
			var userExists = await _userManager.FindByNameAsync(Username);
			if (userExists != null)
				return StatusCode(StatusCodes.Status500InternalServerError);

			User user = new User()
			{
				Email = Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = Username
			};
			var result = await _userManager.CreateAsync(user, Password);
			if (!result.Succeeded)
				return StatusCode(StatusCodes.Status500InternalServerError);

			if (!await _roleManager.RoleExistsAsync("Admin"))
				await _roleManager.CreateAsync(new IdentityRole("Admin"));
			if (!await _roleManager.RoleExistsAsync("User"))
				await _roleManager.CreateAsync(new IdentityRole("User"));

			if (await _roleManager.RoleExistsAsync("Admin"))
			{
				await _userManager.AddToRoleAsync(user, "Admin");
			}

			return Ok();
		}
	}
}
