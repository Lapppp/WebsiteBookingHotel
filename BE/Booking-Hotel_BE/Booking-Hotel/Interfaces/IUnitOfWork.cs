namespace Booking_Hotel.Interfaces
{
    public interface IUnitOfWork
    {
        IAmenityRepository AmenityRepository { get; }

        IUserRepository UserRepository { get; }

        IRoomFacilityRepository RoomFacilityRepository { get; }

        ICommentRepository CommentRepository { get; }
        

        IWishlistRepository WishlistRepository { get; }

        IReviewRepository ReviewRepository { get; }

        IPromotionRepository PromotionRepository { get; }

        IRoomRepository RoomRepository { get; }

        IBookingRepository BookingRepository { get; }

        IBookingHistoryRepository BookingHistoryRepository { get; }

        IRoomTypeRepository RoomTypeRepository { get;  }

        IHotelRepository HotelRepository { get; }

        IInvoiceRepository InvoiceRepository { get; }

        IInvoiceDetailRepository InvoiceDetailRepository { get; }

        IRoomAmenityRepository RoomAmenityRepository { get; }

        IRoomRoomTypeRepository RoomRoomTypeRepository { get; }

        Task<bool> SaveAsync();
    }
}
