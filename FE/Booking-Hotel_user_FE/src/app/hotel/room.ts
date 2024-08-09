import {Hotel, Image} from "../hotel/hotel";



export interface Room {
  id: number;
  roomNumber: number;
  description: string;
  price: number;
  capacity: number;
  floor: number;
  size: number;
  view: string;
  status: string;
  hotelID: number;

  amenities: Amenity[];
  roomTypes: RoomType[];
  images: Image[];
  hotel: Hotel;
}

export interface Amenity {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface RoomType {
  id: number;
  name: string;
  description: string;
}


export interface Review {
  id: number;
  title: string;
  rating: number;
  status: string;
  hotelID: number;
  hotelName?: string;
  userID: string;
  userName?: string;
}
