import {Component , OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  userName: string = "";
  password: string = "";
  rememberMe: boolean = false;
  currentUser: any;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              ) {
  }

  // login() {
  //
  //   if (this.userName && this.password) {
  //     this.authService
  //       .login(this.userName, this.password, this.rememberMe)
  //       .subscribe({
  //         next: (success) => {
  //           if (success) {
  //             if (this.rememberMe) {
  //               localStorage.setItem("username", this.userName);
  //             } else {
  //               localStorage.removeItem("username");
  //             }
  //
  //             this.router
  //               .navigate([""])
  //               .then((navigationSuccess) => {
  //                 if (navigationSuccess) {
  //
  //                   console.log("Navigation to /dashboards successful");
  //                 } else {
  //                   console.error("Navigation to /dashboards failed");
  //                   this.toastr.error(
  //                     "Navigation to dashboards failed",
  //                     "Error"
  //                   );
  //                 }
  //               });
  //           } else {
  //             console.error("Invalid credentials");
  //             this.toastr.error("Invalid credentials", "Login Failed");
  //           }
  //         },
  //         error: (error) => {
  //           console.error("Login error:", error);
  //           this.toastr.error("An error occurred during login", "Login Error");
  //         },
  //       });
  //   } else {
  //     this.toastr.warning("Please enter both username and password", "Warning");
  //   }
  // }
  login() {
    if (this.userName && this.password) {
      this.authService.login(this.userName, this.password, this.rememberMe).subscribe({
        next: (success) => {
          if (success) {
            if (this.rememberMe) {
              localStorage.setItem("username", this.userName);
            } else {
              localStorage.removeItem("username");
            }

            const previousUrl = this.authService.getPreviousUrl();
            if (previousUrl) {
              this.router.navigateByUrl(previousUrl).then((navigationSuccess) => {
                if (navigationSuccess) {
                  console.log("Navigation to previous URL successful");
                } else {
                  console.error("Navigation to previous URL failed");
                  this.toastr.error("Navigation to previous URL failed", "Error");
                }
              });
            } else {
              this.router.navigate(["/"]).then((navigationSuccess) => {
                if (navigationSuccess) {
                  console.log("Navigation to / successful");
                } else {
                  console.error("Navigation to / failed");
                  this.toastr.error("Navigation to / failed", "Error");
                }
              });
            }
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
  returnUrl: string = '/';
  ngOnInit() {
    if (localStorage.getItem("rememberMe") === "true") {
      this.userName = localStorage.getItem("username" ) || "";
      this.rememberMe = true;
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      console.log('returnUrl login', this.returnUrl);
    }





  }

}
