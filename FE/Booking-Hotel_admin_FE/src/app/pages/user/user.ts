export interface Image {
  id: number;
  publicId: string;
  url: string;
  UserId: number;
  // other properties if applicable
}
export interface User {
  id: string;
  userName: string;
  email: string;
  phone?: string;
  name?: string;
  images: Image[];
  password: string;
}
