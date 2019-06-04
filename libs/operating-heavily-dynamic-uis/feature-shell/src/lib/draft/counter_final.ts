import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { CounterState } from '../utils/counter-state.interface';
import { ElementIds } from '../utils/element-id.enum';

@Component({
  selector: 'ohdui-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  elementIds = ElementIds;

  private stateSubject: ReplaySubject<CounterState> = new ReplaySubject<CounterState>(1);
  state$ = this.stateSubject.asObservable();

  @Input()
  set state(c: CounterState) {
    this.stateSubject.next(c);
  }

  @Output()
  btnStart: Subject<Event> = new Subject<Event>();
  @Output()
  btnPause: Subject<Event> = new Subject<Event>();
  @Output()
  btnUp: Subject<Event> = new Subject<Event>();
  @Output()
  btnDown: Subject<Event> = new Subject<Event>();
  @Output()
  btnReset: Subject<Event> = new Subject<Event>();
  @Output()
  btnSetTo: Subject<Event> = new Subject<Event>();
  @Output()
  inputTickSpeed: Subject<Event> = new Subject<Event>();
  @Output()
  inputCountDiff: Subject<Event> = new Subject<Event>();
  @Output()
  inputSetTo: Subject<Event> = new Subject<Event>();

  initialSetToValue$ = this.state$
    .pipe(
      first(),
      map(s => s.count),
    );

  constructor() {

  }

}
