using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : Controller
    {
        private readonly IUnitOfWork _uow;

        public InvoicesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        [Route("GetInvoices/{bookingId}")]
        public async Task<IActionResult> GetInvoices(string bookingId)
        {
            var invoices = await _uow.InvoiceRepository.GetInvoices(bookingId);
            return Ok(invoices);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetInvoice(string id)
        {
            var invoice = await _uow.InvoiceRepository.GetInvoice(id);
            return Ok(invoice);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateInvoice(Invoice invoice)
        {
            // ID should be generated on the server side
            await _uow.InvoiceRepository.CreateInvoice(invoice);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest("Could not save the invoice.");
            }
            return Ok();
        }
        
        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchInvoices([FromQuery] string searchTerm)
        {
            var invoices = await _uow.InvoiceRepository.SearchInvoices(searchTerm);
            return Ok(invoices);
        }

        [HttpGet]
        [Route("GetTotalInvoiced")]
        public async Task<IActionResult> GetTotalInvoiced()
        {
            var totalAmount = await _uow.InvoiceRepository.GetTotalInvoicedByMonth();
            return Ok(totalAmount);
        }
    }
}
