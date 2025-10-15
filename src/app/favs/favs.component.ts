import {Component, inject} from '@angular/core';
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
  readonly peopleService = inject(PeopleService)
  readonly favPeople = this.peopleService.filterPeople({favourite: true});
}
