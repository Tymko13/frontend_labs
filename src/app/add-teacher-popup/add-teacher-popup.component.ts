import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {phoneValidator} from '../_person/_mapper/validator';
import {PeopleService} from '../_person/people.service';
import { HttpClient } from '@angular/common/http';

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

  readonly peopleService = inject(PeopleService);
  private readonly http = inject(HttpClient);

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
      this.http.post('http://localhost:3000/submissions', this.form.value)
        .subscribe({
          next: () => {
            console.log('Submission successful.');
            this.peopleService.addPerson(this.form.value);
          } ,
          error: () => console.error('Error occurred during submission.'),
        });
      this.form.reset();
      this.closed.emit();
    }
  }
}
