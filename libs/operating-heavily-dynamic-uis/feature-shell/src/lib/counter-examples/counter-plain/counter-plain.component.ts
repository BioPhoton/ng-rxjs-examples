import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  interval,
  merge,
  NEVER,
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {
  first,
  map,
  mapTo,
  scan,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { CounterState } from '../utils/counter-state.interface';
import { ElementIds } from '../utils/element-id.enum';

@Component({
  selector: 'ohdui-counter-plain',
  templateUrl: './counter-plain.component.html',
  styleUrls: ['./counter-plain.component.scss']
})
export class CounterPlainComponent {
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
    this.immutable();
  }

  mutable() {
    merge(
      this.btnStart.pipe(mapTo(true)),
      this.btnPause.pipe(mapTo(false))
    )
      .pipe(
        switchMap(isTicking => isTicking ? interval(this.initialCounterState.tickSpeed) : NEVER),
        startWith(this.initialCounterState),
        tap(tick => this.count = this.count + 1)
      )
      .subscribe();
  }

  immutable(){
    this.count$ =
      merge(
        this.btnStart.pipe(mapTo(true)),
        this.btnPause.pipe(mapTo(false)),
      )
        .pipe(
          switchMap(isTicking => isTicking ? interval(this.initialCounterState.tickSpeed) : NEVER),
          startWith(this.initialCounterState.count),
          scan(count => ++count),
        )
  }

}
