import {additionalUsers, randomUserMock} from './FE4U-Lab2-mock';

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return (re.test(email));
}

function validatePhone(phone: string): boolean {
  const re = /^\+?(\(\d{2,3}\)|\d{2,3})?[-\s]?\d{3,4}[-\s]?\d{2,3}[-\s]?\d{2,3}$/;
  return re.test(phone);

}

export function filterValidRandomUsers(users: typeof randomUserMock): typeof randomUserMock {
  return users.filter(user =>
    user.gender &&
    user.name?.first &&
    user.name?.last &&
    user.login?.uuid &&
    user.dob?.date &&
    user.dob?.age &&
    user.email && validateEmail(user.email) &&
    user.phone && validatePhone(user.phone) &&
    user.location?.city &&
    user.location?.country
  );
}

export function filterValidAdditionalUsers(users: typeof additionalUsers): typeof additionalUsers {
  return users.filter(user =>
    user.gender &&
    user.full_name &&
    user.id &&
    user.b_day &&
    user.city &&
    user.country &&
    user.email && validateEmail(user.email) &&
    user.phone && validatePhone(user.phone)
  );
}
