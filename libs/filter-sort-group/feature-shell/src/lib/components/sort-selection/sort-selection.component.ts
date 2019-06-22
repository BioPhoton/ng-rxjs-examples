import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { selectDistinctState } from '@ng-rx/shared/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import {
  SortConfig,
  SortSelectionState
} from './sort-selection-state.interface';

@Component({
  selector: 'sort-selection',
  templateUrl: './sort-selection.component.html',
  styleUrls: ['./sort-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortSelectionComponent implements OnDestroy {
  ngOnDestroy$ = new Subject();

  // BINDINGS
  stateSubject = new ReplaySubject<SortSelectionState>(1);
  @Input() set state(keys) {
    this.stateSubject.next(keys);
  }
  state$ = this.stateSubject.asObservable();

  @Output() sortConfigChange = new Subject();

  // STATE
  sortConfig$ = this.state$.pipe(selectDistinctState<SortSelectionState, SortConfig>('sortConfig'));
  sortOptions$ = this.state$.pipe(selectDistinctState<SortSelectionState, string[]>('sortOptions'));

  // UI
  newSortKeySubject = new Subject<string>();
  newSortKey$ = this.newSortKeySubject.asObservable();

  constructor() {
    this.newSortKey$
      .pipe(
        withLatestFrom(this.sortConfig$),
        map(([key, sortConfig]) => this.updateSortConfig(key, sortConfig)),
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
