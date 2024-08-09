import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hotel} from '../hotel';
import {HotelService} from '../servicce/hotel.service';
import {MatDialog} from "@angular/material/dialog";
import {RoomType, Room, Amenity} from "../room";
import {RoomService} from "../servicce/room.service";
import {forkJoin, map} from "rxjs";
import {SearchService} from '../servicce/search.service';
import {AuthService} from "../../services/auth.service";
import {User} from "../../user/user";
import {ToastrService} from "ngx-toastr";
import {ModaldangnhapComponent} from "../../pages/modaldangnhap/modaldangnhap.component";
import {ReviewService} from "../../pages/review/review.service";
import {Review} from "../../pages/review/review";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  hotels: Hotel[] = [];
  temp: Hotel[] = [];
  roomTypes: RoomType[] = [];
  hotel: Hotel | undefined;
  roomsByHotel: { [hotelId: number]: Room[] } = {};
  roomTypesByHotel: { [hotelId: number]: RoomType[] } = {};
  amenities: Amenity[] = [];
  totalprice: number = 0;
  //page
  dropdownOpen: boolean = false;
  minCheckOutDate!: string;
  destination: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  adults: number = 1;
  sizeRoom: number = 1;
  minCheckInDate!: string;
  numberOfDays: number = 1;

  // tiền
  userId: string = '';
  currentUser: User | null = null;

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    public dialog: MatDialog,
    private router: Router,
    private searchService: SearchService,
    private authService: AuthService,
    private toastr: ToastrService,
    private reviewService: ReviewService,
  ) {
  }

  ngOnInit(): void {
    this.getHotels();
    this.searchHotels();
    this.setDefaultDates();
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.userId = this.currentUser.id;
      this.fetchWishlist();
    }

  }


  onCheckOutChange(): void {
    this.updateNumberOfDays();
  }

  updateNumberOfDays(): void {
    const checkInDate = new Date(this.checkInDate);
    const checkOutDate = new Date(this.checkOutDate);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  }

  setDefaultDates(): void {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.updateNumberOfDays();
    this.minCheckInDate = this.formatDate(today);
    this.checkInDate = this.formatDate(today);
    this.checkOutDate = this.formatDate(tomorrow);
    this.minCheckOutDate = this.checkOutDate;
    this.searchService.searchParams$.subscribe(params => {
      this.checkInDate = params['checkInDate'] || this.checkInDate;
      this.checkOutDate = params['checkOutDate'] || this.checkOutDate;
      this.adults = params['adults'] || this.adults;
      this.sizeRoom = params['sizeRoom'] || this.sizeRoom;
      this.destination = params['destination'] || this.destination;
      this.totalprice = params['totalprice'] || this.totalprice;
      this.updateNumberOfDays();
    });
  }

  onCheckInChange(): void {
    const checkInDate = new Date(this.checkInDate);
    const minCheckOut = new Date(checkInDate);
    minCheckOut.setDate(checkInDate.getDate() + 1);

    this.minCheckOutDate = this.formatDate(minCheckOut);

    if (new Date(this.checkOutDate) <= checkInDate) {
      this.checkOutDate = this.minCheckOutDate;
    }
    this.updateNumberOfDays();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;

  }

  increment(field: string) {
    if (field === 'sizeRoom') {
      this.sizeRoom++;
    } else if (field === 'adults') {
      this.adults++;
    }
  }


  decrement(field: string) {
    if (field === 'sizeRoom' && this.sizeRoom > 1) {
      this.sizeRoom--;
    } else if (field === 'adults' && this.adults > 1) {
      this.adults--;
    }
  }


  getHotels(): void {
    this.hotelService.getHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
        this.hotelall = data;
        this.temp = [...data];
        this.filteredHotels = this.hotels
        this.hotels.forEach(hotel => {
          this.getReviews(hotel.id);
        });
        data.forEach(hotel => {
          this.getRoomsByHotelId(hotel.id);

        });
      },
      error: (error) => {
        console.log('Error fetching hotels:', error);
      }
    });
  }


  getRoomsByHotelId(hotelId: number): void {
    this.roomService.getRoomsByHotelId(hotelId).subscribe(
      (rooms: Room[]) => {
        this.roomsByHotel[hotelId] = rooms;

        this.getRoomTypesByHotelId(hotelId, rooms);
        rooms.forEach(room => {
          this.getAmenitiesi(room.id);
          this.getRoomTypeId(room.id);
        });
      },
      (error) => {
        console.log("Error fetching rooms:", error);
      }
    );
  }



  getRoomTypesByHotelId(hotelId: number, rooms: Room[]): void {
    const roomIds = rooms.map(room => room.id);
    this.roomService.getRoomTypesByIds(roomIds).subscribe({
      next: (roomTypes: RoomType[]) => {
        this.roomTypesByHotel[hotelId] = roomTypes;
      },
      error: (error) => {
        console.log('Error fetching room types:', error);
      }
    });
  }

  getAmenitiesi(roomId: number): void {
    this.roomService.getRoomAmenitiesByRoomId(roomId).subscribe({
      next: (data: any[]) => {
        this.amenities = data;
        const amenityIds = data.map(item => item.amenityId);
        this.getAmenities(amenityIds);
      },
      error: (error) => {
        console.log('Error fetching amenities:', error);
      }
    });
  }

  getRoomTypeId(roomId: number): void {
    this.roomService.getRoomRoomTypesByRoomId(roomId).subscribe({
      next: (data: any[]) => {
        const roomTypeIds = data.map(item => item.roomId);
        this.getRoomtypeIds(roomTypeIds);
      },
      error: (error) => {
        console.log('Error fetching room types:', error);
      }
    });
  }

  getAmenities(amenitiesId: number[]): void {
    this.roomService.getAmenitiesByIds(amenitiesId).subscribe({
      next: (data: Amenity[]) => {
        this.amenities = data;
      },
      error: (error) => {
        console.log('Error fetching amenities:', error);
      }
    });
  }

  getRoomtypeIds(roomtypeIds: number[]): void {
    const observables = roomtypeIds.map(id => this.roomService.getRoomTypeById(id));
    forkJoin(observables).subscribe({
      next: (data: RoomType[]) => {
        this.roomTypes = data;
        // this.typep=[...data];

      },
      error: (error) => {
        console.log('Error fetching room types:', error);
      }
    });
  }


  searchHotels(): void {

    this.searchService.searchParams$.subscribe(params => {
      this.checkInDate = params['checkInDate'] || '';
      this.checkOutDate = params['checkOutDate'] || '';
      this.adults = params['adults'] || 1;
      this.destination = params['destination'] || '';
      this.sizeRoom = params['sizeRoom'] || 1;

      this.hotelService.getHotels().subscribe({
        next: (data: Hotel[]) => {
          // Tạo danh sách các observable để lấy các phòng của từng khách sạn
          const hotelObservables = data.map(hotel =>
            this.roomService.getRoomsByHotelId(hotel.id).pipe(
              map(rooms => ({hotel, rooms}))
            )
          );

          forkJoin(hotelObservables).subscribe({
            next: (hotelRoomsData: { hotel: Hotel, rooms: Room[] }[]) => {
              this.hotels = hotelRoomsData.filter(hotelRooms => {
                const {hotel, rooms} = hotelRooms;
                const name = hotel.name ? hotel.name.toLowerCase() : '';
                const address = hotel.address ? hotel.address.toLowerCase() : '';
                const country = hotel.country ? hotel.country.toLowerCase() : '';
                const city = hotel.city ? hotel.city.toLowerCase() : '';
                const matchesDestination = name.includes(this.destination.toLowerCase()) || address.includes(this.destination.toLowerCase()) || country.includes(this.destination.toLowerCase()) || city.includes(this.destination.toLowerCase());
                const matchesSize = rooms.some(room => room.capacity >= this.adults);

                const matchesTotalRooms = rooms.some(room => room.roomNumber >= this.sizeRoom);
                return matchesDestination && matchesSize && matchesTotalRooms;
              }).map(hotelRooms => hotelRooms.hotel);

              this.temp = [...this.hotels];
              this.hotels.forEach(hotel => {
                this.getRoomsByHotelId(hotel.id);
              });
            },
            error: (error) => {
              console.log('Error fetching rooms:', error);
            }
          });
        },
        error: (error) => {
          console.log('Error fetching hotels:', error);
        }
      });
    });
  }



  filterTable() {
    if (this.destination.trim() === '') {
      // Hiển thị thông báo lỗi, ví dụ như alert hoặc cài đặt một thông báo lỗi khác
      console.log("Nơi bạn muốn đến không được để trống");
      this.isSubmitted = true;
      // Có thể thêm logic hiển thị viền đỏ xung quanh trường input hoặc thông báo khác
      return;
    }
    const queryParams = {
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      adults: this.adults,
      sizeRoom: this.sizeRoom,
      destination: this.destination,

    };
    console.log("Lọc với các tham số:", queryParams);

    this.searchService.setSearchParams(queryParams);
    this.router.navigate(['/detail']);
  }

  isSubmitted: boolean = false;


  getRoomPrice(hotelId: number): number {
    const rooms = this.roomsByHotel[hotelId];
    if (rooms && rooms.length > 0) {
      return rooms[0]?.price * this.numberOfDays * this.sizeRoom;
    }
    return 0; // or handle appropriately if no rooms are found
  }
  wishlist: any[] = [];
  isInWishlist(hotelId: number): boolean {
    return !!this.wishlist.find(item => item.hotelID === hotelId);
  }
  fetchWishlist(): void {
    this.hotelService.getWishlistByUserId(this.userId).subscribe({
      next: (data: any[]) => {
        this.wishlist = data;
      },
      error: (error) => {
        console.error('Error fetching wishlist:', error);
      }
    })
  }
  deleteFromWishlist(hotelId: number): void {
    if (!this.userId) {
      this.authService.savePreviousUrl(this.router.url);
      const dialogRef = this.dialog.open(ModaldangnhapComponent);
    }

    const wishlistItem = this.wishlist.find(item => item.hotelID === hotelId);
    if (wishlistItem) {
      this.hotelService.deleteFromWishlist(wishlistItem.id).subscribe({
        next: () => {
          this.fetchWishlist();
          this.toastr.success('Đã xóa khỏi danh sách yêu thích');
          setTimeout(() => {
            location.reload();
          }, 3000);
        },
        error: (error) => {
          console.error('Error deleting from wishlist:', error);
          this.toastr.error('Lỗi khi xóa khỏi danh sách yêu thích');
        }
      });
    }
  }
  addToWishlist(hotelId: number) {
    if (!this.userId) {
      this.authService.savePreviousUrl(this.router.url);
      const dialogRef = this.dialog.open(ModaldangnhapComponent);
    } else {
      const wishlistItem = {
        userId: this.userId,
        hotelID: hotelId,
        date: new Date().toISOString()
      };
      this.hotelService.addToWishlist(wishlistItem).subscribe(
        response => {
          this.toastr.success('Đã thêm vào danh sách yêu thích');
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        error => {
          this.toastr.error('Lỗi khi thêm vào danh sách yêu thích');
        }
      );
    }
  }

  averageRatingByHotel: { [hotelId: number]: number } = {};
  reviewsByHotel: { [hotelId: number]: Review[] } = {};

  getReviews(hotelId: number): void {
    this.reviewService.getReviewbyHotelid(hotelId).subscribe(
      (reviews: Review[]) => {
        this.reviewsByHotel[hotelId] = reviews;
        this.calculateAverageRating(hotelId);
      },
      (error) => {
        console.log('Error fetching reviews:', error);
      }
    );
  }

  calculateAverageRating(hotelId: number): void {
    const reviews = this.reviewsByHotel[hotelId];
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      this.averageRatingByHotel[hotelId] = totalRating / reviews.length;
    } else {
      this.averageRatingByHotel[hotelId] = 0;
    }
  }

  getAverageRating(hotelId: number): number {
    return this.averageRatingByHotel[hotelId] || 0;
  }
  generateStars(hotelId: number): (number | string)[] {
    const rating = this.averageRatingByHotel[hotelId] || 0;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 0.5 : 0;
    const starsArray = [];

    for (let i = 0; i < fullStars; i++) {
      starsArray.push(1); // Full star
    }

    if (halfStar) {
      starsArray.push(0.5); // Half star
    }

    return starsArray;
  }
  hotelall: Hotel[] = [];
  selectedStar: number | null = null;
  filteredHotels: any[] = [];
  khongcokhachsan: boolean = false;

  filterByStar(star: number) {
    console.log(star);
    this.filteredHotels = this.temp.filter(hotel => (star + 1) > this.getAverageRating(hotel.id) && this.getAverageRating(hotel.id) >= star);
    if (this.filteredHotels) {
      this.khongcokhachsan = true;
      console.log("lap dep trai")
    }
    if(!star){
      this.hotels= this.hotelall;
    }
    console.log(this.filteredHotels);
    this.hotels = this.filteredHotels;
  }
}
