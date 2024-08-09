using AutoMapper;
using Booking_Hotel.Dtos;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photo;

        public UsersController(IUnitOfWork uow, IMapper mapper, IPhotoService photo)
        {
            _uow = uow;
            _mapper = mapper;
            _photo = photo;
        }
        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] UserDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User data is null");
            }

            return await _uow.UserRepository.RegisterAdmin(userDto.UserName, userDto.Password, userDto.Email, userDto.Phone);
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User data is null");
            }

            if (userDto.Password != userDto.ConfirmPassword)
            {
                var errorResponse = new { Message = "Password and Confirm Password do not match" };
                return new BadRequestObjectResult(errorResponse);
            }

            return await _uow.UserRepository.Register(userDto.UserName, userDto.Password, userDto.Email, userDto.Phone, userDto.ConfirmPassword);
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([Bind("Username,Password")] Login account)
        {
            return await _uow.UserRepository.Login(account);
        }
        [HttpGet]
        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            return await _uow.UserRepository.GetUsers();
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _uow.UserRepository.GetUser(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(string id, UserDto userDto)
        {
            return await _uow.UserRepository.UpdateUser(id, userDto);
        }
        [HttpPut]
        [Route("ChangePassword/{id}")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(string id, ChangePassword changePasswordModel)
        {
            return await _uow.UserRepository.ChangePassword(id, changePasswordModel);
        }
        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return NotFound();
            }
            return await _uow.UserRepository.ForgetPassword(email);
        }
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPassword model)
        {
            if (ModelState.IsValid)
            {
                return await _uow.UserRepository.ResetPassword(model);
            }
            return BadRequest("Some properties are not valid");
        }

        [HttpPost]
        [Route("add/photo/{id}")]
        [Authorize]
        public async Task<IActionResult> AddUserPhoto(string id, IFormFile file)
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

            var user = await _uow.UserRepository.GetUser(id);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            if (result != null && result.SecureUrl != null)
            {
                var image = new Image
                {
                    PublicImageId = result.PublicId,
                    URL = result.SecureUrl.ToString(),
                    UserID = user.Id,
                };

                user.Images.Add(image);
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
        [Route("delete-photo/{userId}/{publicId}")]
        [Authorize]
        public async Task<IActionResult> DeleteHotelPhoto(string userId, string publicId)
        {
            if (_uow == null || _uow.UserRepository == null)
            {
                return StatusCode(500, "Internal server error: Unit of Work or User Repository is null");
            }

            var user = await _uow.UserRepository.GetUser(userId);
            if (user == null)
            {
                return BadRequest("Hotel not found");
            }

            if (user.Images == null)
            {
                return BadRequest("Hotel images collection is null");
            }

            var image = user.Images.FirstOrDefault(i => i.PublicImageId == publicId);
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

            user.Images.Remove(image);
            await _uow.SaveAsync();

            return Ok(201);
        }


        [HttpGet]
        [Route("{userId}/images")]
        public async Task<IActionResult> GetUSerImages(string userId)
        {
            var images = await _uow.UserRepository.GetImagesByUserId(userId);
            return Ok(images);
        }
        [HttpGet("check-email")]
        public async Task<ActionResult<bool>> CheckEmail(string Email)
        {
            var user = await _uow.UserRepository.FindByEmailAsync(Email);
            return Ok(user != null);
        }

        [HttpGet("check-username")]
        public async Task<ActionResult<bool>> CheckUserName(string UserName)
        {
            var user = await _uow.UserRepository.FindByNameAsync(UserName);
            return Ok(user != null);
        }

        [HttpGet]
        [Route("total-users")]
        public async Task<IActionResult> GetTotalUsers()
        {
            var totalUsers = await _uow.UserRepository.GetTotalUsers();
            return Ok(totalUsers);
        }

        [HttpGet]
        [Route("active-users")]
        public async Task<IActionResult> GetActiveUsers()
        {
            var activeUsers = await _uow.UserRepository.GetActiveUsers();
            return Ok(activeUsers);
        }

        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string searchTerm)
        {
            var users = await _uow.UserRepository.SearchUsers(searchTerm);
            return Ok(users);
        }
    }
}
