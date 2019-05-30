import { Component } from '@angular/core';
import { defer, merge, Observable, Subject } from 'rxjs';
import { map, mapTo, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import {
  CounterState,
  PartialCountDownState
} from '../counter-state.interface';
import { initialCounterState } from '../initial-counter-state';

@Component({
  selector: 'ohdui-counter-container',
  templateUrl: './counter-container.component.html'
})
export class CounterContainerComponent {

  // = BASE OBSERVABLES  ====================================================
  // == SOURCE OBSERVABLES ==================================================
  public btnStart: Subject<Event> = new Subject<Event>();
  public btnPause: Subject<Event> = new Subject<Event>();
  public btnUp: Subject<Event> = new Subject<Event>();
  public btnDown: Subject<Event> = new Subject<Event>();
  public btnReset: Subject<Event> = new Subject<Event>();
  public btnSetTo: Subject<Event> = new Subject<Event>();
  public inputTickSpeed: Subject<Event> = new Subject<Event>();
  public inputCountDiff: Subject<Event> = new Subject<Event>();
  // === STATE OBSERVABLES ==================================================
  programmaticCommandSubject = new Subject<PartialCountDownState>();
  counterCommands$ = defer(() => merge(
    this.btnStart.pipe(mapTo({ isTicking: true })),
    this.btnPause.pipe(mapTo({ isTicking: false })),
    this.btnSetTo.pipe(map(n => ({ count: n }))),
    this.btnUp.pipe(mapTo({ countUp: true })),
    this.btnDown.pipe(mapTo({ countUp: false })),
    this.btnReset.pipe(mapTo({ ...initialCounterState })),
    this.inputTickSpeed.pipe(map(n => ({ tickSpeed: n }))),
    this.inputCountDiff.pipe(map(n => ({ countDiff: n }))),
    this.programmaticCommandSubject.asObservable()
  ));
  counterState$: Observable<CounterState> = this.counterCommands$
    .pipe(
      startWith(initialCounterState),
      scan((counterState: CounterState, command): CounterState => ({ ...counterState, ...command })),
      shareReplay(1),
      tap(v => console.log('S', v))
    );
  // === INTERACTION OBSERVABLES ============================================
  // count$ = this.counterState$.pipe(pluck<CounterState, number>(ConterStateKeys.count));
  // isTicking$ = this.counterState$.pipe(selectDistinctState<CounterState, boolean>(ConterStateKeys.isTicking));
  // tickSpeed$ = this.counterState$.pipe(selectDistinctState<CounterState, number>(ConterStateKeys.tickSpeed));
  // countDiff$ = this.counterState$.pipe(selectDistinctState<CounterState, number>(ConterStateKeys.countDiff));

  // = SIDE EFFECTS =========================================================
  // == UI COMMANDS ===========================================================
  // == UI EVENTS ==========================================================
  // commandFromTick$ = this.btnStart.pipe(mapTo({isTicking: true}));

  constructor() {
  }

}
