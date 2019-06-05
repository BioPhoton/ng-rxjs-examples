import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { CounterState } from '../../utils/counter-state.interface';
import { ElementIds } from '../../utils/element-id.enum';

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
  btnStart = new Subject<Event>();
  @Output()
  btnPause = new Subject<Event>();
  @Output()
  btnUp = new Subject<Event>();
  @Output()
  btnDown = new Subject<Event>();
  @Output()
  btnReset = new Subject<Event>();
  @Output()
  btnSetTo = new Subject<Event>();
  @Output()
  inputTickSpeed = new Subject<Event>();
  @Output()
  inputCountDiff = new Subject<Event>();
  @Output()
  inputSetTo = new Subject<Event>();

  initialSetToValue$ = this.state$
    .pipe(
      first(),
      map(s => s.count),
    );

  constructor() {

  }

}
