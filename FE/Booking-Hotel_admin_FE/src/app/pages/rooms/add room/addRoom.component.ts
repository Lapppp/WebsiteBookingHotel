import { Hotel } from "./../../hotel/hotel";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RoomService } from "../service/room.service";
import { RoomTypeService } from "../service/roomType.service";
import { AmenityService } from "../service/amenity.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Amenity, RoomType } from "../room";
import { HotelService } from "../../hotel/hotel.service";

@Component({
  selector: "app-room",
  templateUrl: "./add-room.component.html",
  styles: [
    `
      .icon-picker {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
      }

      .icon-picker i {
        font-size: 24px;
        cursor: pointer;
      }

      .form-control[readonly] {
        background-color: #e9ecef;
      }
    `,
  ],
})
export class AddRoomComponent implements OnInit {
  addRoom: FormGroup;
  addRoomType: FormGroup;
  addAmenity: FormGroup;
  amenities: Amenity[] = [];
  roomTypes: RoomType[] = [];
  hotels: Hotel[] = [];
  selectedAmenities: number[] = [];
  selectedRoomTypes: number[] = [];
  selectedHotelId: number;
  icons = [
    "uil uil-wifi",
    "uil uil-parking-square",
    "uil uil-swimmer",
    "uil uil-dumbbell",
    "uil uil-restaurant",
    "uil uil-bell",
    "uil uil-flower",
    "uil uil-presentation-edit",
    "uil uil-glass-martini-alt",
    "uil uil-water-glass",
    "uil uil-plane-departure",
    "uil uil-kid",
    "uil uil-car",
    "uil uil-coffee",
    "uil uil-clock-nine",
    "uil uil-ban",
    "uil uil-wheelchair",
    "uil uil-shopping-bag",
  ];
  isDropdownOpen = false;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private amenityService: AmenityService,
    private hotelService: HotelService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForms();
    this.loadAmenities();
    this.loadRoomTypes();
    this.loadHotels();
  }

  initForms() {
    this.addRoom = this.fb.group({
      roomNumber: ["", Validators.required],
      description: [""],
      price: ["", Validators.required],
      capacity: ["", Validators.required],
      floor: ["", Validators.required],
      size: ["", Validators.required],
      view: ["", Validators.required],
      status: ["Active"],
      amenities: [[], Validators.required],
      roomTypes: [[], Validators.required],
      hotelID: ["", Validators.required], // Chỉ cần một ID thay vì danh sách
    });
    this.addRoomType = this.fb.group({
      name: ["", Validators.required],
    });
    this.addAmenity = this.fb.group({
      name: ["", Validators.required],
      icon: ["", Validators.required],
      category: ["", Validators.required],
      description: [""],
    });
  }

  loadAmenities() {
    this.amenityService.getAmenities().subscribe(
      (amenities: Amenity[]) => {
        this.amenities = amenities;
      },
      (error) => {
        console.log("Error loading amenities:", error);
      }
    );
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
      },
      (error) => {
        console.log("Error loading hotels:", error);
      }
    );
  }

  loadRoomTypes() {
    this.roomTypeService.getRoomTypes().subscribe(
      (roomTypes: RoomType[]) => {
        this.roomTypes = roomTypes;
      },
      (error) => {
        console.log("Error loading room types:", error);
      }
    );
  }

  onAddRoomType() {
    if (this.addRoomType.valid) {
      const roomTypePayload = {
        name: this.addRoomType.get("name").value,
      };

      this.roomTypeService.addRoomType(roomTypePayload).subscribe(
        (roomType) => {
          this.toastr.success(
            "Loại phòng đã được thêm thành công!",
            "Thành công"
          );
          this.roomTypes.push(roomType);
          this.addRoomType.reset();
        },
        (error) => {
          console.error("Error adding room type", error);
          this.toastr.error("Lỗi khi thêm loại phòng", "Lỗi");
        }
      );
    } else {
      this.toastr.error("Vui lòng điền thông tin đúng đắn", "Lỗi");
    }
  }

  onAddAmenity() {
    if (this.addAmenity.valid) {
      const amenityPayload = {
        icon: this.addAmenity.get("icon").value,
        category: this.addAmenity.get("category").value,
        name: this.addAmenity.get("name").value,
        description: this.addAmenity.get("description").value || null,
      };

      this.amenityService.addAmenity(amenityPayload).subscribe(
        (amenity) => {
          this.toastr.success(
            "Tiện nghi đã được thêm thành công!",
            "Thành công"
          );
          this.amenities.push(amenity);
          this.addAmenity.reset();
        },
        (error) => {
          console.error("Error adding amenity", error);
          this.toastr.error("Lỗi khi thêm tiện nghi", "Lỗi");
        }
      );
    } else {
      this.toastr.error("Vui lòng điền thông tin đúng đắn", "Lỗi");
    }
  }

  onSubmit() {
    if (this.addRoom.valid) {
      const roomPayload = {
        roomNumber: this.addRoom.get("roomNumber").value,
        description: this.addRoom.get("description").value,
        price: this.addRoom.get("price").value,
        capacity: this.addRoom.get("capacity").value,
        floor: this.addRoom.get("floor").value,
        size: this.addRoom.get("size").value,
        view: this.addRoom.get("view").value,
        status: this.addRoom.get("status").value,
        hotelID: this.addRoom.get("hotelID").value, // Lấy ID khách sạn đã chọn từ form
        amenities: this.addRoom.get("amenities").value, // ID amenities đã chọn
        roomTypes: this.addRoom.get("roomTypes").value, // ID roomTypes đã chọn
      };

      this.roomService.addRoom(roomPayload).subscribe(
        () => {
          this.toastr.success("Phòng đã được thêm thành công!", "Thành công");
          this.router.navigate(["/rooms/room"]);
        },
        (error) => {
          console.error("Error adding room", error);
          this.toastr.error("Lỗi khi thêm phòng", "Lỗi");
        }
      );
    } else {
      this.toastr.error("Vui lòng điền thông tin đúng đắn", "Lỗi");
    }
  }

  resetForm() {
    this.addRoom.reset();
    this.selectedAmenities = [];
    this.selectedRoomTypes = [];
    this.selectedHotelId = null;
  }

  onAmenitiesChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedAmenities = Array.from(
      selectElement.selectedOptions,
      (option) => +option.value
    );
  }

  onRoomTypesChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRoomTypes = Array.from(
      selectElement.selectedOptions,
      (option) => +option.value
    );
  }

  onSelectHotel(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedHotelId = +selectElement.value;
  }

  selectIcon(icon: string) {
    this.addAmenity.patchValue({ icon });
    this.isDropdownOpen = false; // Đóng dropdown sau khi chọn icon
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  iconMappings = {
    "uil uil-wifi": "Wifi",
    "uil uil-parking-square": "Bãi đỗ xe",
    "uil uil-swimmer": "Hồ bơi",
    "uil uil-dumbbell": "Phòng gym",
    "uil uil-restaurant": "Nhà hàng",
    "uil uil-bell": "Tiếp tân",
    "uil uil-flower": "Spa",
    "uil uil-presentation-edit": "Phòng họp và hội nghị",
    "uil uil-glass-martini-alt": "Quầy bar",
    "uil uil-water-glass": "Dịch vụ giặt là",
    "uil uil-plane-departure": "Đưa đón sân bay",
    "uil uil-kid": "Khu vui chơi trẻ em",
    "uil uil-car": "Dịch vụ thuê xe",
    "uil uil-coffee": "Bữa sáng miễn phí",
    "uil uil-clock-nine": "Tiếp tân 24/7",
    "uil uil-ban": "Phòng không hút thuốc",
    "uil uil-wheelchair": "Tiện nghi cho người khuyết tật",
    "uil uil-shopping-bag": "Trung tâm thương mại",
  };

  getIconName(iconClass: string): string {
    return this.iconMappings[iconClass] || "Unknown Icon";
  }
}
