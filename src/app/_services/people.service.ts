import { Injectable } from '@angular/core';
import {Person} from '../_models/person';
import {map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  getPeople(): Observable<Person[]> {
    return of([
      {
        name: "Ellen Kim",
        location: "USA",
        field: "Philosophy",
        photoUrl: "assets/portraits/EllenKim.jpg",
        sex: "female",
        age: 48,
        fav: false
      },
      {
        name: "Maddie Kim",
        location: "USA",
        field: "Robotics",
        photoUrl: "assets/portraits/MaddieKim.webp",
        sex: "female",
        age: 21,
        fav: false
      },
      {
        name: "David Kim",
        location: "Canada",
        field: "Software Engineering",
        photoUrl: "assets/portraits/DavidKim.webp",
        sex: "male",
        age: 43,
        fav: true
      },
      {
        name: "Caspian Keyes",
        location: "France",
        field: "Mathematics",
        photoUrl: "assets/portraits/Caspian.webp",
        sex: "male",
        age: 22,
        fav: false
      },
      {
        name: "Laurie Lowell",
        location: "Mexico",
        field: "Cybersecurity",
        photoUrl: "assets/portraits/LaurieLowell.webp",
        sex: "female",
        age: 31,
        fav: true
      },
      {
        name: "Stephen Holstrom",
        location: "USA",
        field: "Evil SEO",
        photoUrl: "assets/portraits/StephenHolstrom.webp",
        sex: "male",
        age: 62,
        fav: false
      },
      {
        name: "Vinod Chanda",
        location: "India",
        field: "Logic",
        photoUrl: "assets/portraits/VinodChanda.webp",
        sex: "male",
        age: 37,
        fav: false
      },
      {
        name: "Peter Waxman",
        location: "USA",
        field: "Good Scientist",
        photoUrl: "assets/portraits/Waxman.webp",
        sex: "male",
        age: 52,
        fav: true
      },
      {
        name: "Cody Lowell",
        location: "USA",
        field: "Art",
        photoUrl: "",
        sex: "male",
        age: 35,
        fav: false
      }
    ])
  }

  getLocations(): Observable<string[]> {
    return this.getPeople().pipe(
      map(people => [...new Set(people.flatMap(person => person.location))])
    );
  }

}
