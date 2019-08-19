import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output
} from '@angular/core';
import { isNotUndefined, selectDistinctState } from '@ng-rx/shared/core';
import { defer, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { observe } from '../../utils';
import { SortConfig } from './sort-config.interface';
import { SortSelectionState } from './sort-selection-state.interface';

@Component({
  selector: 'sort-selection',
  templateUrl: './sort-selection.component.html',
  styleUrls: ['./sort-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortSelectionComponent {

  @Input() state;
  state$: Observable<SortSelectionState>;

  sortConfig$ = defer(() => this.state$.pipe(
    selectDistinctState('sortConfig'),
    isNotUndefined<SortConfig>()
    )
  );
  sortOptions$ = defer(() => this.state$.pipe(
    selectDistinctState('sortOptions'),
    isNotUndefined<string[]>()
  ));
  primarySortKey$ = this.sortConfig$.pipe(
    map(o => {
      const length = o ? Object.entries(o).length : 0;
      return length ? Object.entries(o).shift()[0] : '';
    })
  );

  newSortKeySubject = new Subject<string>();
  @Output() stateChanged = this.newSortKeySubject
    .pipe(
      withLatestFrom(this.sortConfig$),
      map(next => this.mapToOutput(...next))
    );

  constructor() {
    const { state, proxy } = observe<SortSelectionState>(this, 'state', new ReplaySubject<SortSelectionState>(1));
    this.state$ = state;
    return proxy;
  }

  mapToOutput(key, sortConfig): { [kex: string]: boolean } {
    // the keys state traverse 3 states in following order:
    // not present in the array, true, false

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

}
