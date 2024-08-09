using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Booking_Hotel.Models
{
    public class PaymentMethod
    {
        public int Id { get; set; }
        
        public string? UserID { get; set; } // Nullable string for optional UserID
        
        [JsonIgnore]
        [ForeignKey("UserID")]
        
        public User User { get; set; }
        
        
        [StringLength(999)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string Status { get; set; }       
        
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

    
    }
}