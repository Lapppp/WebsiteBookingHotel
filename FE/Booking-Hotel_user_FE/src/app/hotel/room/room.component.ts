  import {Component, OnInit} from '@angular/core';
  import {ActivatedRoute, Router} from '@angular/router';
  import {ToastrService} from 'ngx-toastr';
  import {Amenity, Room, RoomType} from '../room';
  import {HotelService} from '../servicce/hotel.service';
  import {RoomService} from '../servicce/room.service';
  import {Hotel} from '../hotel';
  import {count, forkJoin} from 'rxjs';
  import {CommentService} from "../../comment/comment.service";
  import {Comment} from "../../comment/comment";
  import {FormBuilder, FormGroup, Validators} from "@angular/forms";
  import {SearchService} from "../servicce/search.service";
  import {AuthService} from "../../services/auth.service";
  import {User} from "../../user/user";
  import {Review} from "../../pages/review/review";
  import {mergeMap, map} from 'rxjs/operators';
  import {Booking} from "../../pages/booking/booking";
  import {BookingService} from "../../pages/booking/booking.service";
  import {ReviewService} from "../../pages/review/review.service";
  import {UserService} from "../../user/user.service";

  @Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
  })

  export class RoomComponent implements OnInit {
    roomTotals: { [key: number]: number } = {};
    hotelId: number = 0;
    hotel: Hotel | undefined;
    roomTypes: RoomType[] = [];
    amenities: Amenity[] = [];
    rooms: Room[] = [];

    userId: string = '';
    currentUser: User | null = null;
    comments: Comment[] = [];
    commentt !: FormGroup;
    countroom: number = 1;


    constructor(
      private route: ActivatedRoute,
      private roomService: RoomService,
      private hotelService: HotelService,
      private toastr: ToastrService,
      private router: Router,
      private commentService: CommentService,
      private searchService: SearchService,
      private authService: AuthService,
      private fb: FormBuilder,
      private bookingService: BookingService,
      private reviewService: ReviewService,
      private userService: UserService
    ) {
    }

    ngOnInit(): void {
      this.currentUser = this.authService.getCurrentUser();
      if (this.currentUser) {
        this.userId = this.currentUser.id;
      }
      this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
      if (this.hotelId) {

        this.getHotelDetails();
      }
      // this.getHotelDetails();
      this.loadComments();
      this.setDefaultDates();

    }

    Bookings: Booking[] = [];

    getAllBooking(callback: () => void = () => {
    }): void {
      this.bookingService.getBookings().subscribe({
        next: (data) => {
          this.allbooking = data;
          this.Bookings = data.filter(booking =>
            booking.status === 'đang sử dụng' || booking.status === 'đã xác nhận'
          );
          console.log("Filtered bookings: ", this.Bookings);
          callback();

        },
        error: (error) => {
          console.log('Error fetching booking:', error);
        }
      });

    }
allbooking: Booking[] = [];
    filterAndAdjustRooms() {
      this.allbooking.forEach(booking => {
        const bookingCheckInDate = new Date(booking.checkInDate);
        const bookingCheckOutDate = new Date(booking.checkOutDate);
        const searchCheckInDate = new Date(this.checkInDate);
        const searchCheckOutDate = new Date(this.checkOutDate);

        if (bookingCheckInDate <= searchCheckInDate && searchCheckInDate <= bookingCheckOutDate || bookingCheckInDate <= searchCheckOutDate && searchCheckOutDate <= bookingCheckOutDate) {
          this.rooms.forEach(room => {
            if (room.id === booking.roomId) {
              room.roomNumber -= booking.bookedRooms;
              console.log('room nuumber', room.roomNumber)
            }
          });
        }
      });
      console.log("Adjusted rooms: ", this.rooms);
    }


    getRoomsByHotelId(hotelId: number): void {
      this.roomService.getRoomsByHotelId(hotelId).subscribe(
        (rooms: Room[]) => {
          this.rooms = rooms;
          console.log("check in ", this.checkInDate);
          console.log("check out ", this.checkOutDate);
          this.rooms.forEach(room => {
            this.getRoomDetails(room);
            this.getRoomTypebyromid(room.id);
          });

          // Lấy tất cả booking
          this.getAllBooking(() => {
            // Lọc booking theo trạng thái và ngày check-in/check-out
            this.filterAndAdjustRooms();
          });


        },
        (error) => {
          console.log("Error fetching rooms:", error);
        }
      );
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
        this.updateNumberOfDays();
      });
    }

    loadComments(): void {
      this.commentService.getCommentlBytHotelId(this.hotelId).subscribe({
        next: (data) => {
          this.comments = data;
        },
        error: (error) => {
          console.error('Error loading comments:', error);
        }
      });
    }

    getHotelDetails(): void {
      this.hotelService.getHotelById(this.hotelId).subscribe(
        (hotel: Hotel) => {
          this.hotel = hotel;
          this.getRoomsByHotelId(this.hotelId);
          this.getReviews(this.hotelId);
        },
        (error) => {
          console.log("Error fetching hotel:", error);
        }
      );
    }

    loadUsers(): void {
      this.userService.getUsers().subscribe({
        next: (users: User[]) => {
          users.forEach(user => {
            this.users[user.id] = user;
          });
          console.log('Users:', this.users)
        },
        error: (error) => {
          console.error('Error loading users:', error);
        }
      });
    }

    averageRating: number = 0;
    reviews: Review[] = [];
    users: { [key: string]: User } = {};
    getUserNameCache: { [key: string]: string } = {};

    getUserName(userId: string): string {
      // Kiểm tra xem tên người dùng đã được lưu trong cache chưa
      if (this.getUserNameCache[userId]) {
        return this.getUserNameCache[userId];
      }

      // Nếu chưa có trong cache, lấy tên người dùng từ danh sách users
      const user = this.users[userId];
      const userName = user ? user.userName || user.name : 'Unknown User';

      // Lưu kết quả vào cache
      this.getUserNameCache[userId] = userName;

      console.log("user name", this.users);
      console.log("user name 2", userId);

      return userName;
    }
    // getUserName(userId: string): string {
    //   const user = this.users[userId];
    //   console.log("user name", this.users)
    //   console.log("user name 2", userId)
    //   return user ? user.userName || user.name : 'Unknown User';
    //
    // }


    getRatingPercentage(rating: number): number {
      const totalReviews = this.reviews.length;
      const ratingCount = this.getCommentCount(rating);
      return totalReviews > 0 ? (ratingCount / totalReviews) * 100 : 0;
    }

    getCommentCount(rating: number): number {
      return this.reviews.filter(review => review.rating === rating).length;
    }
    getStarArray(rating: number): number[] {
      return Array(rating).fill(0).map((x, i) => i + 1);
    }

    getReviews(hotelId: number): void {
      this.reviewService.getReviewbyHotelid(hotelId).subscribe(
        (reviews: Review[]) => {
          this.reviews = reviews;
          this.loadUsers();

          this.calculateAverageRating();
          console.log("review", this.reviews);
        },
        (error) => {
          console.log('Error fetching reviews:', error);
        }
      );
    }

    calculateAverageRating(): void {
      if (this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = totalRating / this.reviews.length;
        console.log("averageRating", this.averageRating);
      }
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


    getRoomDetails(room: Room): void {
      const roomAmenityRequest = this.roomService.getRoomAmenitiesByRoomId(room.id).pipe(

        mergeMap((roomAmenities) => {
          const amenityRequests = roomAmenities.map((ra) =>

            this.roomService.getAmenityById(ra.amenityId).pipe(
              map((amenity) => {
                ra.amenity = amenity;
                return ra;
              })
            )

          );
          return forkJoin(amenityRequests).pipe(
            map((raDetails) => {
              room.amenities = raDetails.map((ra) => ra.amenity);
              return room;
            })
          );
        })
      );

      const roomRoomTypeRequest = this.roomService.getRoomRoomTypesByRoomId(room.id).pipe(
        mergeMap((roomRoomTypes) => {
          const roomTypeRequests = roomRoomTypes.map((rrt) =>
            this.roomService.getRoomTypeById(rrt.roomTypeId).pipe(
              map((roomType) => {
                rrt.roomType = roomType;
                return rrt;
              })
            )
          );
          return forkJoin(roomTypeRequests).pipe(
            map((rrtDetails) => {
              room.roomTypes = rrtDetails.map((rrt) => rrt.roomType);
              return room;
            })
          );
        })

      );

      forkJoin([roomAmenityRequest, roomRoomTypeRequest]).subscribe({
        next: () => {
          // Process complete, room details are now loaded
        },
        error: (error) => {
          console.log("Error fetching room details:", error);
        }
      });
    }

    getRoomTypeName(room: Room): string {
      return room.roomTypes.map(rt => rt.name).join(', ');
    }

    getRoomAmenities(room: Room): { icon: string, name: string }[] {
      return room.amenities.map(a => ({icon: a.icon, name: a.name}));
    }

    getUniqueRoomTypes(rooms: Room[]): RoomType[] {
      const roomTypesMap: { [key: number]: RoomType } = {};
      rooms.forEach(room => {
        room.roomTypes.forEach(roomType => {
          roomTypesMap[roomType.id] = roomType;
        });
      });
      return Object.values(roomTypesMap);
    }


    getRoomTypebyromid(roomId: number): any {
      console.log("lap1321", roomId)
      this.roomService.getRoomTypeByRoomId(roomId).subscribe(
        (data) => {
          this.roomTypes = data;
          console.log("lap1321", data)
        },
        (error) => {
          console.error('Error loading room types:', error);
        }
      );
    }


    getAmennitybyromid(roomId: number): any {
      this.roomService.getAmenitiesByRoomId(1).subscribe(
        (data) => {
          this.amenities = data;
          console.log("chau", this.amenities);
        },
        (error) => {
          console.error('Error loading amenities:', error);
        }
      );
    }

    // getRoomsByHotelId(hotelId: number): void {
    //   this.roomService.getRoomsByHotelId(hotelId).subscribe(
    //     (rooms: Room[]) => {
    //       this.rooms = rooms;
    //
    //
    //       console.log("amenity",this.rooms)
    //
    //       // this.rooms.forEach(room => {
    //       //   this.getAmenitiesi(room.id);
    //       //   this.getRoomTypeId(room.id);
    //       // });
    //
    //     },
    //     (error) => {
    //       console.log("Error fetching rooms:", error);
    //     }
    //   );
    // }


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
        next: (data: any[]) => {
          this.roomTypes = data as RoomType[];
        },
        error: (error) => {
          console.log('Error fetching room types:', error);
        }
      });
    }


    getCapacityIcons(capacity: number): string[] {

      if (capacity === 1) {
        return ['uil-user'];
      } else if (capacity === 2) {
        return ['uil-users-alt'];
      } else if (capacity === 3) {
        return ['uil-users-alt', 'uil-user'];
      } else if (capacity === 4) {
        return ['uil-users-alt', 'uil-users-alt'];
      }
      return [];
    }

    totalRoomPrice: number = 0;

    numberRooom: number = 1;
    updateTotalPrice(roomId: number, event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      if (selectElement) {
        const count = Number(selectElement.value);
        this.countroom = count;
        this.roomTotals[roomId] = count;

        this.totalRoomPrice = this.calculateTotalPrice(); // Tính lại tổng tiền
      }
    }

    calculateTotalPrice(): number {
      return Object.keys(this.roomTotals).reduce((sum, roomId) => {
        const room = this.rooms.find(room => room.id === +roomId);
        return sum + (room ? room.price * this.roomTotals[room.id] : 0);
      }, 0);
    }

    roomss: Room[] = [];
    dropdownOpen: boolean = false;
    minCheckOutDate!: string;
    destination: string = '';
    checkInDate: string = '';
    checkOutDate: string = '';
    adults: number = 1;
    sizeRoom: number = 1;
    minCheckInDate!: string;
    numberOfDays: number = 1;

    checkDates(): boolean {
      const checkInDate = new Date(this.checkInDate);
      const checkOutDate = new Date(this.checkOutDate);

      if (checkInDate >= checkOutDate) {
        return false;
      }
      return true;
    }

    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }

    onCheckOutChange(): void {
      this.updateNumberOfDays();
    }

    toggleDropdown(): void {
      this.dropdownOpen = !this.dropdownOpen;

    }

    decrement(field: string) {
      if (field === 'sizeRoom' && this.sizeRoom > 1) {
        this.sizeRoom--;
      } else if (field === 'adults' && this.adults > 1) {
        this.adults--;
      }
    }

    increment(field: string) {
      if (field === 'sizeRoom') {
        this.sizeRoom++;
      } else if (field === 'adults') {
        this.adults++;
      }
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

    updateNumberOfDays(): void {
      const checkInDate = new Date(this.checkInDate);
      const checkOutDate = new Date(this.checkOutDate);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    }

    filterTable() {
      if (!this.checkDates()) {
        this.toastr.error(
          "Check-in date cannot be later than check-out date",
          "Error"
        );
      } else {

        const queryParams = {
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
          adults: this.adults,
          sizeRoom: this.sizeRoom,
          destination: this.destination
        };

        // Lưu trữ thông số tìm kiếm vào SearchService
        this.searchService.setSearchParams(queryParams);
        this.router.navigate(['/detail']);
      }

    }


    getCountsUpTo(roomNumber: number): number[] {

      return Array.from({length: roomNumber}, (_, i) => i + 1);
    }


    // booking
    bookRoom(roomId: number): void {

      const checkInDate = this.checkInDate;
      const checkOutDate = this.checkOutDate;
      const selectedRoom = this.rooms.find(room => room.id === roomId);
      const totalPrice = (selectedRoom?.price ?? 0) * this.countroom;
      const roomType = this.roomTypes.find(rt => rt.id === roomId)?.id;
      console.log("roomType", this.roomTypes.find(rt => rt.id === roomId)?.id);
      const userId = this.userId; // giả sử bạn đã lưu thông tin người dùng ở đâu đó trong component
      const hotelId = this.hotelId;
      const sizeRoom = this.countroom;
      const capacity = selectedRoom?.capacity;
      const amenities = JSON.stringify(this.amenities);
      console.log("lap", amenities);
      // const numberRoom = this.roomnu

      // console.log("lapdd", capacity);
      const bookingData = {
        capacity,
        roomId,
        hotelId,
        userId,
        checkInDate,
        checkOutDate,
        roomType,
        totalPrice,
        sizeRoom,
        amenities
      };
      console.log("userid ", bookingData)
      // // Điều hướng đến trang thanh toán với dữ liệu
      // this.router.navigate(['/pay'], {queryParams: bookingData});

    }


    updateRoomCount(roomId: number, event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      if (selectElement) {
        const count = Number(selectElement.value);
        this.roomTotals[roomId] = count;
      }
    }

  }
