using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.Extensions.Hosting;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly API_ServerContext _context;
		private readonly IWebHostEnvironment _environment;

		public ImagesController(API_ServerContext context, IWebHostEnvironment environment)
        {
            _context = context;
			_environment = environment;
		}

        // GET: api/Images
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetImage()
        {
            return await _context.Image.ToListAsync();
        }

        // GET: api/Images/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            var image = await _context.Image.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }

        // PUT: api/Images/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(int id, Image image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }

			var existingImage = await _context.Image
												.FirstOrDefaultAsync(p => p.Name == image.Name && p.Id != id && p.ProductId == image.ProductId);
			if (existingImage != null)
			{
				ModelState.AddModelError("Name", "Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
				return BadRequest(ModelState);
			}

			_context.Entry(image).State = EntityState.Modified;

			try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Images
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Image>> PostImage([FromForm] Image image)
        {
			image.Name = "";
			_context.Image.Add(image);
            await _context.SaveChangesAsync();
			var fileName = image.Id.ToString() + Path.GetExtension(image.NameFile.FileName);
			var uploadFolder = Path.Combine(_environment.WebRootPath, "images", "product");
			var uploadPath = Path.Combine(uploadFolder, fileName);
			using (var stream = System.IO.File.Create(uploadPath))
			{
				await image.NameFile.CopyToAsync(stream);
			}
            image.Name = fileName;
			_context.Image.Update(image);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetImage", new { id = image.Id }, image);
        }

        // DELETE: api/Images/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Image.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.Image.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImageExists(int id)
        {
            return _context.Image.Any(e => e.Id == id);
        }
    }
}
