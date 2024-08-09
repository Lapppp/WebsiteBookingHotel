import {Component, OnInit} from '@angular/core';
import {PayService} from './pay.service';
import {AuthService} from '../services/auth.service';
import {User} from '../user/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {Hotel} from "../hotel/hotel";
import {HotelService} from "../hotel/servicce/hotel.service";
import {Promotion, Payment} from "./promotion";
import {MatDialog} from "@angular/material/dialog";
import { MessageService } from 'primeng/api';
import {ModaldangnhapComponent} from "../pages/modaldangnhap/modaldangnhap.component";



@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
  providers: [MessageService]
})
export class PayComponent implements OnInit {
  user: User | null = null;
  currentUser: User | null = null;
  isLoggedIn: boolean = false;
  users: User[] = [];
  editUser: FormGroup;
  bookingData: any;
  roomId: number = 0;
  hotelId: number = 0;
  userId: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  roomType: string = '';
  totalPrice: number = 0;
  sizeRoom: number = 0;
  numberOfDays: number = 1;
  hotel: Hotel | undefined;
  amenities: any[] = [];
  userss: User[] = [];

  constructor(
    private payService: PayService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private hotelService: HotelService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.editUser = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      promoCode: [''],
      note: [''],
      paymentId: ['', Validators.required],

    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'];
      console.log("test room id in pay", this.roomId)
      this.hotelId = params['hotelId'];
      this.userId = params['userId'];
      this.checkInDate = params['checkInDate'];
      this.checkOutDate = params['checkOutDate'];
      this.roomType = params['roomType'];
      console.log("roomType 1", this.roomType)
      this.totalPrice = params['totalPrice'];
      this.sizeRoom = params['sizeRoom'];
      this.amenities = JSON.parse(params['amenities'] || '[]');
      this.peoples = params['capacity'];
    });

    this.getHotelDetails();
    this.getPromotionByHotelId(this.hotelId)
    this.isLoggedIn = this.authService.isAuthenticated();

    this.route.queryParams.subscribe(params => {
      this.bookingData = params;
    });

    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.userId = this.currentUser.id;
      this.getUser();

    }
    this.updateNumberOfDays();


    this.getPayment()
  }

  updateNumberOfDays(): void {
    const checkinDate = new Date(this.checkInDate);
    const checkDate = new Date(this.checkOutDate);
    const timeDiff = checkDate.getTime() - checkinDate.getTime();
    this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  getHotelDetails(): void {
    this.hotelService.getHotelById(this.hotelId).subscribe(
      (hotel: Hotel) => {
        if (hotel) {
          this.hotel = hotel;
        } else {
          console.error("No hotel found with ID:", this.hotelId);
        }
      },
      (error) => {
        console.log("Error fetching hotel:", error);
      }
    );
  }


  getUser() {
    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        if (user) {
          this.user = user;

          this.editUser.patchValue({
            name: user.name,
            phone: user.phone,
            email: user.email
          });
        } else {
          console.error("No user found with ID:", this.userId);
        }
      },
      (error) => {
        console.log("Error fetching user:", error);
      }
    );
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const daysOfWeek = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${dayOfWeek}, ${day} tháng ${month} ${year}`;
  }


  promoCode: string = '';
  promotion: Promotion[] = [];
  showPromoCodeInput: boolean = false;

  getPromotionByHotelId(hotelId: number): void {
    this.payService.getPromotionByHotelId(hotelId).subscribe({
      next: (data: Promotion[]) => {
        this.promotion = data;

      },
      error: (error) => {
        console.log('Error fetching promotions:', error);
      }
    })
  }

  togglePromoCodeInput(): void {
    this.showPromoCodeInput = !this.showPromoCodeInput;
  }

  finalPrice: number = this.totalPrice;
  discountPercentage: number = 0;
  nameDiscoud: string = '';
  savings: number = 0;
  promoMessage: string = '';
  discouid: number = 0;

  checkPromoCode(): void {
    const enteredPromoCode = this.promoCode;
    const validPromotion = this.promotion.find(promo => promo.CouponCode === enteredPromoCode);
console.log("validPromotion",this.promotion)
    if (!validPromotion) {
      this.promoMessage = 'Mã khuyến mãi không hợp lệ';
      this.nameDiscoud = '';
      this.discountPercentage = 0;
      this.savings = 0;
      this.finalPrice = this.totalPrice;
      return;
    }

    const startDate = new Date(validPromotion.StartDate);
    const endDate = new Date(validPromotion.EndDate);
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);

    if (checkIn >= startDate && checkOut <= endDate) {
      this.discountPercentage = validPromotion.Discount ;
      this.nameDiscoud = validPromotion.Title;
      this.savings = this.totalPrice * this.discountPercentage/ 100;
      this.finalPrice = this.totalPrice - this.savings;

      this.discouid = validPromotion.Id;
      console.log("discount", this.discountPercentage)
      console.log("savings", this.savings)
      console.log("finalPrice", this.finalPrice)
      console.log("discouid", this.discouid);
      this.promoMessage = 'Áp dụng khuyến mãi thành công';
    } else {
      this.promoMessage = 'Khuyến mãi không áp dụng cho ngày đã chọn';
      this.nameDiscoud = '';
      this.discountPercentage = 1;
      this.savings = 0;

      this.finalPrice = this.totalPrice;

    }
  }

  //lấy phương thức


  payments: Payment[] = [];

  getPayment() {
    this.payService.getPayment().subscribe(
      (data: Payment[]) => {
        this.payments = data;
        console.log("paymennt", this.payments);
      },
      (error) => {
        console.log("Error loading payments:", error);
      }
    );
  }



  peoples: number = 1;
  isSubmitted: boolean = false;
  bookingSuccess: boolean = false;



  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.userss = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });

  }

  // Xử lý submit form ở đây khi cần
  onSubmit() {
    if (!this.isLoggedIn) {
      this.authService.savePreviousUrl(this.router.url);
      const dialogRef = this.dialog.open(ModaldangnhapComponent);
      return;
    }
    this.getAllUsers();
    this.isSubmitted = true;
    if (this.editUser.invalid) {
      return;
    } else {

      const enteredEmail = this.editUser.value.email;
      const matchedUser = this.userss.find(user => user.email === enteredEmail);
      if (matchedUser) {
        this.userId = matchedUser.id;
      }
      const selectedPaymentId = this.editUser.value.paymentId;
      const booking = {
        userID: this.userId,
        roomId: this.roomId,
        checkInDate: new Date(this.checkInDate).toISOString(),
        checkOutDate: new Date(this.checkOutDate).toISOString(),
        status: 'đã xác nhận',
        paymentId: selectedPaymentId,
        totalPrice: this.totalPrice,
        phoneNumber: this.editUser.value.phone,
        userName: this.editUser.value.name,
        email: this.editUser.value.email,
        note: this.editUser.value.note,
        hotelId: this.hotelId,
        commission :this.savings,
        discount: this.discountPercentage,
        couponCode: this.promoCode,
        bookedRooms: this.sizeRoom,
        numberPeople: this.peoples,
        statusPayment: 'Chưa thanh toán',
        moneyReceived: this.finalPrice,
        createdAt: new Date().toISOString(),
        customerName: this.editUser.value.name,
      };

      console.log("booking", booking);
      this.payService.payVnpay(booking).subscribe(
        (response: any) => {
          window.location.href = response.url;
        },
        (error) => {
          console.error('Error adding booking', error);
        }
      );
    }
  }

}
