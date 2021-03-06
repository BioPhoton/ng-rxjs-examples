import { Component } from '@angular/core';
import { interval, merge, NEVER, Observable, Subject } from 'rxjs';
import {
  mapTo,
  scan,
  startWith,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { initialCounterState } from './initial-counter-state';
import { CounterState } from './utils/counter-state.interface';
import { getInputValue } from './utils/getInputValue';

@Component({
  selector: 'ohdui-counter-container',
  templateUrl: './counter-container.component.html'
})
export class CounterContainerComponent {

  readonly initialCounterState = initialCounterState;
  getInputValue = getInputValue;

  btnStart: Subject<Event> = new Subject<Event>();
  btnPause: Subject<Event> = new Subject<Event>();
  btnSetTo: Subject<Event> = new Subject<Event>();
  inputSetTo: Subject<Event> = new Subject<Event>();

  counterState$: Observable<CounterState> = merge(
    this.btnStart.pipe(mapTo(true)),
    this.btnPause.pipe(mapTo(false)),
  )
    .pipe(
      switchMap(isTicking => isTicking ? interval(this.initialCounterState.tickSpeed) : NEVER),
      startWith({...this.initialCounterState}),
      scan((state: CounterState) => ({...state, count: ++state.count}))
    );

  immutable() {
    this.counterState$ = merge(
      this.btnStart.pipe(mapTo(true)),
      this.btnPause.pipe(mapTo(false)),
    )
      .pipe(
        switchMap(isTicking => isTicking ? interval(this.initialCounterState.tickSpeed) : NEVER),
        startWith(this.initialCounterState),
        scan((state: CounterState) => ({...state, count: ++state.count}))
      )
  }

}
