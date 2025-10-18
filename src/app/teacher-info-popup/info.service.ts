import {inject, Injectable, signal} from '@angular/core';
import {Person} from '../_person/person';
import {PeopleService} from '../_person/people.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  peopleService = inject(PeopleService);
  visibleInfo = signal<boolean>(false);
  currentPerson  = signal<Person | null>(null);

  toggleInfoTeacher(personId: string | null) {
    if (personId === null) {
      this.visibleInfo.set(false);
      this.currentPerson.set(null);
      document.body.classList.remove('no-scroll');
    }
    const person = this.peopleService.getPersonById(personId);
    if (person) {
      this.currentPerson.set(person);
      if (this.visibleInfo()) {
        this.visibleInfo.set(false);
        document.body.classList.remove('no-scroll');
      } else {
        this.visibleInfo.set(true);
        document.body.classList.add('no-scroll');
      }
    }

  }
}
