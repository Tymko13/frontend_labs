import {randomUserMock} from './FE4U-Lab2-mock';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import _ from 'lodash';

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return (re.test(email));
}

function validatePhone(phone: string): boolean {
  const re = /^\+?(\(\d{2,3}\)|\d{2,3})?[-\s]?\d{3,4}[-\s]?\d{2,3}[-\s]?\d{2,3}$/;
  return re.test(phone);
}

const requiredFields = [
  'gender',
  'name.first',
  'name.last',
  'login.uuid',
  'dob.date',
  'dob.age',
  'location.city',
  'location.country'
];

export function filterValidRandomUsers(users: typeof randomUserMock): typeof randomUserMock {
  return _.filter(users, user =>
    _.every(requiredFields, field => _.get(user, field)) &&
    validateEmail(user.email) &&
    validatePhone(user.phone)
  );
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value;
    const re = /^\+?(\(\d{2,3}\)|\d{2,3})?[-\s]?\d{3,4}[-\s]?\d{2,3}[-\s]?\d{2,3}$/;
    return re.test(phone) ? null : { invalidPhone: true };
  };
}
