import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { PromotionService } from "../promotion.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Hotel } from "../../hotel/hotel";
import { HotelService } from "../../hotel/hotel.service";

@Component({
  selector: "app-promotion",
  templateUrl: "./add-promotion.component.html",
})
export class AddPromotionComponent implements OnInit {
  addPromotion: FormGroup;
  hotels: Hotel[] = [];
  selectedHotelId: number;

  constructor(
    private fb: FormBuilder,
    private promotionService: PromotionService,
    private hotelService: HotelService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForms();
    this.loadHotels();
  }

  initForms() {
    this.addPromotion = this.fb.group({
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

  loadHotels() {
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
      },
      (error) => {
        console.log("Error loading hotels:", error);
      }
    );
  }

  checkDates(): boolean {
    const startDate = new Date(this.addPromotion.value.startDate);
    const endDate = new Date(this.addPromotion.value.endDate);

    if (startDate >= endDate) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.addPromotion.valid) {
      if (!this.checkDates()) {
        this.toastr.error("Ngày bắt đầu không được sau ngày kết thúc", "Lỗi");
      } else {
        const promotionPayload = {
          title: this.addPromotion.value.title,
          discount: this.addPromotion.value.discount,
          couponCode: this.addPromotion.value.couponCode,
          description: this.addPromotion.value.description,
          startDate: new Date(this.addPromotion.value.startDate).toISOString(),
          endDate: new Date(this.addPromotion.value.endDate).toISOString(),
          status: this.addPromotion.value.status,
          hotelID: this.addPromotion.value.hotelID,
        };

        this.promotionService.addPromotion(promotionPayload).subscribe(
          () => {
            this.toastr.success(
              "Khuyến mãi được thêm thành công!",
              "Thành công"
            );
            this.router.navigate(["/promotions/promotion"]);
          },
          (error) => {
            console.error("Error adding promotion", error);
            this.toastr.error("Lỗi khi thêm khuyến mãi", "Lỗi");
          }
        );
      }
    } else {
      this.toastr.error("Vui lòng điền đầy đủ thông tin vào biểu mẫu", "Lỗi");
    }
  }

  onSelectHotel(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedHotelId = +selectElement.value;
  }

  resetForm() {
    this.addPromotion.reset();
    this.selectedHotelId = null;
  }
}
