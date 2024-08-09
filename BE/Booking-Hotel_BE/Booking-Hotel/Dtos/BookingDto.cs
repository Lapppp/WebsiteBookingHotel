using Booking_Hotel.Models;

namespace Booking_Hotel.Dtos
{
    public class BookingDto
    {
        public string? Id { get; set; }

        public string? CustomerName { get; set; }
        public string? Email { get; set; }
        public int BookedRooms { get; set; }
        
        public string? PhoneNumber { get; set; }
        public DateTime CheckInDate { get; set; }
  
        public string Status { get; set; }
        public DateTime CheckOutDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal? TotalPrice { get; set; }
        public string? Note { get; set; }
        public string? UserID { get; set; }
        
        public PaymentMethod? PaymentMethod { get; set; }
        
        public User? User { get; set; }
        public int NumberPeople{ get; set; }
        public string? UserName { get; set; }
        public int? HotelId { get; set; }
 
        
        public string? couponCode { get; set; }
        
        public string StatusPayment { get; set; } 

        public decimal? Commission { get; set; }
 
        public decimal? MoneyReceived { get; set; }
     
        public int PaymentId { get; set; }
     

        public int? RoomId { get; set; }
       
         
        
        public Room? Room { get; set; }
        public decimal? discount { get; set; }
        
        
       
    }
}
