using AutoMapper;
using Booking_Hotel.Dtos;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public RoomsController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _uow.RoomRepository.GetRooms();
            var roomsDto = _mapper.Map<IEnumerable<RoomDto>>(rooms);
            return Ok(roomsDto);
        }
        [HttpGet]
        [Route("GetRoomsByHotelID/{hotelID}")]
        public async Task<IActionResult> GetRooms(int hotelID)
        {
            var rooms = await _uow.RoomRepository.GetRooms(hotelID);
            var roomsDto = _mapper.Map<IEnumerable<RoomDto>>(rooms);
            return Ok(roomsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _uow.RoomRepository.GetRoom(id);
            if (room == null)
            {
                return NotFound();
            }
            var roomDto = _mapper.Map<RoomDto>(room);
            roomDto.Amenities = room.RoomAmenities.Select(ra => ra.AmenityId).ToList();
            roomDto.RoomTypes = room.RoomRoomTypes.Select(rrt => rrt.RoomTypeId).ToList();
            return Ok(roomDto);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateRoom([FromBody] RoomDto roomDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var room = _mapper.Map<Room>(roomDto);

            await _uow.RoomRepository.CreateRoom(room);
            var result = await _uow.SaveAsync();

            if (!result)
                return BadRequest("Failed to create room");

            // Handle RoomAmenities
            if (roomDto.Amenities != null && roomDto.Amenities.Any())
            {
                var roomAmenities = roomDto.Amenities.Select(aid => new RoomAmenity { AmenityId = aid, RoomId = room.Id }).ToList();
                _uow.RoomAmenityRepository.AddRange(roomAmenities);
            }

            // Handle RoomRoomTypes
            if (roomDto.RoomTypes != null && roomDto.RoomTypes.Any())
            {
                var roomRoomTypes = roomDto.RoomTypes.Select(rtid => new RoomRoomType { RoomTypeId = rtid, RoomId = room.Id }).ToList();
                _uow.RoomRoomTypeRepository.AddRange(roomRoomTypes);
            }

            if (!await _uow.SaveAsync())
                return BadRequest("Failed to create room");

            return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, roomDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] RoomDto roomDto)
        {
            if (id != roomDto.Id)
                return BadRequest("Room ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingRoom = await _uow.RoomRepository.GetRoom(id);
            if (existingRoom == null) return NotFound();

            _mapper.Map(roomDto, existingRoom);

            // Remove existing RoomAmenities and RoomRoomTypes
            var existingAmenities = await _uow.RoomAmenityRepository.GetRoomAmenities(id);
            _uow.RoomAmenityRepository.RemoveRange(existingAmenities);

            var existingRoomTypes = await _uow.RoomRoomTypeRepository.GetRoomRoomTypes(id);
            _uow.RoomRoomTypeRepository.RemoveRange(existingRoomTypes);

            // Add new RoomAmenities
            if (roomDto.Amenities != null && roomDto.Amenities.Any())
            {
                var roomAmenities = roomDto.Amenities.Select(aid => new RoomAmenity { AmenityId = aid, RoomId = id }).ToList();
                _uow.RoomAmenityRepository.AddRange(roomAmenities);
            }

            // Add new RoomRoomTypes
            if (roomDto.RoomTypes != null && roomDto.RoomTypes.Any())
            {
                var roomRoomTypes = roomDto.RoomTypes.Select(rtid => new RoomRoomType { RoomTypeId = rtid, RoomId = id }).ToList();
                _uow.RoomRoomTypeRepository.AddRange(roomRoomTypes);
            }

            _uow.RoomRepository.UpdateRoom(existingRoom);

            if (!await _uow.SaveAsync())
                return BadRequest("Failed to update room");

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            await _uow.RoomRepository.DeleteRoom(id);

            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest("Failed to delete room.");
            }
            return Ok();
        }
    }
}
