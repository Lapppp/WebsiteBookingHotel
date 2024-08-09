import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-delete-room",
  templateUrl: "./delete-review.component.html",
  styleUrls: ["./delete-review.component.css"],
})
export class DeleteReviewComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteReviewComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
