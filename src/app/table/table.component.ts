import {Component, computed, inject, signal} from '@angular/core';
import {PeopleService} from '../_person/people.service';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  readonly peopleService = inject(PeopleService);

  sort = signal<string>("");
  readonly sortedPeople = computed(() => {
    return this.peopleService.sortedPeopleBy(this.sort());
  })
}
