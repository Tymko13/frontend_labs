import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  readonly buttons = ['Teachers', 'Statistics', 'Favourites', 'About'];
  readonly destination = ["#top-teachers", "#statistics", "#favourites", "#about"];

  @Output() addTeacherPopup = new EventEmitter<null>();

  emitTeacher() {
    this.addTeacherPopup.emit();
  }

  scrollTo(query: string) {
    const el = document.querySelector(query);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
