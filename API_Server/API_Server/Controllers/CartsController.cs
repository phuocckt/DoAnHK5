using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly API_ServerContext _context;

        public CartsController(API_ServerContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCart()
        {
            return await _context.Cart.Include(p=>p.Product)
                                        .ThenInclude(c=>c.Clothes)
                                        .Include(p => p.Product)
                                        .ThenInclude(c => c.Color)
										.Include(p => p.Product)
										.ThenInclude(c => c.Size)
									   .Include(p=>p.User)
									   .ToListAsync();
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Cart.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
			// Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
			var existingCartItem = _context.Cart
				.Where(c => c.ProductId == cart.ProductId)
				.FirstOrDefault();

			if (existingCartItem != null)
			{
				// Cập nhật số lượng sản phẩm đã tồn tại
				existingCartItem.Quantity++;
				await _context.SaveChangesAsync();
				return CreatedAtAction("GetCart", new { id = existingCartItem.Id }, existingCartItem);
			}
			else
			{
				// Thêm sản phẩm mới vào giỏ hàng
				_context.Cart.Add(cart);
				await _context.SaveChangesAsync();
				return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
			}
		}

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Cart.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Cart.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return _context.Cart.Any(e => e.Id == id);
        }
    }
}
