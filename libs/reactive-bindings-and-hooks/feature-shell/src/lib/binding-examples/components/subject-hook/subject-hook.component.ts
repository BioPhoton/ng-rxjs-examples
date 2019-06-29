import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { interval, merge, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'rbah-subject-hook',
  templateUrl: './subject-hook.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectHookComponent implements OnDestroy {

  onDestroySubject = new Subject<boolean>();
  onDestroy$ = this.onDestroySubject.asObservable();

  currentTick = 0;

  tick$ = interval(1000)
    .pipe(
      tap(console.log)
    );

  constructor() {
    merge(
      this.tick$.pipe(
        tap(nextTick => this.currentTick = nextTick)
      )
    )
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroySubject.next(true);
  }

}
