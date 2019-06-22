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
import { getInputValue } from '../operators/getInputValue';
import { selectDistinctState } from '../operators/selectDistinctState';

@Component({
  selector: 'filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent implements OnDestroy {
  ngOnDestroy$ = new Subject();

  // BINDINGS
  stateSubject = new ReplaySubject<string>(1);
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
