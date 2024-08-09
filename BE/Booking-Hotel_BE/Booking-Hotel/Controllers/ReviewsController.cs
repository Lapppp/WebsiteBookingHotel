using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public ReviewsController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> GetReviews()
        {
            var reviews = await _uow.ReviewRepository.GetReviews();
            return Ok(reviews);
        }

        [HttpGet]
        [Route("GetReview/{id}")]
        public async Task<IActionResult> GetReview(int id)
        {
            var review = await _uow.ReviewRepository.GetReview(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateReview([FromBody] Review review)
        {
            if (review == null || string.IsNullOrEmpty(review.UserID))
            {
                return BadRequest("Invalid review data.");
            }

            // Check if the user has already reviewed the hotel
           

            await _uow.ReviewRepository.CreateReview(review);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return StatusCode(500, "An error occurred while saving the review.");
            }

            return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
        }

        [HttpGet]
        [Route("ByHotel/{hotelId}")]
        public async Task<IActionResult> GetReviewsByHotelId(int hotelId)
        {
            var reviews = await _uow.ReviewRepository.GetReviewsByHotelId(hotelId);
            return Ok(reviews);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateReview(int id, [FromBody] Review review)
        {
            if (id != review.Id)
            {
                return BadRequest("Review ID mismatch.");
            }

            var result = await _uow.ReviewRepository.UpdateReview(review);
            if (result == null)
            {
                return NotFound("Review not found.");
            }

            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteReview(int id)
        {
            await _uow.ReviewRepository.DeleteReview(id);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return StatusCode(500, "An error occurred while deleting the review.");
            }
            return Ok();
        }
        
        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchReviews([FromQuery] string searchTerm)
        {
            var reviews = await _uow.ReviewRepository.SearchReviews(searchTerm);
            return Ok(reviews);
        }

        [HttpGet]
        [Route("total-reviews")]
        public async Task<IActionResult> GetTotalReviews()
        {
            var totalReviews = await _uow.ReviewRepository.GetTotalReviews();
            return Ok(totalReviews);
        }       

        [HttpGet]
        [Route("average-rating")]
        public async Task<IActionResult> GetAverageRatingWithTitles()
        {
            try
            {
                var result = await _uow.ReviewRepository.GetAverageRatingWithTitles();

                return Ok(result); // Trả về kết quả thành công
            }
            catch (Exception ex)
            {
                // Xử lý các lỗi khác
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
