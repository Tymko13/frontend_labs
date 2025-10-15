export interface Person {
  id: string;
  title: string;
  fullName: string;
  gender: string;
  age: number
  b_date?: string;
  course: string;

  email: string;
  phone: string;

  city?: string;
  state?: string;
  country: string;
  postcode?: number;
  coordinates?: { latitude: number, longitude: number };
  timezone?: { offset: string, description: string };

  bg_color: string;
  pictureLarge?: string;
  pictureThumbnail?: string;
  favourite: boolean;
  note?: string;
}
