import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentComponent} from "./comment.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ CommentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports:[ CommentComponent]
})
export class CommentModule { }
