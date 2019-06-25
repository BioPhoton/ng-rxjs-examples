import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { data } from './data';
import { RxJsDataItem } from './rxjs-data-item.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  dataSubject = new Subject<any[]>();
  data$: Observable<RxJsDataItem[]> = this.dataSubject
    .asObservable()
    .pipe(
      startWith(data),
      map(this.prepareData)
    )

  constructor() { }

  updateData() {
    return this.dataSubject.next(data)
  }

  prepareData(data: any[]): RxJsDataItem[] {
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
      d.isOperator = toNone('isOperator')(d);

      return d;
    });
  }

}
