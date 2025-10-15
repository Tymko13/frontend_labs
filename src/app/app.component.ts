import {Component, inject} from '@angular/core';
import {SectionComponent} from './section/section.component';
import {NavComponent} from './nav/nav.component';
import {PeopleService} from './_person/people.service';
import {ProfileComponent} from './profile/profile.component';
import {FilterComponent} from './filter/filter.component';
import {TableComponent} from './table/table.component';
import {FavsComponent} from './favs/favs.component';
import {AddTeacherPopupComponent} from './add-teacher-popup/add-teacher-popup.component';
import {TeacherInfoPopupComponent} from './teacher-info-popup/teacher-info-popup.component';

@Component({
  selector: 'app-root',
  imports: [
    SectionComponent,
    NavComponent,
    ProfileComponent,
    FilterComponent,
    TableComponent,
    FavsComponent,
    AddTeacherPopupComponent,
    TeacherInfoPopupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly peopleService = inject(PeopleService)
  readonly people = this.peopleService.getPeople();
}
