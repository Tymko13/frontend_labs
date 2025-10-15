import { Injectable } from '@angular/core';
import {Person} from './person';
import {getAllPeople} from './_mapper/mapper';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private people: Person[];

  constructor() {
    this.people = getAllPeople();
  }

  getPeople(): Person[] {
    return this.people;
  }

  filterPeople(filters: {
    country?: string | null;
    age?: number | null;
    gender?: string | null;
    favourite?: boolean | null;
    requitePhoto?: boolean | null;
  }): Person[] {
    return this.people.filter((person) => {
      if (filters.country && person.country !== filters.country) return false;
      if (filters.age && person.age !== filters.age) return false;
      if (filters.gender && person.gender !== filters.gender) return false;
      if (filters.favourite && !person.favourite) return false;
      if (filters.requitePhoto && !person.pictureLarge) return false;
      return true;
    });
  }

  sortedPeopleBy(sort: string): Person[] {
      switch (sort) {
        case 'course':
          return this.people.sort((a, b) => a.course.localeCompare(b.course));

        case 'age':
          return this.people.sort((a, b) => a.age - b.age);

        case 'gender':
          return this.people.sort((a, b) => a.gender.localeCompare(b.gender));

        case 'country':
          return this.people.sort((a, b) => a.country.localeCompare(b.country));

        case 'fullName':
        default:
          return this.people.sort((a, b) => a.fullName.localeCompare(b.fullName));
      }
  }

  searchPeople(query: string) {
    const lowerQuery = query.toLowerCase();

    return this.people.filter(person => {
      const fullNameMatch = person.fullName.toLowerCase().includes(lowerQuery);
      const noteMatch = person.note?.toLowerCase().includes(lowerQuery) ?? false;
      const ageMatch = person.age.toString().includes(lowerQuery);
      return fullNameMatch || noteMatch || ageMatch;
    });
  }

  getLocations(): string[] {
    return Array.from(new Set(this.getPeople().map(person => person.country))).sort();
  }

  getAges(): number[] {
    return Array.from(new Set(this.getPeople().map(person => person.age))).sort();
  }
}
