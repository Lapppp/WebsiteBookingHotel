import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Amenity, Room, RoomType } from "../room";
import { RoomService } from "../service/room.service";
import { ToastrService } from "ngx-toastr";
import { RoomTypeService } from "../service/roomType.service";
import { AmenityService } from "../service/amenity.service";
import { HotelService } from "../../hotel/hotel.service";
import { Hotel } from "../../hotel/hotel";

@Component({
  selector: "app-edit-room",
  templateUrl: "./edit-room.component.html",
})
export class EditRoomComponent implements OnInit {
  editRoom: FormGroup;
  roomId: number;
  room: Room;
  hotels: Hotel[] = [];
  amenities: Amenity[] = [];
  roomTypes: RoomType[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private amenityService: AmenityService,
    private hotelService: HotelService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      this.roomId = +params.get("id");
      if (this.roomId) {
        this.getRoom();
      }
    });
    this.loadHotels();
    this.loadAmenities();
    this.loadRoomTypes();
  }

  initForm() {
    this.editRoom = this.fb.group({
      roomNumber: ["", Validators.required],
      description: [""],
      price: ["", Validators.required],
      capacity: ["", Validators.required],
      floor: ["", Validators.required],
      size: ["", Validators.required],
      view: ["", Validators.required],
      status: ["", Validators.required],
      hotelID: ["", Validators.required],
      amenities: [[]],
      roomTypes: [[]],
    });
  }

  getRoom() {
    this.roomService.getRoomById(this.roomId).subscribe(
      (room: Room) => {
        if (room) {
          this.room = room;
          this.patchRoomForm(room);
        } else {
          console.error("No room found with ID:", this.roomId);
        }
      },
      (error) => {
        console.log("Error fetching room:", error);
      }
    );
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
      },
      (error) => {
        console.log("Error fetching hotels:", error);
      }
    );
  }

  loadAmenities() {
    this.amenityService.getAmenities().subscribe(
      (amenities: Amenity[]) => {
        this.amenities = amenities;
      },
      (error) => {
        console.log("Error fetching amenities:", error);
      }
    );
  }

  loadRoomTypes() {
    this.roomTypeService.getRoomTypes().subscribe(
      (roomTypes: RoomType[]) => {
        this.roomTypes = roomTypes;
      },
      (error) => {
        console.log("Error fetching room types:", error);
      }
    );
  }

  patchRoomForm(room: Room) {
    this.editRoom.patchValue({
      roomNumber: room.roomNumber,
      description: room.description,
      price: room.price,
      capacity: room.capacity,
      floor: room.floor,
      size: room.size,
      view: room.view,
      status: room.status,
      hotelID: room.hotelID,
      amenities: room.amenities.map((amenity) => amenity.id),
      roomTypes: room.roomTypes.map((type) => type.id),
    });
  }

  onSubmit() {
    if (this.editRoom.valid) {
      const updatedRoom: Room = { ...this.room, ...this.editRoom.value };
      if (JSON.stringify(updatedRoom) === JSON.stringify(this.room)) {
        this.toastr.info("Không có thay đổi nào được thực hiện", "Thông tin");
        return;
      }
      this.roomService.updateRoom(updatedRoom).subscribe(
        () => {
          this.toastr.success(
            "Phòng đã được cập nhật thành công!",
            "Thành công"
          );
          this.router.navigate(["/rooms/room"]);
          // Gọi lại getRooms để cập nhật danh sách phòng
          this.roomService.getRooms().subscribe(
            (data: Room[]) => {
              this.roomService.rooms = data;
            },
            (error) => {
              console.error("Error fetching updated rooms:", error);
              this.toastr.error(
                "Lỗi khi lấy danh sách phòng đã cập nhật",
                "Lỗi"
              );
            }
          );
        },
        (error) => {
          console.log("Error updating room:", error);
          this.toastr.error("Cập nhật phòng thất bại", "Lỗi");
        }
      );
    } else {
      this.toastr.error("Vui lòng điền thông tin đúng đắn", "Lỗi");
    }
  }

  onCancel() {
    this.router.navigate(["/rooms/room"]);
  }
}
