import {computed, inject, Injectable, signal} from '@angular/core';
import {Person} from './person';
import {mapRandomUsersToPeople} from './_mapper/mapper';
import {PersonDTO} from './personDTO';
import {HttpClient} from '@angular/common/http';
import {randomUserMock} from './_mapper/FE4U-Lab2-mock';
import _ from 'lodash';

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
  });
  favPeople = computed(() => {
    return this.people().filter(p => p.favourite);
  });

  constructor() {
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
    return _.filter(this.people(), person => {
      return _.every([
        !filters.country || person.country === filters.country,
        !filters.age || person.age === filters.age,
        !filters.gender || person.gender === filters.gender,
        !filters.favourite || person.favourite,
        !filters.requitePhoto || Boolean(person.pictureLarge)
      ]);
    });
  }

  pageNum = signal<number>(1);
  paginatedSortedPeopleBy(sort: string, pageSize: number): Person[] {
    const people = this.filteredPeople();

    const sortFieldMap: Record<string, keyof Person> = {
      course: 'course',
      age: 'age',
      gender: 'gender',
      country: 'country',
      fullName: 'fullName',
    };
    const field = sortFieldMap[sort] ?? 'fullName';
    const sorted = _.orderBy(people, [field], ['asc']);

    const start = (this.pageNum() - 1) * pageSize;
    return _.slice(sorted, start, start + pageSize);
  }

  searchPeople(query: string) {
    const lowerQuery = query.toLowerCase();

    return _.filter(this.people(), person => {
      return _.some([
        _.includes(person.fullName.toLowerCase(), lowerQuery),
        _.includes(_.toLower(person.note ?? ''), lowerQuery),
        _.includes(person.age.toString(), lowerQuery)
      ]);
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

  getPersonById(personId: string | null) {
    return this.people().find(p => p.id === personId);
  }

  getPeopleBy(field: string): [string[], number[]] {
    const keys = _.uniq(this.filteredPeople().map(person => _.get(person, field)));
    return [keys, keys.map(key => {
      return this.filteredPeople().filter(person => _.get(person, field) == key).length;
    })];
  }
}
