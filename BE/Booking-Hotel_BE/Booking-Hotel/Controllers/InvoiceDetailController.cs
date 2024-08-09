using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceDetailController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public InvoiceDetailController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        [Route("GetInvoiceDetails/{invoiceId}")]
        public async Task<IActionResult> GetInvoiceDetails(string invoiceId)
        {
            var invoiceDetail = await _uow.InvoiceDetailRepository.GetInvoiceDetails(invoiceId);
            return Ok(invoiceDetail);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetInvoiceDetail(int id)
        {
            var invoice = await _uow.InvoiceDetailRepository.GetInvoiceDetail(id);
            return Ok(invoice);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            var checkInvoiceDetail = await _uow.InvoiceDetailRepository.InvoiceDetailExist(invoiceDetail.Id);
            if (checkInvoiceDetail)
            {
                return BadRequest();
            }

            await _uow.InvoiceDetailRepository.CreateInvoiceDetail(invoiceDetail);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}