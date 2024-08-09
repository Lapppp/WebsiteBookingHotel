import {Component, OnInit} from '@angular/core';
import {HotelService} from '../servicce/hotel.service';
import {Hotel} from '../hotel';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {SearchService} from "../servicce/search.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-hotel',
  // standalone: true,
  // imports: [CommonModule, NgxDatatableModule],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  hotels: Hotel[] = [];
  temp: Hotel[] = [];
  checkInDate: string = '';
  checkOutDate: string = '';
  adults: number = 0;
  children: number = 0;
  destination: string = '';
  searchTerm: string = '';
  minCheckOutDate!: string;
  minCheckInDate!: string;

  constructor(
    private hotelService: HotelService,
    public dialog: MatDialog,
    private router: Router,
    private searchService: SearchService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getHotels();
    this.setDefaultDates();
  }

  isSubmitted: boolean = false;


  dropdownOpen: boolean = false;

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

  setDefaultDates(): void {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    this.checkInDate = this.formatDate(today);
    this.checkOutDate = this.formatDate(tomorrow);
    this.minCheckOutDate = this.checkOutDate;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onCheckInChange(): void {
    const checkInDate = new Date(this.checkInDate);
    const minCheckOut = new Date(checkInDate);
    minCheckOut.setDate(checkInDate.getDate() + 1);

    this.minCheckOutDate = this.formatDate(minCheckOut);

    if (new Date(this.checkOutDate) <= checkInDate) {
      this.checkOutDate = this.minCheckOutDate;
    }
  }

  getHotels(): void {
    this.hotelService.getHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
        this.temp = [...data];

      },
      error: (error) => {
        console.log('Error fetching hotels:', error);
      }

    });
  }

  onCheckOutChange(): void {
    this.updateNumberOfDays();
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/room', id]);
  }

  updateNumberOfDays(): void {
    const checkInDate = new Date(this.checkInDate);
    const checkOutDate = new Date(this.checkOutDate);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  }


  checkDates(): boolean {
    const checkInDate = new Date(this.checkInDate);
    const checkOutDate = new Date(this.checkOutDate);

    if (checkInDate >= checkOutDate) {
      return false;
    }
    return true;
  }

  numberOfDays: number = 1;
  sizeRoom: number = 1;

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

  searchByName(name: string) {
    this.destination = name;
    this.filterTable();
  }


}
