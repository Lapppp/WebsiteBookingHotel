import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { SlideShow } from "../slideShow";
import { SlideShowService } from "../slideShow.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-AddSlideShow",
  templateUrl: "./add-SlideShow.component.html",
})
export class AddSlideShowComponent implements OnInit {
  addSlideShow: FormGroup;
  selectedFiles: FileList | null = null;
  images: SlideShow[] = [];

  constructor(
    private fb: FormBuilder,
    private slideShowService: SlideShowService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.addSlideShow = this.fb.group({
      userID: [null],
      hotelID: [null],
    });
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const formData = new FormData();
      Array.from(this.selectedFiles).forEach((file) => {
        formData.append("file", file, file.name); // Ensure the key matches the server-side parameter name
      });

      this.slideShowService.addSlideShow(formData).subscribe(
        (response: any) => {
          if (response && response.image) {
            this.images.push(response.image);
             this.toastr.success("Thêm SlideShow thành công!", "Thành công");
            this.router.navigate(["/slidesShow/slideShow"]);
          } else {
            this.toastr.error(
              "Failed to add SlideShow, no image data returned",
              "Error"
            );
          }
        },
        (error) => {
          console.error("Error adding SlideShow", error);
          this.toastr.error("Lỗi khi thêm SlideShow", "Lỗi");
        }
      );
    } else {
      this.toastr.error("Vui lòng chọn tệp để tải lên", "Lỗi");
    }
  }

  resetForm() {
    this.addSlideShow.reset();
    this.selectedFiles = null;
  }
}
