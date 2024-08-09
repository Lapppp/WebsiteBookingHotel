import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  userName: string = "";
  password: string = "";
  rememberMe: boolean = false;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    if (this.userName && this.password) {
      this.authService
        .login(this.userName, this.password, this.rememberMe)
        .subscribe({
          next: (success) => {
            if (success) {
              if (this.rememberMe) {
                localStorage.setItem("username", this.userName);
              } else {
                localStorage.removeItem("username");
              }
              this.router
                .navigate(["/dashboards"])
                .then((navigationSuccess) => {
                  if (navigationSuccess) {
                    console.log("Navigation to /dashboards successful");
                  } else {
                    console.error("Navigation to /dashboards failed");
                    this.toastr.error(
                      "Navigation to dashboards failed",
                      "Error"
                    );
                  }
                });
            } else {
              console.error("Invalid credentials");
              this.toastr.error("Invalid credentials", "Login Failed");
            }
          },
          error: (error) => {
            console.error("Login error:", error);
            this.toastr.error("An error occurred during login", "Login Error");
          },
        });
    } else {
      this.toastr.warning("Please enter both username and password", "Warning");
    }
  }

  ngOnInit() {
    if (localStorage.getItem("rememberMe") === "true") {
      this.userName = localStorage.getItem("username") || "";
      this.rememberMe = true;
    }
  }
}
