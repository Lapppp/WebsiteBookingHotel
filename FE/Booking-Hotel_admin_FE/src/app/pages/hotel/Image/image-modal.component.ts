import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Image } from "../hotel";
import { Component, Inject } from "@angular/core";

@Component({
  selector: "app-image-modal",
  templateUrl: "./image-modal.component.html",
  styleUrls: ["./image-modal.component.css"],
})
export class ImageModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public images: Image[]
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
