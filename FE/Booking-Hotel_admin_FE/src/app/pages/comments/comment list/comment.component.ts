import { Component, OnInit } from "@angular/core";
import { CommentService } from "../comment.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { DeleteCommentComponent } from "../delete comment/deleteComment.component";
import { Comment } from "../comment";
import { HotelService } from "../../hotel/hotel.service";
import { Hotel } from "../../hotel/hotel";

@Component({
  selector: "app-comment",
  templateUrl: "./comment-list.component.html",
})
export class CommentComponent implements OnInit {
  comments: Comment[] = [];
  temp: Comment[] = [];
  hotels: Hotel[] = [];
  hotelId: number | null = null;
  entries: number = 10; // Thêm thuộc tính entries
  expandedComments: { [key: number]: boolean } = {};

  constructor(
    private commentService: CommentService,
    private hotelService: HotelService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe(
      (data: Hotel[]) => {
        this.hotels = data;
      },
      (error) => {
        console.error("Lỗi khi tải danh sách khách sạn:", error);
        this.toastr.error("Lỗi khi tải danh sách khách sạn", "Lỗi");
      }
    );
  }

  toggleChildComments(commentId: number) {
    this.expandedComments[commentId] = !this.expandedComments[commentId];
  }

  onHotelChange(event: any) {
    this.hotelId = event.target.value ? parseInt(event.target.value, 10) : null;
    if (this.hotelId) {
      this.getComments(this.hotelId);
    } else {
      this.comments = [];
      this.temp = [];
    }
  }

  getComments(hotelId: number) {
    this.commentService.getComments(hotelId).subscribe(
      (data: Comment[]) => {
        if (data && data.length > 0) {
          this.comments = data;
          this.temp = [...this.comments];
        } else {
          this.comments = [];
          this.temp = [];
          this.toastr.info("Không có comment nào", "Thông báo");
        }
      },
      (error) => {
        console.error("Lỗi khi tải danh sách comment:", error);
        this.toastr.error("Lỗi khi tải danh sách comment", "Lỗi");
        this.comments = [];
        this.temp = [];
      }
    );
  }

  entriesChange(event: any) {
    this.entries = event.target.value;
  }

  filterTable(event: any) {
    const val = event.target.value ? event.target.value.toLowerCase() : "";
    this.temp = this.comments.filter((d) => {
      const userName = d.userName ? d.userName.toLowerCase() : "";
      return userName.includes(val) || !val;
    });
  }

  confirmDeleteComment(id: number) {
    const dialogRef = this.dialog.open(DeleteCommentComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteComment(id);
      }
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(
      () => {
        this.toastr.success("Đã xóa comment thành công!");
        if (this.hotelId) {
          this.getComments(this.hotelId);
        }
      },
      (error) => {
        console.error("Lỗi khi xóa comment:", error);
        this.toastr.error("Xóa comment thất bại", "Lỗi");
      }
    );
  }

  onActivate(event: any) {}
}
