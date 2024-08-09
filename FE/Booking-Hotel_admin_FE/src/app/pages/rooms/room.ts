export interface Room {
  id?: number;
  roomNumber: string;
  description: string;
  price: number;
  capacity: number;
  floor: number;
  size: number;
  view: string;
  status: string;
  hotelID: number;
  hotelName?: string;
  amenities: Amenity[];
  roomTypes: RoomType[];
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
  category: string;
  description: string;
}

export interface RoomType {
  id: number;
  name: string;
}
