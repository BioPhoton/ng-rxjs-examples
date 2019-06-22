import { Injectable } from '@angular/core';
import { selectDistinctState } from '@ng-rx/shared/core';
import { ApiClientService } from '@nx-v8/filter-sort-group/api-client';
import { merge, Observable, Subject } from 'rxjs';
import { map, scan, shareReplay, startWith } from 'rxjs/operators';

const getCardsPerRow = (): number => {
  const width = window.innerWidth - 20;
  return Math.floor(width / 200);
};

@Injectable({
  providedIn: 'root'
})
export class PresentationFacade {

  private initialState = {
    data: {},
    layout: {
      name: 'cards',
      top: (d, i) => Math.floor(i / getCardsPerRow()) * 90 + 'px',
      left: (d, i) => (i % getCardsPerRow()) * 200 + 'px',
      height: 80 + 'px',
      width: 188 + 'px',
      totalHeight: (data) => 20 + Math.ceil(data.length / getCardsPerRow()) * 90,
      getColor: (d, i) => d
    },
    colorMap: {},
    sortConfig: {},
    filterConfig: ''
  };

  command$ = new Subject();
  state$ = merge(
    this.command$,
    this.rxService.data$.pipe(map(data => ({ data })))
  ).pipe(
    startWith(this.initialState),
    scan((s, c) => ({ ...s, ...c })),
    shareReplay(1)
  );

  data$: Observable<any[]> = this.state$.pipe(
    selectDistinctState('data'));
  sortConfig$: Observable<any> = this.state$.pipe(selectDistinctState('sortConfig'));
  filterConfig$: Observable<any> = this.state$.pipe(selectDistinctState('filterConfig'));
  layout$ = this.state$.pipe(selectDistinctState('layout'));

  constructor(private rxService: ApiClientService) {

  }

  init() {
    this.rxService.updateData();
  }

}
