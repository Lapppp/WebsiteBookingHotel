using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IReviewRepository
    {
        Task<bool> ReviewExists(string userId, int hotelId);
        Task CreateReview(Review review);
        Task<Review> GetReview(int id);
        Task<IEnumerable<Review>> GetReviews();
        Task DeleteReview(int id);
        Task<IActionResult> UpdateReview(Review review);
        Task<IEnumerable<Review>> GetReviewsByHotelId(int hotelId);
        Task<IEnumerable<Review>> SearchReviews(string searchTerm);
        Task<int> GetTotalReviews();
        Task<object> GetAverageRatingWithTitles();
    }
}