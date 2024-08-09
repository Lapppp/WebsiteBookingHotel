import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonModule, CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [
    CurrencyPipe,CommonModule
  ],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.scss'
})
export class SuccessPageComponent  implements OnInit  {
  bookingId: string='';
  status: string='';
  email: string='';
  totalPrice: number=0;
  UserName: string='';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['id'];
      this.status= params['status'];
      this.email = params['email'];
      this.totalPrice = params['amount'];
      this.UserName = params['name'];
    });
    console.log("lap thanh cong", this.status)
  }
  goHome(){
    window.location.href = '/';
  }
}
