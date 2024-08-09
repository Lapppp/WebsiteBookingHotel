// import { Component, Renderer2,OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
//
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent implements OnInit {
//
//   constructor(private renderer: Renderer2,
//               private authService:AuthService,
//               private router: Router,) { }
//   currentUser: any;
//
//   ngOnInit(): void {
//     const preloaderElement = document.getElementById('preloader');
//     if (preloaderElement) {
//       this.renderer.removeClass(preloaderElement, 'd-none')
//     }
//     // setTimeout(() => {
//     //   this.renderer.addClass(preloaderElement, 'd-none');
//     // }, 1000);
//   }
//
//   curentsection: any = 'home';
//
//
//   onSectionChange(event: any) {
//     this.curentsection = event;
//   }
//
//   windoscroll() {
//     const navbar = document.getElementById('navbar');
//     if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
//       navbar?.classList.add('nav-sticky');
//       document.getElementById('back-to-top')!.style.display = 'block'
//     }
//     else {
//       navbar?.classList.remove('nav-sticky');
//       document.getElementById('back-to-top')!.style.display = 'none'
//     }
//   }
//
//   //togglemenu
//   toggleMenu() {
//     document.getElementById('navbarSupportedContent')!.classList.toggle('show')
//   }
//
//   logout() {
//     this.authService.logout();
//     this.router.navigate(["/login"]);
//   }
// }
import { Component, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(
    private renderer: Renderer2,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();
  }

  curentsection: any = 'home';

  onSectionChange(event: any) {
    this.curentsection = event;
  }

  // windoscroll() {
  //   const navbar = document.getElementById('navbar');
  //   if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
  //     navbar?.classList.add('nav-sticky');
  //     document.getElementById('back-to-top')!.style.display = 'block';
  //   } else {
  //     navbar?.classList.remove('nav-sticky');
  //     document.getElementById('back-to-top')!.style.display = 'none';
  //   }
  // }

  //togglemenu
  toggleMenu() {
    document.getElementById('navbarSupportedContent')!.classList.toggle('show');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
