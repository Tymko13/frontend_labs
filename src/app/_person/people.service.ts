import {computed, inject, Injectable, signal} from '@angular/core';
import {Person} from './person';
import {getAllPeople, mapRandomUsersToPeople} from './_mapper/mapper';
import {PersonDTO} from './personDTO';
import {HttpClient} from '@angular/common/http';
import {randomUserMock} from './_mapper/FE4U-Lab2-mock';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private readonly http = inject(HttpClient);

  private readonly people = signal<Person[]>([]);

  query = signal<string>("");
  filters = signal<any>(null);
  filteredPeople = computed(() => {
    let people;
    if (this.query()) {
      people = this.searchPeople(this.query());
    } else {
      people = this.filterPeople(this.filters());
    }
    return people;
  })


  constructor() {
    // this.people.set(getAllPeople());
    this.fetchPeople();
  }

  size() {
    return this.people().length;
  }

  fetchPeople() {
    this.http.get<any>('https://randomuser.me/api/?results=50')
      .subscribe(res => {
        this.people.set(mapRandomUsersToPeople(res.results as typeof randomUserMock));
      });
  }

  filterPeople(filters: {
    country?: string | null;
    age?: number | null;
    gender?: string | null;
    favourite?: boolean | null;
    requitePhoto?: boolean | null;
  }): Person[] {
    return this.people().filter((person) => {
      if (filters.country && person.country !== filters.country) return false;
      if (filters.age && person.age !== filters.age) return false;
      if (filters.gender && person.gender !== filters.gender) return false;
      if (filters.favourite && !person.favourite) return false;
      if (filters.requitePhoto && !person.pictureLarge) return false;
      return true;
    });
  }

  pageNum = signal<number>(1);
  paginatedSortedPeopleBy(sort: string, pageSize: number): Person[] {
    let people = this.filteredPeople();
    switch (sort) {
      case 'course':
        people = people.toSorted((a, b) => a.course.localeCompare(b.course));
        break;
      case 'age':
        people = people.toSorted((a, b) => a.age - b.age);
        break;
      case 'gender':
        people = people.toSorted((a, b) => a.gender.localeCompare(b.gender));
        break;
      case 'country':
        people = people.toSorted((a, b) => a.country.localeCompare(b.country));
        break;
      case 'fullName':
      default:
        people = people.toSorted((a, b) => a.fullName.localeCompare(b.fullName));
    }
    const start = (this.pageNum() - 1) * pageSize;
    const end = start + pageSize;
    return people.slice(start, end);
  }

  searchPeople(query: string) {
    const lowerQuery = query.toLowerCase();

    return this.people().filter(person => {
      const fullNameMatch = person.fullName.toLowerCase().includes(lowerQuery);
      const noteMatch = person.note?.toLowerCase().includes(lowerQuery) ?? false;
      const ageMatch = person.age.toString().includes(lowerQuery);
      return fullNameMatch || noteMatch || ageMatch;
    });
  }

  getLocations(): string[] {
    return Array.from(new Set(this.people().map(person => person.country))).sort();
  }

  getAges(): number[] {
    return Array.from(new Set(this.people().map(person => person.age))).sort();
  }

  getCourses(): string[] {
    return Array.from(new Set(this.people().map(person => person.course))).sort();
  }

  personById(id: string) {
    return this.people().find(p => p.id === id) ?? null;
  }

  getPercentOfPeopleOlderThan(age: number) {
    let num = 0;
    for (let person of this.people()) {
      if (person.age > age) num++;
    }
    return Math.floor((num / this.size() * 100));
  }

  updatePerson(updated: Partial<Person>): Person | null {
    this.people.update(list =>
      list.map(p => p.id === updated.id ? {...p, ...updated} : p)
    );
    return this.personById(updated?.id || "");
  }

  addPerson(person: Partial<PersonDTO>) {
    const newPerson: Person = {
      id: Math.random().toString(36).substring(2, 10),
      fullName: person.name!,
      gender: person.gender!,
      age: Math.floor((Date.now() - new Date(person.b_date!).getTime()) / (1000 * 60 * 60 * 24 * 365)),
      b_date: person.b_date!,
      course: person.course!,
      email: person.email!,
      phone: person.phone!,
      city: person.city!,
      country: person.country!,
      bg_color: person.bg_color!,
      favourite: false,
      note: person.notes!
    }
    this.people.update(list => [...list, newPerson]);
  }
}
