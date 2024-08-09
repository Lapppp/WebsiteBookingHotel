using Booking_Hotel.Interfaces;
using Microsoft.AspNetCore.Mvc;
    using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;


namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photo;

        public HotelsController(IUnitOfWork uow, IMapper mapper, IPhotoService photo)
        {
            _uow = uow;
            _mapper = mapper;
            _photo = photo;
        }

        [HttpGet]
        public async Task<IActionResult> GetHotels()
        {
            var hotels = await _uow.HotelRepository.GetHotels();
            var hotelsDto = _mapper.Map<IEnumerable<Hotel>>(hotels);
            return Ok(hotelsDto);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetHotel(int id)
        {
            var hotel = await _uow.HotelRepository.GetHotel(id);
            var hotelDto = _mapper.Map<Hotel>(hotel);
            return Ok(hotelDto);
        }
        [HttpGet]
        [Route("byname/{name}")]
        public async Task<IActionResult> GetHotelByName(string name)
        {
            var hotel = await _uow.HotelRepository.GetHotelByName(name);
            var hotelDto = _mapper.Map<Hotel>(hotel);
            return Ok(hotelDto);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateHotel([FromBody] Hotel hotel)
        {
            if (hotel == null)
            {
                return BadRequest("Invalid hotel data.");
            }

            // Check if the hotel already exists
            var checkHotel = await _uow.HotelRepository.HotelExists(hotel.Id);
            if (checkHotel)
            {
                return BadRequest("Hotel already exists.");
            }

            // Check if the hotel already exists by name
            var existingHotel = await _uow.HotelRepository.GetHotelByName(hotel.Name);
            if (existingHotel != null)
            {
                return BadRequest($"A hotel with the name '{hotel.Name}' already exists.");
            }

            // Add the hotel to the repository
            _uow.HotelRepository.CreateHotel(hotel);

            // Save changes to the database
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            // Return the created hotel with its ID
            return CreatedAtAction(nameof(GetHotel), new { id = hotel.Id }, hotel);
        }


        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateHotel(int id, Hotel hotel)
        {
            if (id != hotel.Id)
            {
                return BadRequest();
            }

            return await _uow.HotelRepository.UpdateHotel(hotel);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            await _uow.HotelRepository.DeleteHotel(id);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPost]
        [Route("add/photo/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddHotelPhoto(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file was uploaded or the file is empty.");
            }

            var result = await _photo.UploadPhotoAsync(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var hotel = await _uow.HotelRepository.GetHotel(id);
            if (hotel == null)
            {
                return NotFound($"Hotel with ID {id} not found.");
            }

            if (result != null && result.SecureUrl != null)
            {
                var image = new Image
                {
                    PublicImageId = result.PublicId,
                    URL = result.SecureUrl.ToString(),
                    HotelID = hotel.Id,
                };

                hotel.Images.Add(image);
                var saveResult = await _uow.SaveAsync();

                if (saveResult)
                {
                    return Ok(new { message = "Photo added successfully.", image });
                }
                else
                {
                    return StatusCode(500, "An error occurred while saving the photo.");
                }
            }

            return StatusCode(500, "An unexpected error occurred.");
        }


        [HttpDelete]
        [Route("delete-photo/{hotelId}/{publicId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteHotelPhoto(int hotelId, string publicId)
        {
            if (_uow == null || _uow.HotelRepository == null)
            {
                return StatusCode(500, "Internal server error: Unit of Work or Hotel Repository is null");
            }

            var hotel = await _uow.HotelRepository.GetHotel(hotelId);
            if (hotel == null)
            {
                return BadRequest("Hotel not found");
            }

            if (hotel.Images == null)
            {
                return BadRequest("Hotel images collection is null");
            }

            var image = hotel.Images.FirstOrDefault(i => i.PublicImageId == publicId);
            if (image == null)
            {
                return BadRequest("Image not found");
            }

            if (_photo == null)
            {
                return StatusCode(500, "Internal server error: Photo service is null");
            }

            var result = await _photo.DeletePhotoAsync(image.PublicImageId);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            hotel.Images.Remove(image);
            await _uow.SaveAsync();

            return Ok(201);
        }


        [HttpGet]
        [Route("{hotelId}/images")]
        public async Task<IActionResult> GetHotelImages(int hotelId)
        {
            var images = await _uow.HotelRepository.GetImagesByHotelId(hotelId);
            return Ok(images);
        }
    }

}
