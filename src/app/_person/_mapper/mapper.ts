import { Person } from '../person';
import {randomUserMock} from './FE4U-Lab2-mock';
import {filterValidRandomUsers} from './validator';
import _ from 'lodash';


export const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess",
  "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];

function getCourse(): string {
  return courses[Math.floor(Math.random() * courses.length)];
}

function capitalize(word: string | null | undefined): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getAllPeople(): Person[] {
  const ids = new Set<string>();
  return mapRandomUsersToPeople(randomUserMock).filter(person => {
    if(ids.has(person.id)) {
      return false;
    }
    ids.add(person.id);
    return true;
  });
}

export function mapRandomUsersToPeople(randomUsers: typeof randomUserMock): Person[] {
  return _.map(filterValidRandomUsers(randomUsers), user => ({
    gender: _.capitalize(_.get(user, 'gender', '')),
    title: _.capitalize(_.get(user, 'name.title', '')),
    fullName: `${_.capitalize(_.get(user, 'name.first', ''))} ${_.capitalize(_.get(user, 'name.last', ''))}`,
    city: _.capitalize(_.get(user, 'location.city', '')),
    state: _.capitalize(_.get(user, 'location.state', '')),
    country: _.capitalize(_.get(user, 'location.country', '')),
    postcode: Number(_.get(user, 'location.postcode', 0)),
    coordinates: {
      latitude: Number(_.get(user, 'location.coordinates.latitude', 0)),
      longitude: Number(_.get(user, 'location.coordinates.longitude', 0)),
    },
    timezone: {
      offset: _.get(user, 'location.timezone.offset', ''),
      description: _.get(user, 'location.timezone.description', ''),
    },
    email: _.get(user, 'email', ''),
    b_date: _.get(user, 'dob.date', ''),
    age: _.get(user, 'dob.age', 0),
    phone: _.get(user, 'phone', ''),
    pictureLarge: _.get(user, 'picture.large', ''),
    pictureThumbnail: _.get(user, 'picture.thumbnail', ''),

    id: _.get(user, 'login.uuid', ''),
    favourite: false,
    course: getCourse(),
    bg_color: '#ffffff',
    note: '',
  }));
}
