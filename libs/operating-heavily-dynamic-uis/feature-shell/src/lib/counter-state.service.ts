import { Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { scan, shareReplay, startWith } from 'rxjs/operators';
import {
  CounterState,
  PartialCounterState
} from './utils/counter-state.interface';

@Injectable({
  providedIn: 'root'
})
export class CounterStateService {

  initialCounterState: CounterState;
  commands: Observable<PartialCounterState>[];

// === STATE OBSERVABLES ==================================================
  programmaticCommandSubject = new Subject<PartialCounterState>();
  counterCommands$ = merge(
    (this.commands) as any,
    this.programmaticCommandSubject.asObservable()
  );

  counterState$: Observable<CounterState> = this.counterCommands$
    .pipe(
      startWith(this.initialCounterState),
      scan((counterState: CounterState, command): CounterState => ({ ...counterState, ...command })),
      shareReplay(1)
    );

  setInitialCounterState(initialCounterState: CounterState) {
    this.initialCounterState = initialCounterState;
  }

  setCommandObservables(commands: Observable<PartialCounterState>[]) {
    this.commands = commands;
  }

  constructor() {

  }

}
