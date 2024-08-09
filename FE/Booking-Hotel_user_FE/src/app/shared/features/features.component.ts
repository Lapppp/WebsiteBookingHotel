import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent  implements OnInit{
  hotels = [
    {
      id: 1,
      name: "Marazul Vũng Tàu",
      address: "79 Đường Trần Phú, Vũng Tàu",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      ],

    },{
      id: 2,
      name: "Marazul Đà Lạt",
      address: "79 Đường Lỏ, Đà Lạt",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg'],
    },{
      id: 3,
      name: "Marazul Vũng Tàu",
      address: "79 Đường Trần Phú, Vũng Tàu",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      ],

    },{
      id: 4,
      name: "Marazul Đà Lạt",
      address: "79 Đường Lỏ, Đà Lạt",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg'],
    },{
      id: 5,
      name: "Marazul Vũng Tàu",
      address: "79 Đường Trần Phú, Vũng Tàu",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      ],

    },{
      id: 6,
      name: "Marazul Đà Lạt",
      address: "79 Đường Lỏ, Đà Lạt",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg'],
    },{
      id: 7,
      name: "Marazul Vũng Tàu",
      address: "79 Đường Trần Phú, Vũng Tàu",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      ],

    },{
      id: 8,
      name: "Marazul Đà Lạt",
      address: "79 Đường Lỏ, Đà Lạt",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg'],
    },{
      id: 9,
      name: "Marazul Vũng Tàu",
      address: "79 Đường Trần Phú, Vũng Tàu",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      ],

    },{
      id: 10,
      name: "Marazul Đà Lạt",
      address: "79 Đường Lỏ, Đà Lạt",
      price: [150, 200, 250],
      rating: 4.5,
      description:[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"],
      amenities: ["Phòng ngủ",
        "Bữa sáng",
        "Bãi đậu xe",
        "Nâng cấp phòng"],
      images: [ 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg'],
    },

  ];
  limitedHotels: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.limitedHotels = this.hotels.slice(0, 9);
  }
}
