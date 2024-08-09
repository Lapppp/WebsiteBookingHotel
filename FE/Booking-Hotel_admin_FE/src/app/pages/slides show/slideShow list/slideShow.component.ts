import { Component, OnInit } from "@angular/core";
import { SlideShow } from "../slideShow";
import { SlideShowService } from "../slideShow.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { DeleteSlideShowComponent } from "../delete slideShow/deleteSlideShow.component";

@Component({
  selector: "app-SlideShow",
  templateUrl: "./slideShow-list.component.html",
})
export class SlideShowComponent implements OnInit {
  slidesShow: SlideShow[] = [];
  temp: SlideShow[] = [];
  entries: number = 10;
  showDeleteConfirmation = false;
  SlideShowIdToDelete: string | null = null;

  constructor(
    private slideShowService: SlideShowService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getSlideShows();
  }

  getSlideShows() {
    this.slideShowService.getSlidesShow().subscribe(
      (data: SlideShow[]) => {
        if (data && data.length > 0) {
          this.slidesShow = data;
          this.temp = [...this.slidesShow]; // Copy the data to the temporary array for filtering
        } else {
          console.log("No SlideShows available");
          this.slidesShow = [];
          this.temp = [];
          this.toastr.info("Không có SlideShow nào", "Thông tin");
        }
      },
      (error) => {
        console.error("Error fetching SlideShows:", error);
        this.toastr.error("Lỗi khi tải SlideShow", "Lỗi");
        this.slidesShow = [];
        this.temp = [];
      }
    );
  }

  entriesChange(event: any) {
    this.entries = event.target.value;
  }

  filterTable(event: any) {
    const val = event.target.value ? event.target.value.toLowerCase() : "";
    this.temp = this.slidesShow.filter((d) => {
      const hotelName = d.hotelName ? d.hotelName.toLowerCase() : "";
      return hotelName.includes(val) || !val;
    });
  }

  onActivate(event: any) {}

  confirmDeleteSlideShow(publicImageID: string) {
    const dialogRef = this.dialog.open(DeleteSlideShowComponent, {
      data: { publicImageID },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSlideShow(publicImageID);
      }
    });
  }

  deleteSlideShow(publicImageID: string) {
    this.slideShowService.deleteSlideShow(publicImageID).subscribe(
      () => {
        this.toastr.success("Đã xóa SlideShow thành công!");
        this.getSlideShows(); // Refresh the list after deletion
      },
      (error) => {
        console.error("Error deleting SlideShow:", error);
        this.toastr.error("Xóa SlideShow thất bại.", "Lỗi");
      }
    );
  }
}
