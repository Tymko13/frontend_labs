import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Person} from '../_person/person';
import {PeopleService} from '../_person/people.service';

@Component({
  selector: 'app-teacher-info-popup',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './teacher-info-popup.component.html',
  styleUrl: './teacher-info-popup.component.scss'
})
export class TeacherInfoPopupComponent {
  @Input() visible = false;
  @Input() person: Person | null = null;
  @Output() closed = new EventEmitter<void>();

  private readonly peopleService = inject(PeopleService);

  close() {
    this.closed.emit();
  }

  toggleFav(person: Person | null) {
    if(person) {
      this.person = this.peopleService.updatePerson({id: person.id, favourite: !person.favourite});
    }
  }
}
