using System.ComponentModel.DataAnnotations;

namespace Booking_Hotel.Models
{
    public class ChangePassword
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
