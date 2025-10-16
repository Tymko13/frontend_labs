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

  numPerPage = 10;

  sort = signal<string>("");
  readonly sortedPeople = computed(() => {
    return this.peopleService.paginatedSortedPeopleBy(this.sort(), this.numPerPage);
  });

  paginateTo(page: number) {
    this.peopleService.pageNum.set(page);
  }

  protected readonly Math = Math;
}
