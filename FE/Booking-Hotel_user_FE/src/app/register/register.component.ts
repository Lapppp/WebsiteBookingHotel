import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailExists: boolean = false;
  userNameExists: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  register() {
    if (this.registerForm.valid) {
      this.checkEmailAndUserName();
    } else {
      this.toastr.warning('Form is invalid', 'Warning');
      this.markFormGroupTouched(this.registerForm);
    }
  }

  checkEmailAndUserName() {
    const email = this.registerForm.get('email')?.value;
    const userName = this.registerForm.get('userName')?.value;

    this.authService.checkEmailExists(email).subscribe(emailExists => {
      this.emailExists = emailExists;

      if (emailExists) {
        this.toastr.error('Email already exists', 'Registration Failed');
      } else {
        this.authService.checkUserNameExists(userName).subscribe(userNameExists => {
          this.userNameExists = userNameExists;

          if (userNameExists) {
            this.toastr.error('Username already exists', 'Registration Failed');
          } else {
            this.registerUser();
          }
        });
      }
    });
  }

  registerUser() {
    const user = {
      Username: this.registerForm.get('userName')?.value,
      Email: this.registerForm.get('email')?.value,
      Phone: this.registerForm.get('phone')?.value,
      Password: this.registerForm.get('password')?.value,
      ConfirmPassword: this.registerForm.get('confirmPassword')?.value,
    };
  console.log("user",user)
    this.authService.addUsers(user).subscribe(
      response => {
        this.toastr.success("Đăng ký thành công ", 'Sẽ chuyển về trang đăng nhập');
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error('Registration error', 'Registration Failed');
        console.error(error); // Thêm dòng này để xem lỗi chi tiết
      }
    );
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
