import { Person } from './person';
import {additionalUsers, randomUserMock as RandomUserMockType} from './FE4U-Lab2-mock';


const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess",
  "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];

export function getCourse(): string {
  return courses[Math.floor(Math.random() * courses.length)];
}

export function mapRandomUsersToPeople(randomUsers: typeof RandomUserMockType): Person[] {
  return randomUsers.map((user, index) => ({
    gender: user.gender,
    title: user.name.title,
    fullName: `${user.name.first} ${user.name.last}`,
    city: user.location.city,
    state: user.location.state,
    country: user.location.country,
    postcode: Number(user.location.postcode),
    coordinates: {
      latitude: Number(user.location.coordinates.latitude),
      longitude: Number(user.location.coordinates.longitude),
    },
    timezone: {
      offset: user.location.timezone.offset,
      description: user.location.timezone.description,
    },
    email: user.email,
    b_date: user.dob.date,
    age: user.dob.age,
    phone: user.phone,
    pictureLarge: user.picture.large,
    pictureThumbnail: user.picture.thumbnail,

    id: user.login.uuid,
    favourite: false,
    course: getCourse(),
    bg_color: '#ffffff',
    note: '',
  }));
}

export function mapAdditionalUsersToPeople(users: typeof additionalUsers): Person[] {
  return users.map(user => ({
    gender: user.gender,
    title: user.title,
    fullName: user.full_name,
    city: user.city ?? '',
    state: user.state ?? '',
    country: user.country ?? '',
    postcode: Number(user.postcode ?? 0),
    coordinates: {
      latitude: user.coordinates ? Number(user.coordinates.latitude) : 0,
      longitude: user.coordinates ? Number(user.coordinates.longitude) : 0,
    },
    timezone: user.timezone ?? { offset: '', description: '' },
    email: user.email ?? '',
    b_date: user.b_day ?? '',
    age: user.b_day ? Math.floor((Date.now() - new Date(user.b_day).getTime()) / (1000 * 60 * 60 * 24 * 365)) : 0,
    phone: user.phone ?? '',
    pictureLarge: user.picture_large ?? '',
    pictureThumbnail: user.picture_thumbnail ?? '',

    id: user.id,
    favourite: user.favorite ?? false,
    course: user.course ?? getCourse(),
    bg_color: user.bg_color ?? '#ffffff',
    note: user.note ?? '',
  }));
}
