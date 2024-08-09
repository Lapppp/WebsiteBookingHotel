import {Component, EventEmitter, OnInit, Output, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReviewService} from "./review.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent  {


  currentStarIndex: number = 0;

  @Output() reviewSubmitted = new EventEmitter<any>();
  reviewForm: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<ReviewComponent>,

             private reviewservice: ReviewService,
  @Inject(MAT_DIALOG_DATA) public data: { bookingId: string, hotelId: number }
  ) {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      rating: [1, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const reviewData = {
        title: this.reviewForm.get('title')?.value,
        rating: this.reviewForm.get('rating')?.value,
        bookingId: this.data.bookingId,
        hotelId: this.data.hotelId
      };
// this.reviewservice.addReview(reviewData).subscribe((data) => {
//
// });
  this.dialogRef.componentInstance.reviewSubmitted.emit(reviewData);
  this.dialogRef.close();


    } else {
      this.reviewForm.get('title')?.markAsTouched();
    }
  }

  onStarClicked(index: number): void {
    this.currentStarIndex = index + 1;
    this.reviewForm.get('rating')?.setValue(this.currentStarIndex);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
  }

}
