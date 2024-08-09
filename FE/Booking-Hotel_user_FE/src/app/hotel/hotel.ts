export interface Image {
  id: number;
  publicId: string;
  url: string;
  hotelId: number;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  description: string;
  totalRooms: number;
  policy: string;
  contact: string;
  checkIn: Date;
  checkOut: Date;
  status: string;
  images: Image[];
  cancel:number;
}
