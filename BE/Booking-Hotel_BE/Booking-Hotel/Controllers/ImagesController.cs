using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly Booking_Hotel_Context _context;

        public ImagesController(IPhotoService photoService, Booking_Hotel_Context context)
        {
            _photoService = photoService;
            _context = context;
        }

        [HttpPost("upload")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadPhoto(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file provided");
            }

            var result = await _photoService.UploadPhotoAsync(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            if (result != null && result.SecureUrl != null)
            {
                var image = new Image
                {
                    PublicImageId = result.PublicId,
                    URL = result.SecureUrl.ToString()
                };

                _context.Images.Add(image);
                await _context.SaveChangesAsync();
                return Ok(new { image });
            }
            return StatusCode(500, "An unexpected error occurred.");
        }
        [HttpDelete("delete/{publicId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePhoto(string publicId)
        {
            var result = await _photoService.DeletePhotoAsync(publicId);

            if (result.Result == "ok")
            {
                var photo = await GetPhotoByPublicIdAsync(publicId);
                if (photo != null)
                {
                    _context.Images.Remove(photo);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }

            return BadRequest("Failed to delete photo");
        }

        [HttpGet]
        public async Task<IEnumerable<Image>> GetAllPhotosAsync()
        {
            return await _context.Images.Include(i => i.User).Include(i => i.Hotel).ToListAsync();
        }
        
        [HttpGet]
        [Route("{publicImageID}")]
        public async Task<Image> GetPhotoByPublicIdAsync(string publicImageID)
        {
            return await _context.Images.Include(i => i.User).Include(i => i.Hotel).FirstOrDefaultAsync(i => i.PublicImageId == publicImageID);
        }
    }
}
