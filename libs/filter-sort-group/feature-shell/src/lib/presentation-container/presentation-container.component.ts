import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as fastSort from 'fast-sort';
import * as crossfilter from 'crossfilter2';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { map, scan, startWith, tap } from 'rxjs/operators';
import { data } from '../data';
import { selectDistinctState } from '../operators/selectDistinctState';

const getCardsPerRow = (): number => {
  const width = window.innerWidth - 20;
  return Math.floor(width / 200);
};


@Component({
  selector: 'presentation-container',
  templateUrl: './presentation-container.component.html',
  styleUrls: ['./presentation-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationContainerComponent implements OnInit {

  action = new Subject();

  initialState = {
    data: data,
    layout: {
      name: 'cards',
      top: (d, i) => Math.floor(i / getCardsPerRow()) * 90 + 'px',
      left: (d, i) => (i % getCardsPerRow()) * 200 + 'px',
      height: 80 + 'px',
      width: 188 + 'px'
    },
    sortConfig: {},
    filterConfig: ''
  };

  // COMMAND PROCESSING
  processed$ = this.action.pipe(

  );

  // WRITING
  state$ = this.processed$.pipe(
    startWith(this.initialState),
    scan((s, c) => ({ ...s, ...c }))
  );

  // DERIVATION
  //=
  data$: Observable<any[]> = this.state$.pipe(selectDistinctState('data'));
  sortConfig$: Observable<any> = this.state$.pipe(selectDistinctState('sortConfig'));
  filterConfig$: Observable<any> = this.state$.pipe(selectDistinctState('filterConfig'));

  //==
  sortKeys$ = this.data$.pipe(map(a => Object.keys(a[0])));
  layout$ = this.state$.pipe(selectDistinctState('layout'));

  //===
  sortPanelState$ = combineLatest(this.sortConfig$, this.sortKeys$)
    .pipe(
      map(([sortConfig, sortKeys]) => ({ sortConfig, sortKeys }))
    );

  selectedData$ = combineLatest(this.data$, this.sortConfig$, this.filterConfig$)
    .pipe(
      map(([data, sort, filter]) => {

        const dataFiltered = this.filter(data, filter);
        // group
        const groupedData = dataFiltered;

        // sort
        return this.sort(sort, groupedData);
      })
    );

  itemViewState$ = combineLatest(this.layout$, this.selectedData$)
    .pipe(
      map(
        ([layout, data]) => ({ layout, data })
      )
    );

  constructor() {
    //const t = crossfilter(data);
    //const operatorsByMichael = t.dimension((d) => d.michael);
    //const f = operatorsByMichael.filterFunction(v => v === 'Rate-Limit');
    //const top = f.top(Infinity);
    //console.log('operatorsByMichael', top);
  }

  sort = (sorting, data: any[]): any[] => {
    const sortConfig = Object.entries(sorting)
      .reduce((config, [key, direction]) => {
        config.push({ [direction ? 'asc' : 'desc']: d => d[key] });
        return config;
      }, []);
    return sortConfig.length ? fastSort([...data]).by(sortConfig) : data;
  };

  filter = (d: any[], filterConfig): any[] => {
    return d && filterConfig ?
      d.filter(d => d.name.search(filterConfig) >= 0) :
      d;
  };

  ngOnInit() {
  }

}
