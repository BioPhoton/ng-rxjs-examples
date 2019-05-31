import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { CounterState } from '../counter-state.interface';
import { ElementIds } from '../element-id.enum';

@Component({
  selector: 'ohdui-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  public elementIds = ElementIds;

  private stateSubject: BehaviorSubject<CounterState> = new BehaviorSubject<CounterState>(null);
  public state$: Observable<CounterState> = this.stateSubject.asObservable();

  @Output()
  public btnStart: Subject<Event> = new Subject<Event>();

  @Output()
  public btnPause: Subject<Event> = new Subject<Event>();

  @Output()
  public btnUp: Subject<Event> = new Subject<Event>();

  @Output()
  public btnDown: Subject<Event> = new Subject<Event>();

  @Output()
  public btnReset: Subject<Event> = new Subject<Event>();

  @Output()
  public btnSetTo: Subject<Event> = new Subject<Event>();

  @Output()
  public inputTickSpeed: Subject<Event> = new Subject<Event>();

  @Output()
  public inputCountDiff: Subject<Event> = new Subject<Event>();

  @Output()
  public inputSetTo: Subject<Event> = new Subject<Event>();

  @Input()
  set state(c: CounterState) {
    this.stateSubject.next(c);
  }

  public initialSetToValue$ = this.state$
    .pipe(
      first(),
      map(s => s.count),
      tap(console.log),

    );


  constructor() {

  }

}
