import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Room } from "../room";
import { RoomService } from "../service/room.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { DeleteRoomComponent } from "../delete room/deleteRoom.component";

@Component({
  selector: "app-room",
  templateUrl: "./room-list.component.html",
})
export class RoomComponent implements OnInit {
  rooms: Room[] = [];
  temp: Room[] = [];
  entries: number = 10;
  showDeleteConfirmation = false;
  roomIdToDelete: number | null = null;
  selectedRoom: Room | null = null;

  @ViewChild("detailModal") detailModal: ElementRef;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getRooms().subscribe(
      (data: Room[]) => {
        if (data && data.length > 0) {
          this.rooms = data;
          this.temp = [...this.rooms]; // Copy the data to the temporary array for filtering
        } else {
          console.log("No rooms available");
          this.rooms = [];
          this.temp = [];
          this.toastr.info("Không có phòng nào", "Thông tin");
        }
      },
      (error) => {
        console.error("Error fetching rooms:", error);
        this.toastr.error("Lỗi khi lấy danh sách phòng", "Lỗi");
        this.rooms = [];
        this.temp = [];
      }
    );
  }

  viewDetails(row: Room) {
    this.selectedRoom = row;
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
    this.temp = this.rooms.filter((d) => {
      const roomNumber = d.roomNumber ? d.roomNumber.toLowerCase() : "";
      const hotelName = d.hotelName ? d.hotelName.toLowerCase() : "";
      return roomNumber.includes(val) || hotelName.includes(val) || !val;
    });
  }

  onActivate(event: any) {}

  editRoom(id: number) {
    this.router.navigate([`/rooms/editRoom/${id}`]);
  }

  confirmDeleteRoom(id: number) {
    const dialogRef = this.dialog.open(DeleteRoomComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRoom(id);
      }
    });
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(
      () => {
        this.toastr.success("Xóa phòng thành công!");
        this.getRooms();
      },
      (error) => {
        console.error("Error deleting room:", error);
        this.toastr.error("Xóa phòng thất bại.", "Lỗi");
      }
    );
  }

  getAmenityNames(amenities: any[]): string {
    return amenities.map((a) => a.name).join(", ");
  }

  getRoomTypeNames(roomTypes: any[]): string {
    return roomTypes.map((rt) => rt.name).join(", ");
  }
}
