import {Component, OnInit} from '@angular/core';
import {HotelService} from "../../hotel/servicce/hotel.service";
import {Wishlist} from "./wishlist";
import {User} from "../../user/user";
import {AuthService} from "../../services/auth.service";
import {ModaldangnhapComponent} from "../modaldangnhap/modaldangnhap.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Hotel} from "../../hotel/hotel";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  userId: string = '';
  currentUser: User | null = null;
  constructor(
    private hotelService: HotelService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }
wishlist: Wishlist[] = [];
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.userId = this.currentUser.id;
      console.log('User ID:', this.userId)

    }
    this.fetchWishlist();
  }


  fetchWishlist(): void {
    this.hotelService.getWishlistByUserId(this.userId).subscribe({
      next: (data: any[]) => {
        this.wishlist = data;
        console.log('Wishlist:', data)
        this.loadHotelDetails();
      },
      error: (error) => {
        console.error('Error fetching wishlist:', error);
      }
    })
  }
  loadHotelDetails(): void {
    this.wishlist.forEach(item => {
      this.getHotelById(item.hotelID);
    });
  }
  hotels: Hotel[] = [];
  getHotelById(hotelId: number): void {
    console.log('hotel id iid ', hotelId)
    this.hotelService.getHotelById(hotelId).subscribe({
      next: (hotel) => {
        this.hotels.push(hotel);
        console.log('Hotel:', this.hotels);
      },
      error: (error) => {
        console.error('Error fetching hotel details:', error);
      }
    });
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


}
