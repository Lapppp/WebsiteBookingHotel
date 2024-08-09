import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HotelService } from "../hotel.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-hotel",
  templateUrl: "./add-hotel.component.html",
})
export class AddHotelComponent implements OnInit {
  addHotel: FormGroup;
  selectedFiles: FileList;
  createdHotelId: number;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.addHotel = this.fb.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      description: [""],
      totalRooms: ["", Validators.required],
      policy: ["", Validators.required],
      contact: ["", Validators.required],
      checkIn: ["", Validators.required],
      checkOut: ["", Validators.required],
      cancel: ["", Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  checkDates(): boolean {
    const checkInDate = new Date(this.addHotel.value.checkIn);
    const checkOutDate = new Date(this.addHotel.value.checkOut);

    return checkInDate < checkOutDate;
  }

  onSubmit() {
    if (this.addHotel.valid) {
      console.log("Form is valid, submitting:", this.addHotel.value);

      if (!this.checkDates()) {
        this.toastr.error(
          "Ngày nhận phòng không thể sau ngày trả phòng",
          "Lỗi"
        );
      } else {
        const hotelPayload = {
          name: this.addHotel.value.name,
          address: this.addHotel.value.address,
          city: this.addHotel.value.city,
          country: this.addHotel.value.country,
          description: this.addHotel.value.description,
          totalRooms: this.addHotel.value.totalRooms,
          policy: this.addHotel.value.policy,
          contact: this.addHotel.value.contact,
          checkIn: new Date(this.addHotel.value.checkIn).toISOString(),
          checkOut: new Date(this.addHotel.value.checkOut).toISOString(),
          cancel: this.addHotel.value.cancel,
        };

        // Kiểm tra xem khách sạn có tên đã tồn tại hay chưa
        this.hotelService.getHotelByName(hotelPayload.name).subscribe(
          (existingHotel) => {
            if (existingHotel) {
              // Nếu khách sạn đã tồn tại, hiển thị thông báo lỗi và không thực hiện thêm mới
              this.toastr.error("Khách sạn này đã tồn tại", "Lỗi");
            } else {
              // Nếu chưa tồn tại, thực hiện thêm mới khách sạn
              this.hotelService.addHotel(hotelPayload).subscribe(
                (newHotel) => {
                  this.createdHotelId = newHotel.id;
                  if (this.selectedFiles && this.selectedFiles.length > 0) {
                    for (let i = 0; i < this.selectedFiles.length; i++) {
                      this.hotelService
                        .uploadPhoto(this.createdHotelId, this.selectedFiles[i])
                        .subscribe(
                          () => {
                            console.log("Photo uploaded successfully");
                          },
                          (error) => {
                            console.error("Photo upload failed", error);
                          }
                        );
                    }
                  }
                  this.toastr.success(
                    "Thêm khách sạn thành công!",
                    "Thành công"
                  );
                  this.router.navigate(["/hotels/hotel"]);
                },
                (error) => {
                  console.error("Error adding hotel", error);
                  this.toastr.error("Lỗi khi thêm khách sạn", "Lỗi");
                }
              );
            }
          },
          (error) => {
            console.error("Error checking hotel name", error);
            this.toastr.error("Vui lòng kiểm tra thông tin nhập", "Lỗi");
          }
        );
      }
    } else {
      console.log("Form is invalid");
      this.toastr.error("Please check your input", "Error");
    }
  }

  resetForm() {
    this.addHotel.reset();
  }
}
