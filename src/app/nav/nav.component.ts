import {Component, computed, EventEmitter, inject, Output} from '@angular/core';
import {PeopleService} from '../_person/people.service';

@Component({
  selector: 'app-nav',
  imports: [
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private readonly peopleService = inject(PeopleService);
  readonly buttons = computed(() => {
    if (this.peopleService.favPeople().length == 0) {
      return ['Teachers', 'Statistics', 'About'];
    }
    return ['Teachers', 'Statistics', 'Favourites', 'About'];
  })
  readonly destination = ["#top-teachers", "#statistics", "#favourites", "#about"];

  @Output() addTeacherPopup = new EventEmitter<null>();

  emitTeacher() {
    this.addTeacherPopup.emit();
  }

  scrollTo(query: string) {
    switch (query) {
      case 'Favourites':
        query = '#favourites';
        break;
      case 'Statistics':
        query = '#statistics';
        break;
      case 'About':
        query = '#about';
        break;
      case 'Teachers':
      default:
        query = '#top-teachers';
    }
    const el = document.querySelector(query);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
