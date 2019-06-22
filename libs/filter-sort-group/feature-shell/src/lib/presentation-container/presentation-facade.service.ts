import { Injectable } from '@angular/core';
import {
  combineLatest,
  concat,
  defer,
  merge,
  Observable,
  of,
  Subject
} from 'rxjs';
import { first, map, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import { ApiClientService } from '../api-client.service';
import { selectDistinctState } from '../operators/selectDistinctState';

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

  initialState$ = combineLatest(of(this.initialState), defer(() => this.data$))
    .pipe(
      map(([s, d]) => ({ ...s, data: d })),
      first()
    );

  command$ = new Subject();
  state$ = merge(
      this.command$,
      this.rxService.data$.pipe(map(data => ({data})))
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
