import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
@Component({
  selector: 'app-modalthanhcong',
  standalone: true,
  imports: [],
  templateUrl: './modalthanhcong.component.html',
  styleUrl: './modalthanhcong.component.scss'
})
export class ModalthanhcongComponent {

  constructor(private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }
}
