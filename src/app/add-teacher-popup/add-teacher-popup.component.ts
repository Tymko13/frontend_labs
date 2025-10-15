import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {phoneValidator} from '../_person/_mapper/validator';
import {PeopleService} from '../_person/people.service';

@Component({
  selector: 'app-add-teacher-popup',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-teacher-popup.component.html',
  styleUrl: './add-teacher-popup.component.scss'
})
export class AddTeacherPopupComponent {
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();

  private readonly peopleService = inject(PeopleService);

  close() {
    this.closed.emit();
    this.form.reset();
    document.body.classList.remove('no-scroll');
  }

  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    course: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, phoneValidator()]],
    b_date: ['', Validators.required],
    gender: ['', Validators.required],
    bg_color: ['#000000', Validators.required],
    notes: ['']
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.peopleService.addPerson(this.form.value);
      this.closed.emit();
    }
  }
}
