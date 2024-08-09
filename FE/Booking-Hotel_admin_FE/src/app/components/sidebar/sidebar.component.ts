import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

var misc: any = {
  sidebar_mini_active: true
};

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboards",
    title: "Trang chủ",
    type: "link",
    icontype: "fas fa-home",
  },
  // {
  //   path: "/components",
  //   title: "Components",
  //   type: "sub",
  //   icontype: "ni-ui-04 text-info",
  //   collapse: "components",
  //   isCollapsed: true,
  //   children: [
  //     { path: "buttons", title: "Buttons", type: "link" },
  //     { path: "cards", title: "Cards", type: "link" },
  //     { path: "grid", title: "Grid", type: "link" },
  //     { path: "notifications", title: "Notifications", type: "link" },
  //     { path: "icons", title: "Icons", type: "link" },
  //     { path: "typography", title: "Typography", type: "link" },
  //     {
  //       path: "multilevel",
  //       isCollapsed: true,
  //       title: "Multilevel",
  //       type: "sub",
  //       collapse: "multilevel",
  //       children: [
  //         { title: "Third level menu" },
  //         { title: "Just another link" },
  //         { title: "One last link" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: "/forms",
  //   title: "Forms",
  //   type: "sub",
  //   icontype: "ni-single-copy-04 text-pink",
  //   collapse: "forms",
  //   isCollapsed: true,
  //   children: [
  //     { path: "elements", title: "Elements", type: "link" },
  //     { path: "components", title: "Components", type: "link" },
  //     { path: "validation", title: "Validation", type: "link" },
  //   ],
  // },
  // {
  //   path: "/tables",
  //   title: "Tables",
  //   type: "sub",
  //   icontype: "ni-align-left-2 text-default",
  //   collapse: "tables",
  //   isCollapsed: true,
  //   children: [
  //     { path: "tables", title: "Tables", type: "link" },
  //     { path: "sortable", title: "Sortable", type: "link" },
  //     { path: "ngx-datatable", title: "Ngx Datatable", type: "link" },
  //   ],
  // },
  // {
  //   path: "/maps",
  //   title: "Maps",
  //   type: "sub",
  //   icontype: "ni-map-big text-primary",
  //   collapse: "maps",
  //   isCollapsed: true,
  //   children: [
  //     { path: "google", title: "Google Maps", type: "link" },
  //     { path: "vector", title: "Vector Map", type: "link" },
  //   ],
  // },
  // {
  //   path: "/widgets",
  //   title: "Widgets",
  //   type: "link",
  //   icontype: "ni-archive-2 text-green",
  // },
  // {
  //   path: "/charts",
  //   title: "Charts",
  //   type: "link",
  //   icontype: "ni-chart-pie-35 text-info",
  // },
  // {
  //   path: "/calendar",
  //   title: "Calendar",
  //   type: "link",
  //   icontype: "ni-calendar-grid-58 text-red",
  // },
  {
    path: "/users",
    title: "Tài khoản người dùng",
    type: "sub",
    icontype: "fas fa-users",
    collapse: "users",
    isCollapsed: true,
    children: [
      { path: "user", title: "Danh sách người dùng", type: "link" },
      { path: "addUser", title: "Thêm người dùng", type: "link" },
    ],
  },
  {
    path: "/hotels",
    title: "Khách sạn",
    type: "sub",
    icontype: "fas fa-hotel",
    collapse: "hotels",
    isCollapsed: true,
    children: [
      { path: "hotel", title: "Danh sách khách sạn", type: "link" },
      { path: "addHotel", title: "Thêm khách sạn", type: "link" },
    ],
  },
  {
    path: "/rooms",
    title: "Phòng",
    type: "sub",
    icontype: "fas fa-door-closed",
    collapse: "rooms",
    isCollapsed: true,
    children: [
      { path: "room", title: "Danh sách phòng", type: "link" },
      { path: "addRoom", title: "Thêm phòng", type: "link" },
    ],
  },
  {
    path: "/promotions",
    title: "Khuyến mãi",
    type: "sub",
    icontype: "fas fa-percent",
    collapse: "promotions",
    isCollapsed: true,
    children: [
      { path: "promotion", title: "Danh sách khuyến mãi", type: "link" },
      { path: "addPromotion", title: "Thêm khuyến mãi", type: "link" },
    ],
  },
  {
    path: "/reviews",
    title: "Đánh giá",
    type: "link",
    icontype: "fas fa-ranking-star",
  },
  {
    path: "/comments",
    title: "Bình luận",
    type: "link",
    icontype: "fas fa-comments",
  },
  {
    path: "/bookings",
    title: "Đơn đặt phòng",
    type: "link",
    icontype: "fas fa-money-bills",
  },
  {
    path: "/slidesShow",
    title: "Trình chiếu slide",
    type: "sub",
    icontype: "fas fa-images",
    collapse: "slidesShow",
    isCollapsed: true,
    children: [
      { path: "slideShow", title: "Danh sách slide", type: "link" },
      { path: "addSlideShow", title: "Thêm slide", type: "link" },
    ],
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }
  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }
  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }
  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }
}
