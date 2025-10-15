import {Component, computed, inject, signal} from '@angular/core';
import {PeopleService} from '../_person/people.service';
import {ProfileComponent} from '../profile/profile.component';

@Component({
  selector: 'app-favs',
  imports: [
    ProfileComponent
  ],
  templateUrl: './favs.component.html',
  styleUrl: './favs.component.scss'
})
export class FavsComponent {
  readonly peopleService = inject(PeopleService);

  constructor() {
    window.setInterval(() => {
      this.next();
    }, 3000);
  }

  readonly favPeople = computed(() => {
    return this.peopleService.filterPeople({favourite: true});
  });

  startIndex = computed(() => {
    if(this.favPeople().length <=5) {
      return 0;
    } else {
      return this.offset();
    }
  });

  next() {
    if(this.favPeople().length <=5) this.offset.set(0);
    else {
      this.offset.update(val => ++val);
      if (this.offset() == this.favPeople().length - 4) {
        this.offset.set(0);
      }
    }
  }

  prev() {
    this.offset.update(val => --val);
    if (this.offset() == -1) {
      this.offset.set(this.favPeople().length - 5);
    }
  }

  offset = signal<number>(0);
}
