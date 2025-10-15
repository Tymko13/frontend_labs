import {Component, computed, inject, signal} from '@angular/core';
import {SectionComponent} from './section/section.component';
import {NavComponent} from './nav/nav.component';
import {PeopleService} from './_person/people.service';
import {ProfileComponent} from './profile/profile.component';
import {FilterComponent} from './filter/filter.component';
import {TableComponent} from './table/table.component';
import {FavsComponent} from './favs/favs.component';
import {AddTeacherPopupComponent} from './add-teacher-popup/add-teacher-popup.component';
import {FormsModule} from '@angular/forms';
import {TeacherInfoPopupComponent} from './teacher-info-popup/teacher-info-popup.component';
import {InfoService} from './_person/info.service';

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
    FormsModule,
    TeacherInfoPopupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly peopleService = inject(PeopleService);
  readonly infoService = inject(InfoService);

  filter = signal<any>({});
  query = signal<string>("");
  filteredPeople = computed(() => {
    if(this.query()) {
      return this.peopleService.searchPeople(this.query());
    }
    return this.peopleService.filterPeople(this.filter());
  })

  filterPeople(filter: any) {
    this.filter.set(filter);
  }

  visibleAdd = false;

  toggleAddTeacher() {
    if (this.visibleAdd) {
      this.visibleAdd = false;
      document.body.classList.remove('no-scroll');
    } else {
      this.visibleAdd = true;
      document.body.classList.add('no-scroll');
    }
  }
  currentQuery: string = "";
  search() {
    this.query.set(this.currentQuery);
  }


  currentPerson = this.infoService.currentPerson;
  visibleInfo = this.infoService.visibleInfo;
}
