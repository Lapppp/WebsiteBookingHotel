using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;

namespace Booking_Hotel.Repository
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly Booking_Hotel_Context _context;
        public WishlistRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }
        public async Task CreateWishlist(Wishlist wishlist)
        {
            await _context.Wishlist.AddAsync(wishlist);
        }

        public async Task DeleteWishlist(int id)
        {
            var wishlist = await _context.Wishlist.FindAsync(id);
            if (wishlist != null)
            {
                _context.Wishlist.Remove(wishlist);
            }
        }
        
        
        
        
        
        
        
        
        

        public async Task<Wishlist> GetWishlist(int id)
        {
            return await _context.Wishlist.Include(wl => wl.User)
                .Include(wl => wl.Hotel)
                .FirstOrDefaultAsync(wl => wl.Id == id);
        }

        public async Task<IEnumerable<Wishlist>> GetWishlist()
        {
            return await _context.Wishlist.Include(wl => wl.User)
                .Include(wl => wl.Hotel).ToListAsync();
        }
        public async Task<IEnumerable<Wishlist>> GetWishlistByUserId(string userId) // Add this method
        {
            return await _context.Wishlist.Include(wl => wl.User)
                .Include(wl => wl.Hotel)
                .Where(wl => wl.UserID == userId)
                .ToListAsync();
        }
        
        
        
        
        
        
        

        public async Task<IActionResult> UpdateWishlist(Wishlist wishlist)
        {
            _context.Entry(wishlist).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await WishlistExist(wishlist.Id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw;
                }
            }
            return new OkResult();
        }

        public async Task<bool> WishlistExist(int id)
        {
            return await _context.Wishlist.AnyAsync(b => b.Id == id);
        }
    }
}
