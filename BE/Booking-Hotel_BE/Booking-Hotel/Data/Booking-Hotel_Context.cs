using Booking_Hotel.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Booking_Hotel.Data
{
    public class Booking_Hotel_Context : IdentityDbContext<User>
    {
        public Booking_Hotel_Context(DbContextOptions<Booking_Hotel_Context> options) : base(options)
        {
        }
        public DbSet<Wishlist> Wishlist { get; set; } = default!;
        public DbSet<Amenity> Amenity { get; set; } = default!;

        public DbSet<Booking> Booking { get; set; } = default!;

        public DbSet<BookingHistory> BookingsHistory { get; set; } = default!;

        public DbSet<Comment> Comments { get; set; } = default!;

        public DbSet<Hotel> Hotels { get; set; } = default!;

        public DbSet<Image> Images { get; set; } = default!;

        public DbSet<PaymentMethod> PaymentMethods { get; set; } = default!;

        public DbSet<Promotion> Promotion { get; set; } = default!;

        public DbSet<Review> Reviews { get; set; } = default!;

        public DbSet<Room> Rooms { get; set; } = default!;

        public DbSet<RoomAmenity> RoomAmenities { get; set; } = default!;

        public DbSet<RoomFacility> RoomsFacility { get; set; } = default!;

        public DbSet<RoomFacilityAssociation> RoomsFacilityAssociation { get; set; } = default!;

        public DbSet<RoomType> RoomTypes { get; set; } = default!;

        public DbSet<RoomRoomType> RoomRoomTypes { get; set; } = default!;

   

        public DbSet<UserRole> UserRole { get; set; } = default!;

        public DbSet<Invoice> Invoice { get; set; } = default!;

        public DbSet<InvoiceDetail> InvoiceDetail { get; set; } = default!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.PaymentMethod)
                .WithMany()
                .HasForeignKey(b => b.PaymentId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Room)
                .WithMany()
                .HasForeignKey(b => b.RoomId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserID)
                .OnDelete(DeleteBehavior.NoAction);
        }
    
    }
}
