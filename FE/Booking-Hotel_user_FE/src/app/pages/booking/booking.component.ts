// import {Component, OnInit} from '@angular/core';
// import {AuthService} from "../../services/auth.service";
// import {BookingService} from "./booking.service";
// import {Booking, HistoryBooking} from "./booking";
// import {ToastrService} from "ngx-toastr";
// import {UserService} from "../../user/user.service";
// import {User} from "../../user/user";
// import {MatDialog} from "@angular/material/dialog";
// import {Router} from "@angular/router";
// import {RoomService} from "../../hotel/servicce/room.service";
// import {ReviewService} from "../review/review.service";
// import {Review} from "../review/review";
// import {Hotel} from "../../hotel/hotel";
// import {HotelService} from "../../hotel/servicce/hotel.service";
// import {ModaldangnhapComponent} from "../modaldangnhap/modaldangnhap.component";
// import {ModalhuyComponent} from "../modalhuy/modalhuy.component";
// import {ReviewComponent} from "../review/review.component";
//
// import {MessageService} from 'primeng/api';
//
//
//
//
// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrl: './booking.component.scss',
//   providers: [MessageService]
// })
// export class BookingComponent implements OnInit {
//   currentUser: User | null = null;
//
//   constructor(
//     private authService: AuthService,
//     private bookingService: BookingService,
//     private toastr: ToastrService,
//     private userService: UserService,
//     private dialog: MatDialog,
//     private router: Router,
//     private roomService: RoomService,
//     private reviewService: ReviewService,
//     private hotelService: HotelService,
//   ) {
//   }
//
//   userId: string = '';
//   isLoggedIn: boolean = false;
//
//   hotelid: number = 0;
//
//   ngOnInit(): void {
//
//     this.isLoggedIn = this.authService.isAuthenticated();
//     if (this.isLoggedIn) {
//       this.currentUser = this.authService.getCurrentUser();
//       if (this.currentUser) {
//         this.userId = this.currentUser.id;
//         this.getBookings();
//       }
//     }
//     this.getUser()
//     this.getReviews();
//     this.getBookings()
//   }
//
//
//   Bookings: Booking[] = [];
//   reviews: Review[] = [];
//
//   getBookings() {
//     this.bookingService.getBookings().subscribe(
//       (bookings) => {
//         this.Bookings = bookings;
//         this.Bookings.forEach(booking => {
//           console.log('hoteld bookgin ', this.Bookings)
//           if (booking.hotelId) {
//             this.getHotelDetails(booking.hotelId);
//
//           }
//
//         });
//
//       },
//       (error) => {
//         console.error("Lỗi khi tải danh sách đặt phòng:", error);
//         this.toastr.error("Lỗi khi tải danh sách đặt phòng", "Lỗi");
//       }
//     );
//   }
//
//   getReviews() {
//     this.reviewService.getReviews().subscribe(
//       (reviews) => {
//         this.reviews = reviews;
//         console.log("Reviews: ", this.reviews);
//       },
//       (error) => {
//         console.error("Lỗi khi tải danh sách đánh giá:", error);
//         this.toastr.error("Lỗi khi tải danh sách đánh giá", "Lỗi");
//       }
//     );
//   }
//
//   user: User[] = [];
//
//   getUser() {
//     this.userService.getUsers().subscribe(
//       (user) => {
//         this.user = user;
//         console.log("user: ", user);
//       },
//       (error) => {
//         console.error("Lỗi khi tải danh sách đặt phòng:", error);
//         this.toastr.error("Lỗi khi tải danh sách đặt phòng", "Lỗi");
//       }
//     );
//   }
//
//
//   changestatus(bookingId: string) {
//
//     const dialogRef = this.dialog.open(ModalhuyComponent);
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         this.Huyphong(bookingId);
//       }
//     });
//
//   }
//
//   Huyphong(bookingId: string) {
//     const HistoryBooking: HistoryBooking = {
//       status: 'đã huỷ',
//       bookingID: bookingId,
//     }
//     if (!this.userId) {
//       const dialogRef = this.dialog.open(ModaldangnhapComponent);
//     } else {
//       this.bookingService.addbookingHistory(HistoryBooking).subscribe({
//         next: () => {
//           this.toastr.success('Cập nhật trạng thái thành công');
//         },
//         error: (err) => {
//           console.error('Cập nhật trạng thái thất bại', err);
//           this.toastr.error('Cập nhật trạng thái thất bại', 'Lỗi');
//         }
//       })
//       this.bookingService.changstatusBooking(bookingId).subscribe({
//         next: () => {
//           this.toastr.success('Cập nhật trạng thái thành công');
//         },
//         error: (err) => {
//           console.error('Cập nhật trạng thái thất bại', err);
//           this.toastr.error('Cập nhật trạng thái thất bại', 'Lỗi');
//         }
//       })
//     }
//   }
//
//
//   isLogin: boolean = false;
//
//   navigateToReview(bookingId: string) {
//     if (!this.userId) {
//       const dialogRef = this.dialog.open(ModaldangnhapComponent);
//     }
//     const customReview = this.Bookings.find(mail => mail.id === bookingId);
//     if (!customReview) {
//       return;
//     } else {
//       const review = {
//         bookingId: bookingId,
//         UserId: this.userId,
//         hotelId: customReview.hotelId,
//
//       }
//       if (!this.currentUser) {
//         this.isLogin = true;
//
//       } else {
//
//         this.router.navigate(['/page/review'], {queryParams: review});
//       }
//     }
//
//   }
//
//   hasReviewed(bookingId: string): boolean {
//     return this.reviews.some(review => review.bookingId === bookingId && review.status === 'đã đánh giá');
//   }
//
//   getFormattedDate(dateString: string): string {
//     const date = new Date(dateString);
//     const daysOfWeek = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
//     const dayOfWeek = daysOfWeek[date.getDay()];
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//
//     return `${dayOfWeek}, ${day} tháng ${month} ${year}`;
//   }
//
//   lap: number = 0;
//
//
//
//   hotelDetails: { [key: number]: Hotel } = {};
//
//   getHotelDetails(hotelid: number): void {
//     this.hotelService.getHotelById(hotelid).subscribe(
//       (hotel: Hotel) => {
//         if (hotel) {
//
//           this.hotelDetails[hotelid] = hotel;
//         } else {
//           console.error("No hotel found with ID:", hotelid);
//         }
//       },
//       (error) => {
//         console.log("Error fetching hotel:", error);
//       }
//     );
//   }
//
//   confirmreview(bookingId: string) {
//     const dialogRef = this.dialog.open(ReviewComponent);
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         this.navigateToReview(bookingId);
//       }
//     });
//   }
//
//   openReviewModal(bookingId: string, hotelId: number): void {
//     const dialogRef = this.dialog.open(ReviewComponent, {
//       width: '600px',
//       data: {bookingId: bookingId, hotelId: hotelId}
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//       // Xử lý đóng modal nếu cần thiết
//       console.log('The dialog was closed');
//     });
//
//     dialogRef.componentInstance.reviewSubmitted.subscribe((reviewData: any) => {
//       // Gửi dữ liệu đánh giá đến service hoặc xử lý của bạn
//       reviewData.bookingId = bookingId; // Thêm bookingId vào dữ liệu đánh giá
//       reviewData.hotelId = hotelId; // Thêm hotelId vào dữ liệu đánh giá
//       reviewData.userId = this.userId; // Thêm userId vào dữ liệu đánh giá
//       reviewData.status = 'đã đánh giá';
//       console.log('Review submitted:', reviewData);
//       this.reviewService.addReview(reviewData).subscribe(
//         (response) => {
//           // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
//           console.log('Review submitted successfully:', response);
//         },
//         (error) => {
//           console.error('Failed to submit review:', error);
//
//         }
//       );
//     });
//   }
//
//
// }
// booking.component.ts
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {BookingService} from "./booking.service";
import {Booking, HistoryBooking} from "./booking";
import {ToastrService} from "ngx-toastr";
import {Promotion} from "../../pay/promotion";
import {UserService} from "../../user/user.service";
import {User} from "../../user/user";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RoomService} from "../../hotel/servicce/room.service";
import {ReviewService} from "../review/review.service";
import {Review} from "../review/review";
import {PayService} from "../../pay/pay.service";
import {Hotel} from "../../hotel/hotel";
import {HotelService} from "../../hotel/servicce/hotel.service";
import {FormGroup} from "@angular/forms";
import {ModaldangnhapComponent} from "../modaldangnhap/modaldangnhap.component";
import {ModalhuyComponent} from "../modalhuy/modalhuy.component";
import {ReviewComponent} from "../review/review.component";
import {MessageService} from 'primeng/api';
import {MatSnackBar} from "@angular/material/snack-bar";

