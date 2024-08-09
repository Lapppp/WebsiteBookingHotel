import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Hotel, Image } from "../hotel";
import { HotelService } from "../hotel.service";
import { ToastrService } from "ngx-toastr";
import { DeleteConfirmationDialogComponent } from "../delete hotel/delete-confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ImageModalComponent } from "../Image/image-modal.component";

@Component({
  selector: "app-hotel",
  templateUrl: "./hotel-list.component.html",
})
export class HotelComponent implements OnInit {
  hotels: Hotel[] = [];
  images: Image[] = [];
  temp: Hotel[] = [];
  entries: number = 10;
  showDeleteConfirmation = false;
  hotelIdToDelete: number | null = null;
  selectedHotel: Hotel | null = null;

  @ViewChild("detailModal") detailModal: ElementRef;

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels() {
    this.hotelService.getHotels().subscribe(
      (data: Hotel[]) => {
        this.hotels = data;
        this.temp = [...data];
      },
      (error) => {
        console.log("Error fetching hotels:", error);
      }
    );
  }

  viewDetails(row: Hotel) {
    this.selectedHotel = row;
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
    const temp = this.hotels.filter((d) => {
      const name = d.name ? d.name.toLowerCase() : "";
      return name.indexOf(val) !== -1 || !val;
    });
    this.temp = temp;
  }

  onActivate(event: any) {
    // Handle row activation events here if necessary
  }

  editHotel(id: number) {
    this.router.navigate([`/hotels/editHotel/${id}`]);
  }

  addRoom() {
    this.router.navigate([`/rooms/addRoom`]);
  }

  confirmDeleteHotel(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteHotel(id);
      }
    });
  }

  deleteHotel(id: number) {
    this.hotelService.deleteHotel(id).subscribe(
      () => {
         this.toastr.success("Xóa khách sạn thành công!");
        this.getHotels();
      },
      (error) => {
        console.log("Error deleting hotel:", error);
        this.toastr.error("Không thể xóa khách sạn.");
      }
    );
  }

  openImageModal(hotelId: number) {
    this.hotelService.getHotelImages(hotelId).subscribe(
      (data: Image[]) => {
        this.dialog.open(ImageModalComponent, {
          width: "50%",
          data: data,
        });
      },
      (error) => {
        console.log("Error fetching hotel images:", error);
      }
    );
  }
}
