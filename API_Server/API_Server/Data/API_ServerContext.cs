using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API_Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API_Server.Data
{
    public class API_ServerContext : IdentityDbContext<User>
	{
        public API_ServerContext (DbContextOptions<API_ServerContext> options)
            : base(options)
        {
        }

        public DbSet<API_Server.Models.Product> Product { get; set; } = default!;

        public DbSet<API_Server.Models.Cart> Cart { get; set; }

        public DbSet<API_Server.Models.Clothes> Clothes { get; set; }

        public DbSet<API_Server.Models.Color> Color { get; set; }

        public DbSet<API_Server.Models.Comment> Comment { get; set; }

        public DbSet<API_Server.Models.Favorite> Favorite { get; set; }

        public DbSet<API_Server.Models.Image> Image { get; set; }

        public DbSet<API_Server.Models.Invoice> Invoice { get; set; }

        public DbSet<API_Server.Models.InvoiceDetail> InvoiceDetail { get; set; }

        public DbSet<API_Server.Models.ProductType> ProductType { get; set; }

        public DbSet<API_Server.Models.Rating> Rating { get; set; }

        public DbSet<API_Server.Models.Size> Size { get; set; }

        public DbSet<API_Server.Models.Voucher> Voucher { get; set; }
		public IEnumerable<object> Products { get; internal set; }
	}
}
