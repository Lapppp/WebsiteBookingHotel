using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Booking_Hotel.Repository
{
    public class InvoiceDetailRepository : IInvoiceDetailRepository
    {
        private readonly Booking_Hotel_Context _context;
        public InvoiceDetailRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InvoiceDetail>> GetInvoiceDetails(string invoiceId)
        {
            return await _context.InvoiceDetail.Include(i => i.Invoice).Where(i => i.InvoiceId == invoiceId).ToListAsync();
        }

        public async Task<InvoiceDetail> GetInvoiceDetail(int id)
        {
            return await _context.InvoiceDetail.Include(i => i.Invoice).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task CreateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            await _context.InvoiceDetail.AddAsync(invoiceDetail);
        }

        public async Task<IActionResult> UpdateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            _context.Entry(invoiceDetail).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await InvoiceDetailExist(invoiceDetail.Id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw;
                }
            }
            return new OkResult();
        }

        public async Task<bool> InvoiceDetailExist(int id)
        {
            return await _context.InvoiceDetail.AnyAsync(i => i.Id == id);
        }
    }
}