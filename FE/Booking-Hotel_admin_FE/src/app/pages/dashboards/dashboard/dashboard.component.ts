import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { DashboardService } from "../dashboard.service";
import { Chart } from "chart.js";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalBookings: number = 0;
  bookingsByStatus: { status: string; count: number }[] = [];
  totalInvoiced: { [key: string]: number } = {};
  totalReviews: number = 0;
  averageRating: number = 0;
  activeUsers: number = 0;
  ratingsWithTitles: { title: string; rating: number }[] = [];

  // ViewChild cho các phần tử canvas
  @ViewChild("chartOrders") chartOrdersCanvas!: ElementRef;
  @ViewChild("chartRevenue") chartRevenueCanvas!: ElementRef;
  @ViewChild("chartReviews") chartReviewsCanvas!: ElementRef;

  // Biến biểu đồ
  chartOrders: Chart | undefined;
  chartRevenue: Chart | undefined;
  chartReviews: Chart | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  ngAfterViewInit(): void {
    // Lấy dữ liệu và vẽ biểu đồ sau khi view được khởi tạo
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.dashboardService.getTotalBookings().subscribe((data) => {
      this.totalBookings = data;
      this.drawCharts();
    });

    this.dashboardService.getBookingsByStatus("Đã xác nhận").subscribe((data) => {
      this.bookingsByStatus.push({ status: "Xác nhận", count: data });
      this.drawCharts();
    });

    this.dashboardService.getBookingsByStatus("Đã hủy").subscribe((data) => {
      this.bookingsByStatus.push({ status: "Đã hủy", count: data });
      this.drawCharts();
    });

    this.dashboardService.getTotalInvoiced().subscribe((data) => {
      this.totalInvoiced = data;
      this.drawCharts();
    });

    this.dashboardService.getTotalReviews().subscribe((data) => {
      this.totalReviews = data;
      this.drawCharts();
    });

    this.dashboardService.getAverageRating().subscribe((data) => {
      this.averageRating = data.averageRating;
      this.ratingsWithTitles = data.ratingsWithTitles;
      this.drawCharts();
    });

    this.dashboardService.getActiveUsers().subscribe((data) => {
      this.activeUsers = data;
      this.drawCharts();
    });
  }

  drawCharts(): void {
    if (
      this.totalBookings !== 0 &&
      this.averageRating !== 0 &&
      this.activeUsers !== 0 &&
      this.bookingsByStatus.length > 0 &&
      this.ratingsWithTitles.length > 0
    ) {
      // Các tùy chọn chung cho tất cả biểu đồ
      const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                fontColor: "#333",
                fontSize: 12,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                beginAtZero: true,
                fontColor: "#333",
                fontSize: 12,
              },
            },
          ],
        },
      };

      // Vẽ biểu đồ Đơn đặt hàng
      this.chartOrders = new Chart(this.chartOrdersCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: ["Xác nhận", "Đã hủy"],
          datasets: [
            {
              data: this.bookingsByStatus.map((entry) => entry.count),
              backgroundColor: ["#36a2eb", "#ff6384"],
              borderColor: ["#36a2eb", "#ff6384"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          ...commonOptions,
          title: {
            display: true,
            text: "Đơn đặt hàng theo trạng thái",
            fontSize: 18,
            fontColor: "#333",
          },
        },
      });

      // Vẽ biểu đồ Doanh thu
      const months = Object.keys(this.totalInvoiced);
      const revenueValues = Object.values(this.totalInvoiced);
      this.chartRevenue = new Chart(this.chartRevenueCanvas.nativeElement, {
        type: "line",
        data: {
          labels: months,
          datasets: [
            { 
              data: revenueValues,
              borderColor: "#3e95cd",
              backgroundColor: "rgba(62, 149, 205, 0.4)",
              fill: true,
              pointBackgroundColor: "#3e95cd",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#3e95cd",
            },
          ],
        },
        options: {
          ...commonOptions,
          title: {
            display: true,
            text: "Doanh thu hàng tháng",
            fontSize: 18,
            fontColor: "#333",
          },
        },
      });

      // Vẽ biểu đồ Đánh giá
      const labels = this.ratingsWithTitles.map((item) => item.title);
      const data = this.ratingsWithTitles.map((item) => item.rating);
      this.chartReviews = new Chart(this.chartReviewsCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#4caf50",
                "#f44336",
                "#2196f3",
                "#ff9800",
                "#9c27b0",
              ],
              borderColor: [
                "#4caf50",
                "#f44336",
                "#2196f3",
                "#ff9800",
                "#9c27b0",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          ...commonOptions,
          title: {
            display: true,
            text: "Đánh giá người dùng",
            fontSize: 18,
            fontColor: "#333",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 5,
                  stepSize: 1,
                  fontColor: "#333",
                  fontSize: 12,
                },
              },
            ],
          },
        },
      });
    }
  }

  get totalInvoicedValue(): number {
    return Object.values(this.totalInvoiced)[0] || 0;
  }
}
