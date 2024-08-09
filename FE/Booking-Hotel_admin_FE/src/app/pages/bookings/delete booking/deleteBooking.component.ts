import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-delete-Booking",
  templateUrl: "./delete-booking.component.html",
  styleUrls: ["./delete-booking.component.css"],
})
export class DeleteBookingComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteBookingComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
