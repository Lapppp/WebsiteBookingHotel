import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-delete-slideShow",
  templateUrl: "./delete-slideShow.component.html",
  styleUrls: ["./delete-slideShow.component.css"],
})
export class DeleteSlideShowComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSlideShowComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
