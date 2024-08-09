using AutoMapper;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Booking_Hotel.Repository;
using Microsoft.AspNetCore.Identity;

namespace Booking_Hotel.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly Booking_Hotel_Context _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        

        public UnitOfWork(Booking_Hotel_Context context,
            UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IMapper mapper, IEmailService emailService)
        {
            this._context = context;
            this._userManager = userManager;
            this._roleManager = roleManager;
            _configuration = configuration;
            this._mapper = mapper;
            _emailService = emailService;
            
        }

        public IAmenityRepository AmenityRepository => new AmenityRepository(_context);

        public IUserRepository UserRepository => new UserRepository(
            _context, _userManager, _roleManager, _configuration, _mapper, _emailService);

        public IRoomFacilityRepository RoomFacilityRepository => new RoomFacilityRepository(_context);

        public ICommentRepository CommentRepository => new CommentRepository(_context);

        public IWishlistRepository WishlistRepository => new WishlistRepository(_context);

        public IReviewRepository ReviewRepository => new ReviewRepository(_context);

        public IPromotionRepository PromotionRepository => new PromotionRepository(_context);

        public IRoomRepository RoomRepository => new RoomRepository(_context);

        public IBookingRepository BookingRepository => new BookingRepository(_context);

        public IRoomTypeRepository RoomTypeRepository => new RoomTypeRepository(_context);

        public IBookingHistoryRepository BookingHistoryRepository => new BookingHistoryRepository(_context);

        public IHotelRepository HotelRepository => new HotelRepository(_context);

        public IInvoiceRepository InvoiceRepository => new InvoiceRepository(_context);

        public IInvoiceDetailRepository InvoiceDetailRepository => new InvoiceDetailRepository(_context);

        public IRoomAmenityRepository RoomAmenityRepository => new RoomAmenityRepository(_context);

        public IRoomRoomTypeRepository RoomRoomTypeRepository => new RoomRoomTypeRepository(_context);
        
        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        
        
        
        
    }
}
