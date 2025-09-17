import {Component, inject} from '@angular/core';
import {PeopleService} from '../_services/people.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [
    AsyncPipe
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  readonly peopleService = inject(PeopleService);
  readonly ages = [
    "18-31",
    "32-51",
    "52+"
  ]
}
