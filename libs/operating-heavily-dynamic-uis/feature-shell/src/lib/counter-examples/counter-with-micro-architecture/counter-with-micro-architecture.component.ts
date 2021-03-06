import { Component } from '@angular/core';
import { interval, merge, NEVER, Observable, Subject, timer } from 'rxjs';
import { mapTo, scan, startWith, switchMap, tap } from 'rxjs/operators';
import { CounterState } from './utils/counter-state.interface';
import { ElementIds } from './utils/element-id.enum';

@Component({
  selector: 'ohdui-counter-with-micro-architecture',
  templateUrl: './counter-with-micro-architecture.component.html',
  styleUrls: ['./counter-with-micro-architecture.component.scss']
})
export class CounterWithMicroArchitectureComponent {
  elementIds = ElementIds;

  initialCounterState: CounterState = {
    isTicking: false,
    count: 0,
    countUp: true,
    tickSpeed: 200,
    countDiff: 1
  };

  btnStart: Subject<Event> = new Subject<Event>();
  btnPause: Subject<Event> = new Subject<Event>();
  btnSetTo: Subject<Event> = new Subject<Event>();
  inputSetTo: Subject<Event> = new Subject<Event>();

  count = this.initialCounterState.count;
  count$: Observable<number>;

  constructor() {
    this.mutable();
  }

  getInputValue = (event: HTMLInputElement): number => {
    return parseInt(event['target'].value, 10);
  }


  mutable() {
    merge(
      this.btnStart.pipe(mapTo(true)),
      this.btnPause.pipe(mapTo(false))
    )
      .pipe(
        switchMap(isTicking => isTicking ? interval(this.initialCounterState.tickSpeed) : NEVER),
        tap(tick => this.count = ++this.count)
      )
      .subscribe();
  }

  immutable() {
    this.count$ =
      merge(
        this.btnStart.pipe(mapTo(true)),
        this.btnPause.pipe(mapTo(false))
      )
        .pipe(
          switchMap(isTicking => isTicking ? interval(this.initialCounterState.tickSpeed) : NEVER),
          startWith(this.initialCounterState.count),
          scan(count => ++count)
        );
  }

// == CONSTANTS ===========================================================
// = BASE OBSERVABLES  ====================================================
// == SOURCE OBSERVABLES ==================================================
// === STATE OBSERVABLES ==================================================
// === INTERACTION OBSERVABLES ============================================
// == INTERMEDIATE OBSERVABLES ============================================
// = SIDE EFFECTS =========================================================
// == UI INPUTS ===========================================================
// == UI OUTPUTS ==========================================================
// == SUBSCRIPTION ========================================================
// = HELPER ===============================================================
// = CUSTOM OPERATORS =====================================================
// == CREATION METHODS ====================================================
// == OPERATORS ===========================================================

}
