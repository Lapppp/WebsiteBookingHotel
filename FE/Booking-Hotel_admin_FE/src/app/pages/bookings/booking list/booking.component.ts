import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { Booking } from "../model/booking";
import { BookingService } from "../service/booking.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { DeleteBookingComponent } from "../delete booking/deleteBooking.component";

@Component({
  selector: "app-Booking",
  templateUrl: "./booking-list.component.html",
})
export class BookingComponent implements OnInit {
  Bookings: Booking[] = [];
  temp: Booking[] = [];
  entries: number = 10;
  showDeleteConfirmation = false;
  BookingIdToDelete: string | null = null;
  selectedRow: Booking;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  @ViewChild("detailModal") detailModal: ElementRef;

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getBookings().subscribe(
      (bookings) => {
        this.Bookings = bookings;
        this.temp = [...this.Bookings];
      },
      (error) => {
        console.error("Lỗi khi tải danh sách đặt phòng:", error);
        this.toastr.error("Lỗi khi tải danh sách đặt phòng", "Lỗi");
      }
    );
  }

  viewDetails(row: Booking) {
    this.selectedRow = row;
    this.showModal();
  }

  showModal() {
    if (this.detailModal) {
      const modal = this.detailModal.nativeElement;
      modal.classList.add("show"); // Ensure modal is shown
      modal.style.display = "block"; // Ensure modal is displayed
    }
  }

  closeModal() {
    if (this.detailModal) {
      const modal = this.detailModal.nativeElement;
      modal.classList.remove("show"); // Hide modal
      modal.style.display = "none"; // Hide modal
    }
  }

  entriesChange(event: any) {
    this.entries = event.target.value;
  }

  filterTable(event: any) {
    const val = event.target.value ? event.target.value.toLowerCase() : "";
    this.temp = this.Bookings.filter((d) => {
      const userName = d.userName ? d.userName.toLowerCase() : "";
      return userName.includes(val) || !val;
    });
  }

  onActivate(event: any) {}

  editBooking(id: string) {
    this.router.navigate([`/bookings/editBooking/${id}`]);
  }

  confirmDeleteBooking(id: string) {
    const dialogRef = this.dialog.open(DeleteBookingComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteBooking(id);
      }
    });
  }

  deleteBooking(id: string) {
    this.bookingService.deleteBooking(id).subscribe(
      () => {
        this.toastr.success("Xóa đặt phòng thành công!");
        this.getBookings();
      },
      (error) => {
        console.error("Lỗi khi xóa đặt phòng:", error);
        this.toastr.error("Không thể xóa đặt phòng.", "Lỗi");
      }
    );
  }
}
