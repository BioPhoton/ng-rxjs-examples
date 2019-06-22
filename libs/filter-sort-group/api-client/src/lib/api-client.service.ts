import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { data } from './data';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  dataSubject = new Subject();
  data$ = this.dataSubject
    .asObservable()
    .pipe(
      startWith(data),
      map(this.prepareData)
    )

  constructor() { }

  updateData() {
    return this.dataSubject.next(data)
  }

  prepareData(data: any[]) {
    if (data.length === 0) {
      return data;
    }

    return data.map(d => {
      const none = 'None';
      const toNone = (prop) => (d) => !d[prop] ? none : d[prop];
      d.id = d.id === undefined || d.id === null ? 0 : d.id;
      d.cedric = toNone('cedric')(d);
      d.oldSchool = toNone('oldSchool')(d);
      d.michael = toNone('michael')(d);
      d.isDeprecate = toNone('isDeprecate')(d);
      d.isAlias = toNone('isAlias')(d);
      return d;
    });
  }

}
