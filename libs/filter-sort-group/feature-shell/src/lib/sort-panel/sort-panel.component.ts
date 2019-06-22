import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { selectDistinctState } from '../operators/selectDistinctState';

export interface Layout {
  name: string;
  top: (d, i) => string;
  left: (d, i) => string;
  height: string;
  width: string;
}

export interface ItemViewState<T> {
  data: T[],
  layout: Layout
}

@Component({
  selector: 'sort-panel',
  templateUrl: './sort-panel.component.html',
  styleUrls: ['./sort-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortPanelComponent implements OnDestroy {
  ngOnDestroy$ = new Subject();

  // BINDINGS
  stateSubject = new ReplaySubject<{ sortKeys: string[], sortConfig: { [key: string]: boolean } }>(1);
  @Input() set state(keys) {
    this.stateSubject.next(keys);
  }
  state$ = this.stateSubject.asObservable();

  @Output() sortConfigChange = new Subject();

  // STATE
  sortConfig$ = this.state$.pipe(selectDistinctState('sortConfig'));
  sortKeys$ = this.state$.pipe(selectDistinctState('sortKeys'));

  // UI
  newSortKeySubject = new Subject();
  newSortKey$ = this.newSortKeySubject.asObservable();

  constructor() {
    this.newSortKey$
      .pipe(
        withLatestFrom(this.sortConfig$),
        map(([key, sortConfig]) => {
          return this.updateSortConfig(key, sortConfig);
        }),
        // fire output event here
        tap(this.sortConfigChange)
      )
      .pipe(
        takeUntil(this.ngOnDestroy$)
      )
      .subscribe();
  }

  updateSortConfig = (key, sortConfig) => {
    // the keys state traverse 3 states in following order:
    // not present in the array, true, false
    // on every call the key

    if (!(key in sortConfig)) {
      return { ...sortConfig, [key]: true };
    }

    if ((key in sortConfig && sortConfig[key] === true)) {
      return { ...sortConfig, [key]: false };
    }

    if ((key in sortConfig && sortConfig[key] === false)) {
      const { [key]: undefined, ...newSorting } = sortConfig;
      return newSorting;
    }
  };

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

}
