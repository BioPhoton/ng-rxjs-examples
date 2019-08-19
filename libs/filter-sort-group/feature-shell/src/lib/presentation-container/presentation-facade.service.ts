import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { selectDistinctState } from '@ng-rx/shared/core';
import { ApiClientService } from '@nx-v8/filter-sort-group/api-client';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { map, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import { getColorMap } from '../utils';
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
    this.route.queryParams.pipe(map(qP => ({queryParams: qP}))),
    this.rxService.data$.pipe(map(data => ({ data })))
  ).pipe(
    startWith(this.initialState),
    scan((s, c) => ({ ...s, ...c })),
    shareReplay(1)
  );

  queryParams$ = this.state$.pipe(selectDistinctState('queryParams'));
  data$: Observable<any[]> = this.state$.pipe(selectDistinctState('data'));
  sortConfig$: Observable<any> = this.state$.pipe(selectDistinctState('sortConfig'));
  filterOptions$: Observable<string[]> = this.state$.pipe(selectDistinctState('filterOptions'));
  layoutOptions$ = this.state$.pipe(selectDistinctState('layoutOptions'));

  layoutConfig$ = combineLatest(
    this.queryParams$.pipe(selectDistinctState<string>('selectedLayout')),
    this.layoutOptions$
  ).pipe(
    map(([layout, layoutOptions]) => {
      return layoutOptions[layout]
    })
  );
  filterConfig$ = combineLatest(
    this.queryParams$.pipe(selectDistinctState<string>('filterConfig')),
    this.filterOptions$
  ).pipe(
    map(([layout, layoutOptions]) => {
      return layoutOptions[layout]
    })
  );
  sortOptions$ = this.data$.pipe(map(a => Object.keys(a[0])));
  colorMap$ = this.data$.pipe(map(getColorMap));

  constructor(private rxService: ApiClientService, private router: Router, private route: ActivatedRoute) {
    this.command$
      .pipe(tap((c: PresentationContainerCommands) => {
        let queryParams = {};
        if(c && c.selectedLayout) {
          queryParams = {...queryParams, selectedLayout: c.selectedLayout}
        }
        if(c && c.filterConfig) {
          console.log(c.filterConfig)
        }
        this.router.navigate([], {queryParams})
      }))
      .subscribe();
  }

  init() {
    this.rxService.updateData();
  }

}
