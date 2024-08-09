using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking_Hotel.Models
{
    public class Promotion
    {
        public Promotion() {
            Status = "Active";
        }
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        [Required]
        public double Discount { get; set; }

        [StringLength(50)]
        public string CouponCode { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [StringLength(999)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string Status { get; set; }

        public int HotelID { get; set; }

        [ForeignKey("HotelID")]
        public Hotel? Hotel { get; set; }
    }
}
