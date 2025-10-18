import {Component, effect, EventEmitter, inject, Input, OnChanges, Output, signal, SimpleChanges} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Person} from '../_person/person';
import {PeopleService} from '../_person/people.service';
import L, {LatLngTuple} from 'leaflet';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

@Component({
  selector: 'app-teacher-info-popup',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './teacher-info-popup.component.html',
  styleUrl: './teacher-info-popup.component.scss'
})
export class TeacherInfoPopupComponent implements OnChanges {
  @Input() visible = false;
  @Input() person: Person | null = null;
  @Output() closed = new EventEmitter<void>();

  visibleSignal = signal<boolean>(this.visible);
  personSignal = signal<Person | null>(this.person);

  constructor() {
    dayjs.extend(relativeTime);
    effect(() => {
      if (this.visibleSignal() && this.personSignal()) {
        TeacherInfoPopupComponent.initMap(this.person!);
      }
    });
  }

  static map: L.Map | undefined = undefined;

  static initMap(person: Person) {
    setTimeout(() => {
      const coords: LatLngTuple = [person!.coordinates!.latitude, person!.coordinates!.longitude];
      if (!TeacherInfoPopupComponent.map) {
        TeacherInfoPopupComponent.map = L.map('map').setView(coords, 2);
        L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=PKC17XtDoXnxOVVo5vAh', {
          attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(TeacherInfoPopupComponent.map);
      } else {
        TeacherInfoPopupComponent.map.setView(coords, 2);
      }
      L.marker(coords).addTo(TeacherInfoPopupComponent.map);
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']) {
      this.visibleSignal.set(changes['visible'].currentValue);
    }
    if (changes['person']) {
      this.personSignal.set(changes['person'].currentValue);
    }
  }

  private readonly peopleService = inject(PeopleService);

  close() {
    this.closed.emit();
    TeacherInfoPopupComponent.map = undefined;
  }

  toggleFav(person: Person | null) {
    if (person) {
      this.person = this.peopleService.updatePerson({id: person.id, favourite: !person.favourite});
    }
  }

  private mapVisible = true;

  toggleMap() {
    if (this.mapVisible) {
      document.getElementById("map")!.style.visibility = "hidden";
      this.mapVisible = false;
    } else {
      document.getElementById("map")!.style.visibility = "visible";
      TeacherInfoPopupComponent.initMap(this.person!);
      this.mapVisible = true;
    }
  }

  protected readonly dayjs = dayjs;

  getBirthday() {
    const today = dayjs();
    let next = dayjs(this.person?.b_date).year(today.year());
    if (next.isBefore(today, 'day')) {
      next = next.add(1, 'year');
    }
    return next.fromNow();
  }
}
