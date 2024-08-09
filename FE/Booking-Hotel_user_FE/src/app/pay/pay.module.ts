import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { PayComponent } from './pay.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {RouterLink, RouterLinkActive} from "@angular/router";


@NgModule({
  declarations: [PayComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BsDropdownModule,
        RouterLink,
        RouterLinkActive,
      FormsModule,
    ],
  exports: [PayComponent],
})
export class PayModule { }
