import {Component, effect, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {PeopleService} from '../_person/people.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  readonly peopleService = inject(PeopleService);
  readonly ages = this.peopleService.getAges();

  selectedAge = signal<number | null>(null);
  selectedLocation = signal<string | null>(null);
  selectedSex = signal<string | null>(null);
  requirePhoto = signal<boolean>(false);
  onlyFavourite = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.filter.emit({
        country: this.selectedLocation(),
        age: this.selectedAge(),
        gender: this.selectedSex(),
        favourite: this.onlyFavourite(),
        requitePhoto: this.requirePhoto()
      })
    })
  }

  @Output() filter = new EventEmitter<{}>();
  @Input() disabled: boolean = false;
}
