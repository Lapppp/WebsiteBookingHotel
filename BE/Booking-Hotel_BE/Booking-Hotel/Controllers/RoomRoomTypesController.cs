using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Booking_Hotel.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomRoomTypesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

         public RoomRoomTypesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet("{roomId}")]
        public async Task<IActionResult> GetRoomRoomTypes(int roomId)
        {
            var roomRoomTypes = await _uow.RoomRoomTypeRepository.GetRoomRoomTypes(roomId);
            if (roomRoomTypes == null)
            {
                return NotFound();
            }
            return Ok(roomRoomTypes);
        }
        [HttpGet("room/{roomId}")]
        public async Task<IActionResult> GetRoomTypesByRoomId(int roomId)
        {
            var roomTypes = await _uow.RoomTypeRepository.GetRoomTypesByRoomId(roomId);
            if (roomTypes == null || !roomTypes.Any())
            {
                return NotFound();
            }
            return Ok(roomTypes);
        }
    }
}
