import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { CounterState } from '../counter-state.interface';
import { ElementIds } from '../element-id.enum';
import { getInputValue } from '../operators/getInputValue';

@Component({
  selector: 'ohdui-counter3',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  public elementIds = ElementIds;

  public btnStartSubject: Subject<Event> = new Subject<Event>();
  public btnStart$ = this.btnStartSubject.asObservable();

  public btnPauseSubject: Subject<Event> = new Subject<Event>();
  public btnPause$ = this.btnPauseSubject.asObservable();

  public btnUpSubject: Subject<Event> = new Subject<Event>();
  private btnUp$ = this.btnUpSubject.asObservable();

  public btnDownSubject: Subject<Event> = new Subject<Event>();
  private btnDown$ = this.btnDownSubject.asObservable();

  public btnResetSubject: Subject<Event> = new Subject<Event>();
  private btnReset$ = this.btnResetSubject.asObservable();

  public btnSetToSubject: Subject<Event> = new Subject<Event>();
  public btnSetTo$ = this.btnSetToSubject.asObservable();

  public inputTickSpeedSubject: Subject<Event> = new Subject<Event>();
  private inputTickSpeed$ = this.inputTickSpeedSubject.asObservable()
    .pipe(getInputValue);

  public inputCountDiffSubject: Subject<Event> = new Subject<Event>();
  private inputCountDiff$ = this.inputCountDiffSubject.asObservable()
    .pipe(getInputValue);

  public inputSetToSubject: Subject<Event> = new Subject<Event>();
  private inputSetTo$ = this.inputSetToSubject.asObservable()
    .pipe(getInputValue);

  private stateSubject: Subject<CounterState> = new Subject<CounterState>();
  public state$ = this.stateSubject.asObservable()
    .pipe(shareReplay(1));
  @Input() set state(c: CounterState) {
    this.stateSubject.next(c);
  }

  constructor() {

  }

  ngOnInit() {

  }

}
