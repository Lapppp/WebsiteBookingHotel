import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-form",
  templateUrl: "./add-user.component.html",
})
export class AddUserComponent implements OnInit {
  addUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.addUser = this.fb.group({
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, this.phoneValidator]],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.addUser.valid) {
      console.log("Form is valid, submitting:", this.addUser.value);

      const userPayload = {
        UserName: this.addUser.value.userName,
        Email: this.addUser.value.email,
        Password: this.addUser.value.password,
        Phone: this.addUser.value.phone,
      };

      this.userService.addUser(userPayload).subscribe(
        (response) => {
          console.log("User added successfully", response);
          this.toastr.success("Thêm người dùng thành công!", "Thành công");
          this.router.navigate(["/users/user"]);
        },
        (error) => {
          console.error("Error adding user", error);
          this.toastr.error("Lỗi khi thêm người dùng", "Lỗi");
        }
      );
    } else {
      console.log("Form is invalid");
      this.toastr.error("Vui lòng kiểm tra lại thông tin", "Lỗi");
    }
  }

  resetForm() {
    this.addUser.reset();
  }

  phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phone = control.value;
    if (phone && phone.length !== 10) {
      return { invalidPhone: true };
    }
    return null;
  }
}
