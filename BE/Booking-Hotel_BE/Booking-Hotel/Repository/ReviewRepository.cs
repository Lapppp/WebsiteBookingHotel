    using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Booking_Hotel.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly Booking_Hotel_Context _context;

        public ReviewRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }

        public async Task<bool> ReviewExists(string userId, int hotelId)
        {
            return await _context.Reviews.AnyAsync(r => r.UserID == userId && r.HotelID == hotelId);
        }

        public async Task CreateReview(Review review)
        {
            // Ensure the User is set from the UserID
            review.User = await _context.Users.FindAsync(review.UserID);
            review.CreatedAt = DateTime.Now;
           
            await _context.Reviews.AddAsync(review);
        }
        
        public async Task<Review> GetReview(int id)
        {
            return await _context.Reviews.Include(i => i.User)
                                        .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IEnumerable<Review>> GetReviews()
        {
            return await _context.Reviews.Include(i => i.User).Include(i => i.Hotel)
                .ToListAsync();
        }

        public async Task DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review != null)
            {
                review.Status = "Inactive";
            }
        }
        public async Task<IEnumerable<Review>> GetReviewsByHotelId(int hotelId)
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Where(r => r.HotelID == hotelId)
                .ToListAsync();
        }
        public async Task<IActionResult> UpdateReview(Review review)
        {
            _context.Entry(review).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await ReviewExists(review.UserID, review.HotelID))
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
        
        public async Task<IEnumerable<Review>> SearchReviews(string searchTerm)
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Hotel)
                .Where(r => r.Title.Contains(searchTerm) || r.Hotel.Name.Contains(searchTerm))
                .ToListAsync();
        }

        public async Task<int> GetTotalReviews()
        {
            return await _context.Reviews.CountAsync();
        }

        public async Task<object> GetAverageRatingWithTitles()
        {
            var averageRating = await _context.Reviews.AverageAsync(r => r.Rating);
            averageRating = Math.Round(averageRating, 2);

            var ratingsWithTitles = await _context.Reviews
                .Select(r => new { r.Title, r.Rating })
                .ToListAsync();

            return new { averageRating, ratingsWithTitles };
        }
    }
}
