import {Component, inject} from '@angular/core';
import {PeopleService} from '../_services/people.service';
import {AsyncPipe} from '@angular/common';
import {ProfileComponent} from '../profile/profile.component';
import {map} from 'rxjs';

@Component({
  selector: 'app-favs',
  imports: [
    AsyncPipe,
    ProfileComponent
  ],
  templateUrl: './favs.component.html',
  styleUrl: './favs.component.scss'
})
export class FavsComponent {
  readonly peopleService = inject(PeopleService)
  readonly favPeople = this.peopleService.getPeople()
    .pipe(
      map(people =>
        people.filter(person => person.fav)));
}
