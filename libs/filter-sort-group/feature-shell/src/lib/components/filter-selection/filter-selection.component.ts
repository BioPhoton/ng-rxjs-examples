import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { getInputValue } from '@ng-rx/shared/core';
import { ReplaySubject, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { FilterSelectionState } from './filter-selection-state.interface';

@Component({
  selector: 'filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSelectionComponent implements OnDestroy {
  ngOnDestroy$ = new Subject();

  // BINDINGS
  stateSubject = new ReplaySubject<FilterSelectionState>(1);

  @Input() set state(keys) {
    this.stateSubject.next(keys);
  }

  state$ = this.stateSubject.asObservable();

  @Output() filterConfigChange = new Subject();

  // UI
  actionSubject = new Subject();
  action$ = this.actionSubject.asObservable();

  constructor() {
    this.action$
      .pipe(
        getInputValue(v => v.toString()),
        debounceTime(250),
        // fire output event here
        tap(this.filterConfigChange)
      )
      .pipe(
        takeUntil(this.ngOnDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

}