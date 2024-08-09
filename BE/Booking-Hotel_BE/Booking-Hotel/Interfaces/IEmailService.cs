using Booking_Hotel.Helpers;
using Booking_Hotel.Models;

namespace Booking_Hotel.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(Mailrequest mailrequest);
    }
}
