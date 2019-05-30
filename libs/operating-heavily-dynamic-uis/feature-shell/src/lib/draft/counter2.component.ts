import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, publishReplay, shareReplay } from 'rxjs/operators';
import { CommandNames } from '../command-names.enmu';
import { CounterConfig } from '../counter-config.interface';
import { CounterState } from '../counter-state.interface';
import { ElementIds } from '../element-id.enum';
import { getInputValue } from '../operators/getInputValue';

@Component({
  selector: 'ohdui-counter2',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
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

  private configSubject: Subject<CounterState> = new Subject<CounterState>();
  public config$ = this.configSubject.asObservable()
    .pipe(shareReplay(1));

  @Input() set config(c: CounterState) {
    this.configSubject.next(c);
  }

  constructor() {

  }

  ngOnInit() {

  }


}
