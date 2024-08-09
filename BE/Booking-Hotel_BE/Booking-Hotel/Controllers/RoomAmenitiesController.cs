using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Booking_Hotel.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomAmenitiesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public RoomAmenitiesController(IUnitOfWork uow) { 
            _uow = uow; 
        }

        [HttpGet("{roomId}")]
        public async Task<IActionResult> GetRoomAmenities(int roomId)
        {
            var roomAmenities = await _uow.RoomAmenityRepository.GetRoomAmenities(roomId);
            if (roomAmenities == null)
            {
                return NotFound();
            }
            return Ok(roomAmenities);
        }
    }
}
