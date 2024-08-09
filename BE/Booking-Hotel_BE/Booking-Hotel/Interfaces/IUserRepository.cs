using Booking_Hotel.Dtos;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IUserRepository
    {
        Task<IActionResult> RegisterAdmin(string Username, string Password, string Email, string Phone);
        Task<IActionResult> Register(string Username, string Password, string ConfirmPassword, string Email, string Phone);
        Task<IActionResult> Login([Bind("Username,Password")] Login account);
        Task<IActionResult> UpdateUser(string id, UserDto userDto);
        Task<IActionResult> ChangePassword(string id, ChangePassword changePasswordModel);
        Task<IEnumerable<UserDto>> GetUsers();
        Task<User> GetUser(string id);
        Task<User> GetUserByEmail(string email);
        Task<bool> UserExist(string id);
        Task<IActionResult> ForgetPassword(string email);
        Task<IActionResult> ResetPassword(ResetPassword model);
        Task<IEnumerable<Image>> GetImagesByUserId(string userId);
        Task<User> FindByEmailAsync(string Email);
        Task<User> FindByNameAsync(string UserName);
        Task<int> GetTotalUsers();
        Task<int> GetActiveUsers();
        Task<IEnumerable<UserDto>> SearchUsers(string searchTerm);
    }
}
