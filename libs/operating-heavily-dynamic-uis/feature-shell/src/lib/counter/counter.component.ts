import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CounterState } from '../counter-state.interface';
import { ElementIds } from '../element-id.enum';

@Component({
  selector: 'ohdui-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  public elementIds = ElementIds;

  private stateSubject: Subject<CounterState> = new Subject<CounterState>();
  public state$: Observable<CounterState> = this.stateSubject.asObservable()
    .pipe(shareReplay(1));

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
      // first(),
      map(s => s.count)
    );


  constructor() {

  }

  ngOnInit() {
    this.state$.subscribe(c => console.log('new state', c))
  }

  // ==============================================================

  getInputValue(event: HTMLInputElement): number {
    return parseInt(event.target.value, 10)
  };

}
