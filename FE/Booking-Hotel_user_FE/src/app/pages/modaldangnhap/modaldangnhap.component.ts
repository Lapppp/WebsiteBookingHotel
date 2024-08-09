import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-modaldangnhap',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './modaldangnhap.component.html',
  styleUrl: './modaldangnhap.component.scss'
})
export class ModaldangnhapComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ModaldangnhapComponent>,
    private router: Router // Inject Router
  ) {}
  ngOnInit(): void {
    this.returnUrl = this.router.url;
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onLogin(): void {
    this.dialogRef.close(true);
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl } });
    console.log('Login', this.returnUrl);
  }
  returnUrl: string = '/';
}
