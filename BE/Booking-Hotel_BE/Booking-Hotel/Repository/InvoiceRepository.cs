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
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly Booking_Hotel_Context _context;
        public InvoiceRepository (Booking_Hotel_Context context){
            _context = context;
        }

        public async Task<IEnumerable<Invoice>> GetInvoices(string bookingId)
        {
            return await _context.Invoice.Include(bh => bh.Booking).Where(bh => bh.BookingId == bookingId).ToListAsync();
        }

        public async Task<Invoice> GetInvoice(string id)
        {
            return await _context.Invoice.Include(i => i.Booking).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task CreateInvoice(Invoice invoice)
        {
            invoice.Id = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            await _context.Invoice.AddAsync(invoice);
        }

        public async Task<bool> InvoiceExist(string id){
            return await _context.Invoice.AnyAsync(i => i.Id == id);
        }
        
        public async Task<IEnumerable<Invoice>> SearchInvoices(string searchTerm)
        {
            return await _context.Invoice
                .Include(i => i.Booking)
                .Where(i => i.Id.Contains(searchTerm) || i.BookingId.Contains(searchTerm))
                .ToListAsync();
        }

        public async Task<Dictionary<string, double>> GetTotalInvoicedByMonth()
        {
            var totalsByMonth = await _context.Invoice
                .Where(d => d.Date != null) // Đảm bảo InvoiceDate không null để tránh lỗi
                .GroupBy(d => new { Year = d.Date.Year, Month = d.Date.Month })
                .Select(g => new
                {
                    Month = $"{g.Key.Year}-{g.Key.Month.ToString("00")}", // Format month as "YYYY-MM"
                    Total = g.Sum(d => d.Total)
                })
                .ToDictionaryAsync(g => g.Month, g => g.Total);

            return totalsByMonth;
        }

    }
}