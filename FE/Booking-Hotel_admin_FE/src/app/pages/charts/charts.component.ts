import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import {
  chartOptions,
  chartBarStackedData,
  chartDoughnutData,
  chartPieData,
  chartPointsData,
  chartSalesData,
  chartBarsData,
} from "../../variables/charts";

@Component({
  selector: "app-charts",
  templateUrl: "charts.component.html",
})
export class ChartsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.configureChartOptions();
    this.initializeCharts();
  }

  private configureChartOptions() {
    Chart.defaults.global.defaultFontFamily = "Open Sans";
    Chart.defaults.global.defaultFontSize = 13;
    Chart.defaults.global.defaultColor = "#32325d";
  }

  private initializeCharts() {
    this.initializeBarStackedChart();
    this.initializeDoughnutChart();
    this.initializePieChart();
    this.initializePointsChart();
    this.initializeSalesChart();
    this.initializeBarsChart();
  }

  private initializeBarStackedChart() {
    const chartElement = document.getElementById(
      "myChart"
    ) as HTMLCanvasElement;
    if (chartElement) {
      new Chart(chartElement, {
        type: "bar",
        data: chartBarStackedData.data,
        options: chartBarStackedData.options,
      });
    }
  }

  private initializeDoughnutChart() {
    const chartElement = document.getElementById(
      "chart-doughnut"
    ) as HTMLCanvasElement;
    if (chartElement) {
      new Chart(chartElement, {
        type: "doughnut",
        data: chartDoughnutData.data,
        options: chartDoughnutData.options,
      });
    }
  }

  private initializePieChart() {
    const chartElement = document.getElementById(
      "chart-pie"
    ) as HTMLCanvasElement;
    if (chartElement) {
      new Chart(chartElement, {
        type: "pie",
        data: chartPieData.data,
        options: chartPieData.options,
      });
    }
  }

  private initializePointsChart() {
    const chartElement = document.getElementById(
      "chart-points"
    ) as HTMLCanvasElement;
    if (chartElement) {
      new Chart(chartElement, {
        type: "line",
        data: chartPointsData.data,
        options: chartPointsData.options,
      });
    }
  }

  private initializeSalesChart() {
    const chartElement = document.getElementById(
      "chart-sales2"
    ) as HTMLCanvasElement;
    if (chartElement) {
      new Chart(chartElement, {
        type: "line",
        data: chartSalesData.data,
        options: chartSalesData.options,
      });
    }
  }

  private initializeBarsChart() {
    const chartElement = document.getElementById(
      "chart-bars2"
    ) as HTMLCanvasElement;
    if (chartElement) {
      new Chart(chartElement, {
        type: "bar",
        data: chartBarsData.data,
      });
    }
  }
}
