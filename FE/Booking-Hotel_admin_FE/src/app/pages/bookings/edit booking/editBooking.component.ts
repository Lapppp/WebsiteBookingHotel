import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Booking } from "../model/booking";
import { BookingService } from "../service/booking.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-booking",
  templateUrl: "./edit-booking.component.html",
})
export class EditBookingComponent implements OnInit {
  editBooking: FormGroup;
  BookingId: string;
  Booking: Booking;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      this.BookingId = params.get("id");
      if (this.BookingId) {
        this.getBooking();
      }
    });
  }

  initForm() {
    this.editBooking = this.fb.group({
      bookedRooms: ["", [Validators.required, Validators.min(1)]],
      status: ["", Validators.required],
    });
  }

  getBooking() {
    this.bookingService.getBookingById(this.BookingId).subscribe(
      (booking: Booking) => {
        if (booking) {
          this.Booking = booking;
          this.patchBookingForm(booking);
        } else {
          console.error("No Booking found with ID:", this.BookingId);
        }
      },
      (error) => {
        console.log("Error fetching Booking:", error);
      }
    );
  }

  patchBookingForm(booking: Booking) {
    this.editBooking.patchValue({
      bookedRooms: booking.bookedRooms,
      status: booking.status,
    });
  }

  onSubmit() {
    if (this.editBooking.valid) {
      const updatedBooking: Booking = {
        ...this.Booking,
        ...this.editBooking.value,
      };
      if (JSON.stringify(updatedBooking) === JSON.stringify(this.Booking)) {
        this.toastr.info("Không có thay đổi nào được thực hiện", "Thông tin");
        return;
      }
      this.bookingService.updateBooking(updatedBooking).subscribe(
        () => {
          this.toastr.success("Cập nhật đặt phòng thành công!", "Thành công");
          this.router.navigate(["/bookings"]);
          this.bookingService.getBookings().subscribe(
            (data: Booking[]) => {
              this.bookingService.Bookings = data;
            },
            (error) => {
              console.error(
                "Lỗi khi tải danh sách đặt phòng sau khi cập nhật:",
                error
              );
              this.toastr.error(
                "Lỗi khi tải danh sách đặt phòng sau khi cập nhật",
                "Lỗi"
              );
            }
          );
        },
        (error) => {
          console.log("Error updating Booking:", error);
          this.toastr.error("Cập nhật đặt phòng thất bại", "Lỗi");
        }
      );
    } else {
      this.toastr.error("Vui lòng điền thông tin vào mẫu đúng cách", "Lỗi");
    }
  }

  onCancel() {
    this.router.navigate(["/bookings"]);
  }
}
