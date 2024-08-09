using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Booking_Hotel.Repository
{
    public class PromotionRepository : IPromotionRepository
    {
        private readonly Booking_Hotel_Context _context;

        public PromotionRepository(Booking_Hotel_Context context){
            _context = context;
        }

        public async Task CreatePromotion(Promotion promotion)
        {
            await _context.Promotion.AddAsync(promotion);
        }
        public async Task<IEnumerable<Promotion>> GetPromotions(int hotelID) // Corrected method signature
        {
            return await _context.Promotion.Include(p => p.Hotel)
                .Where(c => c.HotelID == hotelID)
                .ToListAsync();
        }
        public async Task<IEnumerable<Promotion>> GetPromotion()
        {
            return await _context.Promotion.Include(p => p.Hotel).ToListAsync();
        }

        public async Task<Promotion> GetPromotion(int id)
        {
            return await _context.Promotion.Include(p => p.Hotel).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> PromotionExist(int id)
        {
            return await _context.Promotion.AnyAsync(p => p.Id == id);
        }

        public async Task<IActionResult> UpdatePromotion(Promotion promotion)
        {
            _context.Entry(promotion).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!await PromotionExist(promotion.Id))
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

        public async Task DeletePromotion(int id)
        {
            var promotion = await _context.Promotion.FindAsync(id);
            if(promotion != null)
            {
                promotion.Status = "Inactive";
            }
        }
    }
}