declare global {
  interface JQuery {
    modal(options?: any): JQuery;
  }
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [MessageService]
})
export class BookingComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private toastr: ToastrService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private roomService: RoomService,
    private reviewService: ReviewService,
    private payService: PayService,
    private snackBar: MatSnackBar,
    private hotelService: HotelService,
  ) {}

  userId: string = '';
  isLoggedIn: boolean = false;
  hotelDetails: { [key: number]: Hotel } = {};
  hotelId: number = 0;
  bookingId: number = 0;
  totalprice: number = 0;
  Bookings: Booking[] = [];
  reviews: Review[] = [];
  user: User[] = [];
  checkemail: string = "";
  mailMessage: string = '';
  isLogin: boolean = false;
  savings: number = 0;
  finalPrice: number = 1;
  discountPercentage: number = 0;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.currentUser = this.authService.getCurrentUser();
      if (this.currentUser) {
        this.userId = this.currentUser.id;
        this.isLogin = true;
        this.getBookings();
      }
    }
    this.getUser();
    this.getReviews();
  }
  onLoginClick(): void {
    this.authService.savePreviousUrl(this.router.url);
    this.router.navigate(['/login']);
  }
  onRegisterClick(): void {
    this.authService.savePreviousUrl(this.router.url);
    this.router.navigate(['/register']);
  }
  getTimeAgo(createdAt: string): string {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const difference = currentDate.getTime() - createdDate.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds} giây trước`;
    }
  }

  getBookings() {
    this.bookingService.getBookings().subscribe(
      (bookings) => {
        bookings.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA; // Ngày mới nhất sẽ được xếp lên đầu
        });
        this.filteredBookings = bookings;

        this.Bookings = bookings;
        this.Bookings.forEach(booking => {
          if (booking.hotelId) {
            this.hotelService.getHotelById(booking.hotelId).subscribe(
              (hotel: Hotel) => {
                this.hotelDetails[booking.hotelId] = hotel;
              },
              error => {
                console.error("Lỗi khi lấy thông tin khách sạn:", error);
              }
            );
          }
        });
      },
      error => {
        console.error('Lỗi khi tải danh sách đặt phòng:', error);
      }
    );
  }

    changestatus(bookingId: string) {

    const dialogRef = this.dialog.open(ModalhuyComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Huyphong(bookingId);
      }
    });

  }

  Huyphong(bookingId: string) {
    const HistoryBooking: HistoryBooking = {
      status: 'đã huỷ',
      bookingID: bookingId,
    }

      this.bookingService.changstatusBooking(bookingId).subscribe({
        next: () => {
          this.toastr.success('Huỷ phòng thành công');
          location.reload();
        },
        error: (err) => {

          this.toastr.error('Huỷ phòng thất bại', 'Lỗi');
        }
      })

  }


  getUser() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.user = users;
      },
      (error) => {
        console.error('Lỗi khi tải danh sách người dùng:', error);
      }
    );
  }

  getReviews() {
    this.reviewService.getReviews().subscribe(
      (reviews) => {
        this.reviews = reviews;

      },
      (error) => {
        console.error('Lỗi khi tải đánh giá:', error);
      }
    );
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  hasReviewed(bookingId: string): boolean {
    return this.reviews.some(review => review.bookingId === bookingId);
  }
  openReviewModal(bookingId: string, hotelId: number): void {
    const dialogRef = this.dialog.open(ReviewComponent, {
      width: '600px',
      data: {bookingId: bookingId, hotelId: hotelId}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Xử lý đóng modal nếu cần thiết
      console.log('The dialog was closed');
    });

    dialogRef.componentInstance.reviewSubmitted.subscribe((reviewData: any) => {
      // Gửi dữ liệu đánh giá đến service hoặc xử lý của bạn
      reviewData.bookingId = bookingId; // Thêm bookingId vào dữ liệu đánh giá
      reviewData.hotelId = hotelId; // Thêm hotelId vào dữ liệu đánh giá
      reviewData.userId = this.userId; // Thêm userId vào dữ liệu đánh giá
      reviewData.status = 'đã đánh giá';
      console.log('Review submitted:', reviewData);
      this.reviewService.addReview(reviewData).subscribe(
        (response) => {
         this.toastr.success('Đánh giá thành công');
          setTimeout(() => {
            location.reload();
          }, 3000);
        },
        (error) => {
          console.error('Failed to submit review:', error);

        }
      );
    });
  }
  filteredBookings: Booking[] = [];

  onStatusChange(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    console.log("even ", status)
    if (status === 'all') {
      this.Bookings = this.filteredBookings;
    } else {
      this.Bookings = this.filteredBookings.filter(booking => booking.status === status);
    }
  }

}
