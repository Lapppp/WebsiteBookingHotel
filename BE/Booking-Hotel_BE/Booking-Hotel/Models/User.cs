using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Booking_Hotel.Models
{
    public class User : IdentityUser
    {
        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(255)]
        public ICollection<Image> Images { get; set; } = new List<Image>();

        //[JsonIgnore]
        //public List<Comment> Comments { get; set; }

        public List<Review> Reviews { get; set; } = new List<Review>();

        //public List<Wishlist> Wishlists { get; set; }

        //public List<PaymentMethod> PaymentMethods { get; set; }

        //public List<Booking> Bookings { get; set; }
    }
}
