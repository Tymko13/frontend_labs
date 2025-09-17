import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-add-teacher-popup',
  imports: [],
  templateUrl: './add-teacher-popup.component.html',
  styleUrl: './add-teacher-popup.component.scss'
})
export class AddTeacherPopupComponent {
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
