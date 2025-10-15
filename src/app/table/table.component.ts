import {Component, inject} from '@angular/core';
import {PeopleService} from '../_person/people.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [

    ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  readonly peopleService = inject(PeopleService)
  readonly people = this.peopleService.getPeople();
}
