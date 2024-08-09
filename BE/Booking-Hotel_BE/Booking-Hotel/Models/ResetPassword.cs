using System.ComponentModel.DataAnnotations;

namespace Booking_Hotel.Models
{
    public class ResetPassword
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string NewPassword { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}
