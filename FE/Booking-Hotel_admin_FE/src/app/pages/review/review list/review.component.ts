import { Component, OnInit } from "@angular/core";
import { Review } from "../review";
import { ReviewService } from "../review.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { DeleteReviewComponent } from "../delete review/deleteReview.component";
import { Hotel } from "../../hotel/hotel";
import { HotelService } from "../../hotel/hotel.service";

@Component({
  selector: "app-Review",
  templateUrl: "./review-list.component.html",
})
export class ReviewComponent implements OnInit {
  Reviews: Review[] = [];
  temp: Review[] = [];
  hotels: Hotel[] = [];
  hotelId: number | null = null; 
  entries: number = 10;
  showDeleteConfirmation = false;
  reviewIdToDelete: number | null = null;

  constructor(
    private reviewService: ReviewService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {
    this.reviewService.getReviews().subscribe(
      (data: Review[]) => {
        if (data && data.length > 0) {
          this.Reviews = data;
          this.temp = [...this.Reviews]; // Copy the data to the temporary array for filtering
        } else {
          console.log("No Reviews available");
          this.Reviews = [];
          this.temp = [];
          this.toastr.info("Không có đánh giá nào", "Thông tin");
        }
      },
      (error) => {
        console.error("Error fetching Reviews:", error);
        this.toastr.error("Lỗi khi tải đánh giá", "Lỗi");
        this.Reviews = [];
        this.temp = [];
      }
    );
  }

  entriesChange(event: any) {
    this.entries = event.target.value;
  }

  filterTable(event: any) {
    const val = event.target.value ? event.target.value.toLowerCase() : "";
    this.temp = this.Reviews.filter((d) => {
      const title = d.title ? d.title.toLowerCase() : "";
      const userName = d.userName ? d.userName.toLowerCase() : "";
      return title.includes(val) || userName.includes(val) || !val;
    });
  }

  onActivate(event: any) {}

  confirmDeleteReview(id: number) {
    const dialogRef = this.dialog.open(DeleteReviewComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteReview(id);
      }
    });
  }

  deleteReview(id: number) {
      this.reviewService.deleteReview(id).subscribe(
        () => {
           this.toastr.success("Đánh giá đã được xóa thành công!");
          this.getReviews(); // Fetch reviews again after deletion
        },
        (error) => {
          console.error("Error deleting Review:", error);
          this.toastr.error("Không thể xóa đánh giá.", "Lỗi");
        }
      );
  }
}
