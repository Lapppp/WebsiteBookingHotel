using Booking_Hotel.Helpers;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        
        
        private readonly IEmailService _emailService;
        public EmailController( IEmailService emailService)
        {
            _emailService = emailService;
        }
      

        /*[HttpPost]
        public IActionResult SendEmail(Email body) {
            _emailService.SendEmail(body);

            return Ok();
        }*/
        [HttpPost("SendMail")]
        public async Task<IActionResult> SendMail()
        {
            try
            {
                Mailrequest mailrequest = new Mailrequest();
                mailrequest.ToEmail = "xuanlap250203@gmail.com";
                mailrequest.Subject = "Chào mừng bạn đến dịch vụ đặt khách sạn LH";
                mailrequest.Body = GetHtmlcontent();
                await _emailService.SendEmailAsync(mailrequest);
                return Ok();
            }
            catch(Exception ex)
            {
                throw;
            }
        }
        private string GetHtmlcontent()
        {
            string Response = "<div style=\"width:100%;background-color:lightblue;text-align:center;margin:10px\">";
            Response += "<h1>Welcome to Nihira Techiees</h1>";
            Response += "<img src=\"https://yt3.googleusercontent.com/v5hyLB4am6E0GZ3y-JXVCxT9g8157eSeNggTZKkWRSfq_B12sCCiZmRhZ4JmRop-nMA18D2IPw=s176-c-k-c0x00ffffff-no-rj\" />";
            Response += "<h2>Thanks for subscribed us</h2>";
            Response += "<a href=\"https://www.youtube.com/channel/UCsbmVmB_or8sVLLEq4XhE_A/join\">Please join membership by click the link</a>";
            Response += "<div><h1> Contact us : nihiratechiees@gmail.com</h1></div>";
            Response += "</div>";
            return Response;
        }
    }
    
}
