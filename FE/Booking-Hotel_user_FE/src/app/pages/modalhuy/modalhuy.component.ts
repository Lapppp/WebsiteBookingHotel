import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-modalhuy',
  standalone: true,
  imports: [],
  templateUrl: './modalhuy.component.html',
  styleUrl: './modalhuy.component.scss'
})
export class ModalhuyComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalhuyComponent>
  ) {}
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
