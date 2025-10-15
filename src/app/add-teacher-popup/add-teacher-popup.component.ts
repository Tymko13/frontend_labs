import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

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

  close() {
    this.closed.emit();
    document.body.classList.remove('no-scroll');
  }

  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    speciality: ['', Validators.required],
    country: ['', Validators.required],
    city: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    dob: ['', Validators.required],
    sex: ['', Validators.required],
    color: ['#000000'],
    notes: ['']
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.closed.emit();
    }
  }
}
