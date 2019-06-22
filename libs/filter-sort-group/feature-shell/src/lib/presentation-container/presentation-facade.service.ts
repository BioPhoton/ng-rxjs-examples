import { Injectable } from '@angular/core';
import { selectDistinctState } from '@ng-rx/shared/core';
import { ApiClientService } from '@nx-v8/filter-sort-group/api-client';
import { merge, Observable, Subject } from 'rxjs';
import { map, scan, shareReplay, startWith } from 'rxjs/operators';
import { initRxJsExplorerState } from './initial-state';
import { RxJsExplorerState } from './rxjs-explorer-state.interface';

const getCardsPerRow = (itemWith, margin): number => {
  const width = window.innerWidth - margin;
  return Math.floor(width / itemWith);
};

@Injectable({
  providedIn: 'root'
})
export class PresentationFacade {

  private initialState: RxJsExplorerState = initRxJsExplorerState;

  command$ = new Subject();
  state$ = merge(
    this.command$,
    this.rxService.data$.pipe(map(data => ({ data })))
  ).pipe(
    startWith(this.initialState),
    scan((s, c) => ({ ...s, ...c })),
    shareReplay(1)
  );

  data$: Observable<any[]> = this.state$.pipe(selectDistinctState('data'));
  sortConfig$: Observable<any> = this.state$.pipe(selectDistinctState('sortConfig'));
  filterConfig$: Observable<any> = this.state$.pipe(selectDistinctState('filterConfig'));
  layoutConfig$ = this.state$.pipe(selectDistinctState('layoutConfig'));

  constructor(private rxService: ApiClientService) {
  }

  init() {
    this.rxService.updateData();
  }

}
