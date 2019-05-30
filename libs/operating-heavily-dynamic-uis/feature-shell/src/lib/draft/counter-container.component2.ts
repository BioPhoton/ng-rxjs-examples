import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, defer, merge, NEVER, Observable, timer } from 'rxjs';
import { mapTo, scan, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CounterState } from '../counter-state.interface';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'ohdui-counter-container',
  templateUrl: './counter-container.component.html',
  styleUrls: ['./counter-container.component.scss']
})
export class CounterContainer2Component implements OnInit, AfterViewInit {

  counterState: CounterState = {
    isTicking: false,
    count: 0,
    countUp: true,
    tickSpeed: 200,
    countDiff:1
  };

  counterStateSubject: BehaviorSubject<any> = new BehaviorSubject(this.counterState);
  counterState$: Observable<any> = this.counterStateSubject.asObservable();

  // = BASE OBSERVABLES  ====================================================
  // == SOURCE OBSERVABLES ==================================================
  @ViewChild(CounterComponent)
  counterOutputs: CounterComponent;

  // === STATE OBSERVABLES ==================================================
  // === INTERACTION OBSERVABLES ============================================
  btnSetToClickAsLatestFromInputSetTo$ = defer(() => this.counterOutputs.btnSetTo$
    .pipe(
      withLatestFrom(this.counterOutputs.inputSetTo$, (_, i$) => i$ )
    ));
  // == INTERMEDIATE OBSERVABLES ============================================
  // = SIDE EFFECTS =========================================================
  // == UI COMMANDS ===========================================================
  // == UI EVENTS ==========================================================
  renderCountChangeFromTick$ = defer(() => merge(
    this.counterOutputs.btnStart$.pipe(mapTo(true)),
    this.counterOutputs.btnPause$.pipe(mapTo(false)),
    )
      .pipe(
        switchMap(isTicking => isTicking ? timer(0, this.counterState.tickSpeed): NEVER),
        scan((state) => ++state, 0),
        tap((state: number) => this.counterStateSubject
          .next({ count: state })
        )
      )
  );

  constructor() {

  }

  // == SUBSCRIPTION ========================================================
  initSubscription() {

    merge(
      // Input side effect
       this.renderCountChangeFromTick$
    )
      .subscribe();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.initSubscription();
  }

}
