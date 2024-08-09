import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Promotion } from "../promotion";
import { PromotionService } from "../promotion.service";
import { ToastrService } from "ngx-toastr";
import { Hotel } from "../../hotel/hotel";
import { HotelService } from "../../hotel/hotel.service";

@Component({
  selector: "app-edit-promotion",
  templateUrl: "./edit-promotion.component.html",
})
export class EditPromotionComponent implements OnInit {
  editPromotion: FormGroup;
  promotionId: number;
  promotion: Promotion;
  hotels: Hotel[] = [];
  selectedHotelId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private promotionService: PromotionService,
    private hotelService: HotelService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      this.promotionId = +params.get("id");
      if (this.promotionId) {
        this.getPromotion();
      }
    });
    this.loadHotels();
  }

  initForm() {
    this.editPromotion = this.fb.group({
      title: ["", Validators.required],
      discount: ["", Validators.required],
      couponCode: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      description: [""],
      status: ["", Validators.required],
      hotelID: ["", Validators.required],
    });
  }

  getPromotion() {
    this.promotionService.getPromotionById(this.promotionId).subscribe(
      (Promotion: Promotion) => {
        if (Promotion) {
          this.promotion = Promotion;
          this.patchPromotionForm(Promotion);
        } else {
          console.error("No Promotion found with ID:", this.promotionId);
        }
      },
      (error) => {
        console.log("Error fetching Promotion:", error);
      }
    );
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
      },
      (error) => {
        console.log("Error fetching hotels:", error);
      }
    );
  }

  patchPromotionForm(promotion: Promotion) {
    this.editPromotion.patchValue({
      title: promotion.title,
      couponCode: promotion.couponCode,
      discount: promotion.discount,
      description: promotion.description,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      status: promotion.status,
      hotelID: promotion.hotelID,
    });
  }

  checkDates(): boolean {
    const startDate = new Date(this.editPromotion.value.startDate);
    const endDate = new Date(this.editPromotion.value.endDate);

    if (startDate >= endDate) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.editPromotion.valid) {
      const startDateChanged =
        this.editPromotion.value.startDate !== this.promotion.startDate;
      const endDateChanged =
        this.editPromotion.value.endDate !== this.promotion.endDate;
      if (startDateChanged || endDateChanged) {
        if (!this.checkDates()) {
          this.toastr.error("Ngày bắt đầu không được sau ngày kết thúc", "Lỗi");
          return;
        }
      }
      const updatedPromotion: Promotion = {
        ...this.promotion,
        ...this.editPromotion.value,
      };
      if (JSON.stringify(updatedPromotion) === JSON.stringify(this.promotion)) {
        this.toastr.info("Không có thay đổi nào được thực hiện", "Thông tin");
        return;
      }
      this.promotionService.updatePromotion(updatedPromotion).subscribe(
        () => {
          this.toastr.success("Cập nhật Khuyến mãi thành công!", "Thành công");
          this.router.navigate(["/promotions/promotion"]);
          // Gọi lại getPromotions để cập nhật danh sách phòng
          this.promotionService.getPromotions().subscribe(
            (data: Promotion[]) => {
              this.promotionService.promotions = data;
            },
            (error) => {
              console.error("Error fetching updated Promotions:", error);
              this.toastr.error("Lỗi khi tải lại danh sách Khuyến mãi", "Lỗi");
            }
          );
        },
        (error) => {
          console.log("Error updating Promotion:", error);
          this.toastr.error("Cập nhật Khuyến mãi thất bại", "Lỗi");
        }
      );
    } else {
      this.toastr.error("Vui lòng điền đầy đủ thông tin vào biểu mẫu", "Lỗi");
    }
  }

  onSelectHotel(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedHotelId = +selectElement.value;
  }

  onCancel() {
    this.router.navigate(["/promotions/promotion"]);
  }
}
