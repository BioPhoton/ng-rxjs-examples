import { Injectable } from '@angular/core';
import {
  combineLatest,
  interval,
  merge,
  NEVER,
  Observable,
  Subject
} from 'rxjs';
import {
  map,
  mapTo,
  scan,
  shareReplay,
  startWith,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { initialCounterState } from '../initial-counter-state';
import { selectDistinctState } from '../operators/selectDistinctState';
import {
  CounterState,
  CounterStateKeys,
  PartialCounterState
} from '../utils/counter-state.interface';

@Injectable({
  providedIn: 'root'
})
export class CounterFacade {

  readonly initialCounterState = initialCounterState;

  // = BASE OBSERVABLES  ====================================================

  // == SOURCE OBSERVABLES ==================================================
  btnStart: Subject<Event> = new Subject<Event>();
  btnPause: Subject<Event> = new Subject<Event>();
  btnUp: Subject<Event> = new Subject<Event>();
  btnDown: Subject<Event> = new Subject<Event>();
  btnReset: Subject<Event> = new Subject<Event>();
  btnSetTo: Subject<Event> = new Subject<Event>();
  inputSetTo: Subject<Event> = new Subject<Event>();
  inputTickSpeed: Subject<Event> = new Subject<Event>();
  inputCountDiff: Subject<Event> = new Subject<Event>();

  btnSetToWithLatestSetTo$ = this.btnSetTo.pipe(withLatestFrom(this.inputSetTo.pipe(startWith(this.initialCounterState.count)), (_, n) => n));


// === STATE OBSERVABLES ==================================================
  programmaticCommandSubject = new Subject<PartialCounterState>();
  counterCommands$: Observable<PartialCounterState> = merge(
    this.btnStart.pipe(mapTo({ isTicking: true })),
    this.btnPause.pipe(mapTo({ isTicking: false })),
    this.btnSetToWithLatestSetTo$.pipe(map(n => ({ count: n }))),
    this.btnUp.pipe(mapTo({ countUp: true })),
    this.btnDown.pipe(mapTo({ countUp: false })),
    this.btnReset.pipe(mapTo({ ...this.initialCounterState })),
    this.inputTickSpeed.pipe(map(n => ({ tickSpeed: n }))),
    this.inputCountDiff.pipe(map(n => ({ countDiff: n }))),
    this.programmaticCommandSubject.asObservable()
  );
  counterState$: Observable<CounterState> = this.counterCommands$
    .pipe(
      startWith(this.initialCounterState),
      scan((counterState: CounterState, command): CounterState => ({ ...counterState, ...command })),
      shareReplay(1)
    );


  // === INTERACTION OBSERVABLES ============================================
  isTicking$ = this.counterState$.pipe(selectDistinctState<CounterState, boolean>(CounterStateKeys.isTicking));
  tickSpeed$ = this.counterState$.pipe(selectDistinctState<CounterState, number>(CounterStateKeys.tickSpeed));

  intervalTick$ =  combineLatest(this.isTicking$, this.tickSpeed$)
    .pipe(
      switchMap(([isTicking, tickSpeed]) => isTicking ? interval(tickSpeed) : NEVER)
    );

  // = SIDE EFFECTS =========================================================
  // == BACKGROUND PROCESSES
  commandFromTick$ = this.intervalTick$
    .pipe(
      withLatestFrom(this.counterState$, (_, s) => s),
      tap(({ count, countUp, countDiff }) => {
        const diff = countDiff * (countUp ? 1 : -1);
        this.programmaticCommandSubject.next({ count: count + diff });
      })
    );

  constructor() {

  }

  /*
  // === STATE OBSERVABLES ==================================================
  programmaticCommandSubject = new Subject<PartialCounterState>();
  counterCommands$: Observable<PartialCounterState> = merge(
    this.btnStart.pipe(mapTo({ isTicking: true })),
    this.btnPause.pipe(mapTo({ isTicking: false })),
    this.btnSetToWithLatestSetTo$.pipe(map(n => ({ count: n }))),
    this.btnUp.pipe(mapTo({ countUp: true })),
    this.btnDown.pipe(mapTo({ countUp: false })),
    this.btnReset.pipe(mapTo({ ...this.initialCounterState })),
    this.inputTickSpeed.pipe(map(n => ({ tickSpeed: n }))),
    this.inputCountDiff.pipe(map(n => ({ countDiff: n }))),
    this.programmaticCommandSubject.asObservable()
  );
  counterState$: Observable<CounterState> = this.counterCommands$
    .pipe(
      startWith(this.initialCounterState),
      scan((counterState: CounterState, command): CounterState => ({ ...counterState, ...command })),
      shareReplay(1)
    );


  // === INTERACTION OBSERVABLES ============================================
  isTicking$ = this.counterState$.pipe(selectDistinctState<CounterState, boolean>(CounterStateKeys.isTicking));
  tickSpeed$ = this.counterState$.pipe(selectDistinctState<CounterState, number>(CounterStateKeys.tickSpeed));

  intervalTick$ =  combineLatest(this.isTicking$, this.tickSpeed$)
    .pipe(
      switchMap(([isTicking, tickSpeed]) => isTicking ? interval(tickSpeed) : NEVER)
    );

  // == BACKGROUND PROCESSES
  commandFromTick$ = this.intervalTick$
    .pipe(
      withLatestFrom(this.counterState$, (_, s) => s),
      tap(({ count, countUp, countDiff }) => {
        const diff = countDiff * (countUp ? 1 : -1);
        this.programmaticCommandSubject.next({ count: count + diff });
      })
    );
  */

}
