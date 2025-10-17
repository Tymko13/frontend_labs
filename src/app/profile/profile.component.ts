import {Component, Input} from '@angular/core';
import {Person} from '../_person/person';

@Component({
  selector: 'app-profile',
  imports: [

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() person: Person | null = null;
  @Input() showStar: boolean = true;

  toInitials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .map(part => part[0].toUpperCase())
      .join('.') + '.';
  }
}
