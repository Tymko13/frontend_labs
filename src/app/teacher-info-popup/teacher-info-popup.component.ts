import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Person} from '../_models/person';

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

  close() {
    this.closed.emit();
    document.body.classList.remove('no-scroll');
  }
}
