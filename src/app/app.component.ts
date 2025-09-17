import {Component, inject} from '@angular/core';
import {SectionComponent} from './section/section.component';
import {NavComponent} from './nav/nav.component';
import {PeopleService} from './_services/people.service';
import {AsyncPipe} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {FilterComponent} from './filter/filter.component';
import {TableComponent} from './table/table.component';
import {FavsComponent} from './favs/favs.component';
import {AddTeacherPopupComponent} from './add-teacher-popup/add-teacher-popup.component';

@Component({
  selector: 'app-root',
  imports: [
    SectionComponent,
    NavComponent,
    AsyncPipe,
    ProfileComponent,
    FilterComponent,
    TableComponent,
    FavsComponent,
    AddTeacherPopupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly peopleService = inject(PeopleService)
  readonly people = this.peopleService.getPeople();
}
