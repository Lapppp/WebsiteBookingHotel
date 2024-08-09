import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Promotion } from "../promotion";
import { PromotionService } from "../promotion.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { DeletePromotionComponent } from "../delete promotion/deletePromotion.component";

@Component({
  selector: "app-promotion",
  templateUrl: "./promotion-list.component.html",
})
export class PromotionComponent implements OnInit {
  promotions: Promotion[] = [];
  temp: Promotion[] = [];
  entries: number = 10;
  showDeleteConfirmation = false;
  promotionIdToDelete: number | null = null;
  selectedPromotion: Promotion | null = null;

  @ViewChild("detailModal") detailModal: ElementRef;

  constructor(
    private promotionService: PromotionService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPromotions();
  }

  getPromotions() {
    this.promotionService.getPromotions().subscribe(
      (data: Promotion[]) => {
        if (data && data.length > 0) {
          this.promotions = data;
          this.temp = [...this.promotions]; // Copy the data to the temporary array for filtering
        } else {
          console.log("No promotions available");
          this.promotions = [];
          this.temp = [];
          this.toastr.info("Không có khuyến mãi nào", "Thông tin");
        }
      },
      (error) => {
        console.error("Error fetching promotions:", error);
        this.toastr.error("Lỗi khi tải danh sách khuyến mãi", "Lỗi");
        this.promotions = [];
        this.temp = [];
      }
    );
  }

  viewDetails(row: Promotion) {
    this.selectedPromotion = row;
    this.showModal();
  }

  showModal() {
    if (this.detailModal) {
      const modal = this.detailModal.nativeElement;
      modal.classList.add("show"); // Ensure modal is shown
      modal.style.display = "block"; // Ensure modal is displayed
    }
  }

  closeModal() {
    if (this.detailModal) {
      const modal = this.detailModal.nativeElement;
      modal.classList.remove("show"); // Hide modal
      modal.style.display = "none"; // Hide modal
    }
  }

  entriesChange(event: any) {
    this.entries = event.target.value;
  }

  filterTable(event: any) {
    const val = event.target.value ? event.target.value.toLowerCase() : "";
    this.temp = this.promotions.filter((d) => {
      const title = d.title ? d.title.toLowerCase() : "";
      const hotelName = d.hotelName ? d.hotelName.toLowerCase() : "";
      return title.includes(val) || hotelName.includes(val) || !val;
    });
  }

  onActivate(event: any) {}

  editPromotion(id: number) {
    this.router.navigate([`/promotions/editPromotion/${id}`]);
  }

  confirmDeletePromotion(id: number) {
    const dialogRef = this.dialog.open(DeletePromotionComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePromotion(id);
      }
    });
  }

  deletePromotion(id: number) {
    this.promotionService.deletePromotion(id).subscribe(
      () => {
        this.toastr.success("Xóa khuyến mãi thành công!");
        this.getPromotions();
      },
      (error) => {
        console.error("Error deleting promotion:", error);
        this.toastr.error("Xóa khuyến mãi thất bại.", "Lỗi");
      }
    );
  }
}
