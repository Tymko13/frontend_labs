import { Injectable } from '@angular/core';
import {Person} from './person';
import {mapRandomUsersToPeople} from './mapper';
import {randomUserMock} from './FE4U-Lab2-mock';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private people: Person[];

  constructor() {
    this.people = mapRandomUsersToPeople(randomUserMock);
  }

  getPeople(): Person[] {
    return this.people;
  }

  filterPeople(filters: {
    country?: string;
    age?: number;
    gender?: string;
    favourite?: boolean;
  }): Person[] {
    return this.people.filter((person) => {
      if (filters.country && person.country !== filters.country) return false;
      if (filters.age && person.age !== filters.age) return false;
      if (filters.gender && person.gender !== filters.gender) return false;
      return !(filters.favourite !== undefined && person.favourite !== filters.favourite);
    });
  }

  getLocations(): Set<string> {
    return new Set(this.getPeople().map(person => person.country));
  }
}
