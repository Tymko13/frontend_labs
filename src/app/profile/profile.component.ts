import {Component, inject, Input} from '@angular/core';
import {Person} from '../_person/person';
import {InfoService} from '../_person/info.service';

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

  readonly infoService = inject(InfoService);

  toInitials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .map(part => part[0].toUpperCase())
      .join('.') + '.';
  }
}
