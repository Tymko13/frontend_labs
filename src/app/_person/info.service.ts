import {Injectable, signal} from '@angular/core';
import {Person} from './person';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  visibleInfo = signal<boolean>(false);
  currentPerson  = signal<Person | null>(null);

  toggleInfoTeacher(person: Person | null) {
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
