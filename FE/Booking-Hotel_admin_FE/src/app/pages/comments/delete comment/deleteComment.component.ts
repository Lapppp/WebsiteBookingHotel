import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-delete-comment",
  templateUrl: "./delete-comment.component.html",
  styleUrls: ["./delete-comment.component.css"],
})
export class DeleteCommentComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCommentComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
