  import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Hotel, Image } from "../hotel"; // Import thêm Image
import { HotelService } from "../hotel.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-hotel",
  templateUrl: "./edit-hotel.component.html",
})
export class EditHotelComponent implements OnInit {
  editHotel: FormGroup;
  hotelId: number;
  hotel: Hotel;
  images: Image[] = [];
  selectedFiles: FileList;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private hotelService: HotelService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.hotelId = +params.get("id");
      console.log("Hotel ID from paramMap:", this.hotelId);
      if (this.hotelId) {
        this.initForm();
        this.getHotel();
        this.getHotelImages(); 
      } else {
        console.error("Hotel ID is null or undefined");
      }
    });
  }

  initForm() {
    this.editHotel = this.fb.group({
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
      status: ["", Validators.required],
    });
  }

  getHotel() {
    this.hotelService.getHotelById(this.hotelId).subscribe(
      (hotel: Hotel) => {
        if (hotel) {
          this.hotel = hotel;
          this.patchHotelForm(hotel);
        } else {
          console.error("No hotel found with ID:", this.hotelId);
        }
      },
      (error) => {
        console.log("Error fetching hotel:", error);
      }
    );
  }

  patchHotelForm(hotel: Hotel) {
    this.editHotel.patchValue({
      name: hotel.name,
      address: hotel.address,
      city: hotel.city,
      country: hotel.country,
      description: hotel.description,
      totalRooms: hotel.totalRooms,
      policy: hotel.policy,
      contact: hotel.contact,
      checkIn: hotel.checkIn,
      checkOut: hotel.checkOut,
      status: hotel.status,
    });
  }

  getHotelImages() {
    this.hotelService.getHotelImages(this.hotelId).subscribe(
      (data: Image[]) => {
        this.images = data;
      },
      (error) => {
        console.log("Error fetching hotel images:", error);
      }
    );
  }

  checkDates(): boolean {
    const checkInDate = new Date(this.editHotel.value.checkIn);
    const checkOutDate = new Date(this.editHotel.value.checkOut);

    if (checkInDate >= checkOutDate) {
      return false;
    }
    return true;
  }

  deleteImage(image: Image) {
    if (image && image.url) {
      const parts = image.url.split("/");
      const publicId = parts[parts.length - 1].split(".")[0];
      console.log(publicId);

      this.hotelService.deleteHotelPhoto(this.hotelId, publicId).subscribe(
        () => {
          this.toastr.success("Xóa ảnh thành công", "Thành công");
          this.images = this.images.filter((img) => img.url !== image.url);
        },
        (error) => {
          console.log("Error deleting image:", error);
          this.toastr.error("Lỗi khi xóa ảnh", "Lỗi");
        }
      );
    } else {
      console.error("Image or Image URL is null or undefined");
    }
  }

  onSubmit() {
    if (this.editHotel.valid) {
      const checkInChanged =
        this.editHotel.value.checkIn !== this.hotel.checkIn;
      const checkOutChanged =
        this.editHotel.value.checkOut !== this.hotel.checkOut;
      if (checkInChanged || checkOutChanged) {
        if (!this.checkDates()) {
          this.toastr.error(
            "Ngày nhận phòng không thể sau ngày trả phòng",
            "Lỗi"
          );
          return;
        }
      }
      const updatedHotel: Hotel = {
        ...this.hotel,
        ...this.editHotel.value,
      };
      if (JSON.stringify(updatedHotel) === JSON.stringify(this.hotel)) {
         this.toastr.info("Không có thay đổi nào được thực hiện", "Thông tin");
        return;
      }
      console.log("Updated Hotel:", updatedHotel);
      this.hotelService.updateHotel(updatedHotel).subscribe(
        (response) => {
          if (this.selectedFiles && this.selectedFiles.length > 0) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
              this.hotelService
                .uploadPhoto(this.hotelId, this.selectedFiles[i])
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
          console.log("Hotel updated", response);
          this.toastr.success("Cập nhật khách sạn thành công!", "Thành công");
          this.router.navigate(["/hotels/hotel"]);
        },
        (error) => {
          console.log("Error updating hotel:", error);
          this.toastr.error("Lỗi khi cập nhật khách sạn", "Lỗi");
        }
      );
    } else {
      this.toastr.error("Dữ liệu nhập vào không hợp lệ", "Lỗi");
    }
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onCancel() {
    this.router.navigate(["/hotels/hotel"]);
  }
}
