import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { UserService } from "../user.service";
import { Image, User } from "../user";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
})
export class EditUserComponent implements OnInit {
  editUser: FormGroup;
  userId: string;
  user: User;
  images: Image[] = [];
  selectedFiles: FileList;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get("id");
      console.log("User ID from paramMap:", this.userId);
      if (this.userId) {
        this.initForm();
        this.getUser();
        this.getUserImages();
      } else {
        console.error("User ID is null or undefined");
      }
    });
  }

  initForm() {
    this.editUser = this.fb.group({
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      name: [""],
      password: [""],
      phone: ["", [Validators.required, this.phoneValidator]], // Updated to match UserDto
    });
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        if (user) {
          this.user = user;
          this.editUser.patchValue(user);
        } else {
          console.error("No user found with ID:", this.userId);
        }
      },
      (error) => {
        console.log("Error fetching user:", error);
      }
    );
  }

  getUserImages() {
    this.userService.getUserImages(this.userId).subscribe(
      (data: Image[]) => {
        this.images = data;
      },
      (error) => {
        console.log("Error fetching hotel images:", error);
      }
    );
  }

  deleteImage(image: Image) {
    if (image && image.url) {
      const parts = image.url.split("/");
      const publicId = parts[parts.length - 1].split(".")[0];
      console.log(publicId);

      this.userService.deleteUserPhoto(this.userId, publicId).subscribe(
        () => {
          this.toastr.success("Đã xóa hình ảnh thành công", "Thành công");
          this.images = this.images.filter((img) => img.url !== image.url);
        },
        (error) => {
          console.log("Error deleting image:", error);
          this.toastr.error("Lỗi khi xóa hình ảnh", "Lỗi");
        }
      );
    } else {
      console.error("Image or Image URL is null or undefined");
    }
  }

  onSubmit() {
    if (this.editUser.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.editUser.value,
      };
      console.log("Updated User:", updatedUser);
      this.userService.updateUser(updatedUser).subscribe(
        (response) => {
          if (this.selectedFiles && this.selectedFiles.length > 0) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
              this.userService
                .uploadPhoto(this.userId, this.selectedFiles[i])
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
          console.log("User updated", response);
          this.toastr.success(
            "Người dùng đã được cập nhật thành công!",
            "Thành công"
          );
          this.router.navigate(["/users/user"]);
        },
        (error) => {
          console.log("Error updating user:", error);
           this.toastr.error("Lỗi khi cập nhật người dùng", "Lỗi");
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onCancel() {
    this.router.navigate(["/users/user"]);
  }

  phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phone = control.value;
    if (phone && phone.length !== 10) {
      return { invalidPhone: true };
    }
    return null;
  }
}
