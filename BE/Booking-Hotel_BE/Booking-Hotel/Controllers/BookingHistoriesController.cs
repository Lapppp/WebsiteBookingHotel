using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingHistoriesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public BookingHistoriesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        [Route("GetBookingHistories/{bookingId}")]
        public async Task<ActionResult> GetBookingHistories(string bookingId)
        {
            var bookingHistories = await _uow.BookingHistoryRepository.GetBookingHistories(bookingId);
            return Ok(bookingHistories);
        }

        [HttpGet]
        [Route("GetBookingHistory/{id}")]
        public async Task<IActionResult> GetBookingHistory(int id)
        {
            var bookingHistory = await _uow.BookingHistoryRepository.GetBookingHistory(id);
            return Ok(bookingHistory);
        }

        [HttpPost]
       
        public async Task<IActionResult> CreateBookingHistory(BookingHistory bookingHistory)
        {
            var checkBookingHistory = await _uow.BookingHistoryRepository.BookingHistoryExist(bookingHistory.Id);
            if(checkBookingHistory == true)
            {
                return BadRequest();
            }
            await _uow.BookingHistoryRepository.CreateBookingHistory(bookingHistory);
            var result = await _uow.SaveAsync();
            if(!result)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
       
        public async Task<IActionResult> UpdateBookingHistory(int id, BookingHistory bookingHistory)
        {
            if(id != bookingHistory.Id)
            {
                return BadRequest();
            }
            return await _uow.BookingHistoryRepository.UpdateBookingHistory(bookingHistory);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteBookingHistory(int id)
        {
            await _uow.BookingHistoryRepository.DeleteBookingHistory(id);
            var result = await _uow.SaveAsync();
            if(!result)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
