export interface Person {
  id: string;
  fullName: string;
  gender: string;
  age: number
  b_date: string;
  course: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  bg_color: string;
  favourite: boolean;

  title?: string;
  state?: string;
  postcode?: number;
  coordinates?: { latitude: number, longitude: number };
  timezone?: { offset: string, description: string };
  pictureLarge?: string;
  pictureThumbnail?: string;
  note?: string;
}

