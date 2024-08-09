import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-delete-promotion",
  templateUrl: "./delete-promotion.component.html",
  styleUrls: ["./delete-promotion.component.css"],
})
export class DeletePromotionComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePromotionComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
