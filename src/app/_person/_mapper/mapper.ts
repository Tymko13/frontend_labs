import { Person } from '../person';
import {additionalUsers, randomUserMock} from './FE4U-Lab2-mock';
import {filterValidAdditionalUsers, filterValidRandomUsers} from './validator';


const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess",
  "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];

function getCourse(): string {
  return courses[Math.floor(Math.random() * courses.length)];
}

function capitalize(word: string | null | undefined): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getAllPeople(): Person[] {
  return mapRandomUsersToPeople(randomUserMock).concat(mapAdditionalUsersToPeople(additionalUsers));
}

export function mapRandomUsersToPeople(randomUsers: typeof randomUserMock): Person[] {
  return filterValidRandomUsers(randomUsers).map(user=> ({
    gender: capitalize(user.gender),
    title: capitalize(user.name.title),
    fullName: capitalize(`${user.name.first}`) + ' ' + capitalize(`${user.name.last}`),
    city: capitalize(user.location.city),
    state: capitalize(user.location.state),
    country: capitalize(user.location.country),
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
  return filterValidAdditionalUsers(users).map(user => ({
    gender: capitalize(user.gender),
    title: capitalize(user.title),
    fullName: capitalize(user.full_name),
    city: capitalize(user.city),
    state: capitalize(user.state),
    country: capitalize(user.country),
    postcode: Number(user.postcode),
    coordinates: {
      latitude: user.coordinates ? Number(user.coordinates.latitude) : 0,
      longitude: user.coordinates ? Number(user.coordinates.longitude) : 0,
    },
    timezone: user.timezone,
    email: user.email!,
    b_date: user.b_day!,
    age: Math.floor((Date.now() - new Date(user.b_day!).getTime()) / (1000 * 60 * 60 * 24 * 365)),
    phone: user.phone!,
    pictureLarge: user.picture_large,
    pictureThumbnail: user.picture_thumbnail,

    id: user.id,
    favourite: user.favorite ?? false,
    course: user.course ?? getCourse(),
    bg_color: user.bg_color ?? '#ffffff',
    note: capitalize(user.note) ?? '',
  }));
}
