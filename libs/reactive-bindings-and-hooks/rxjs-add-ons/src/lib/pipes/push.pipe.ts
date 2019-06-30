import {
  ChangeDetectorRef,
  Injectable,
  OnDestroy,
  Pipe,
  PipeTransform
} from '@angular/core';
import { detectChanges } from '../rxjs/operators/detectChanges';
import { EMPTY, isObservable, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  switchAll,
  takeUntil,
  tap
} from 'rxjs/operators';

/**
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `async` pipe subscribes to an `Observable` and returns the latest value it has
 * emitted. When a new value is emitted, the `push` pipe detets change in the component.
 * When the component gets destroyed, the `push` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 */
@Injectable(
  // { providedIn: 'root' }
)
@Pipe({ name: 'push', pure: false })
export class PushPipe implements PipeTransform, OnDestroy {
  private value: any = null;
  private _currentObs: Observable<any> | null = null;

  ngOnDestroy$ = new Subject();
  observablesToSubscribe$ = new Subject<Observable<any>>();

  handleChangesSideEffect$ = this.observablesToSubscribe$.pipe(
    // trigger change detection for new observables
    detectChanges(this._cdRef),
    // unsubscribe from previous observables
    // then and flatten all internal observables
    switchAll(),
    // assign value
    tap(v => this.value = v),
    // trigger change detection for distinct values
    detectChanges(this._cdRef),
    takeUntil(this.ngOnDestroy$)
  );

  constructor(private _cdRef: ChangeDetectorRef) {
    this.handleChangesSideEffect$
      .pipe(
        takeUntil(this.ngOnDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  transform<T>(obs: null, onPush: boolean): null;
  transform<T>(obs: undefined, onPush?: boolean): null;
  transform<T>(obs: Observable<T> | null | undefined, onPush?: boolean): T | null;
  transform(obs: Observable<any> | null | undefined, onPush?: boolean): any {
    onPush = onPush === undefined ? true : !!onPush;

    if (!isObservable(obs)) {
      this._currentObs = EMPTY;
      this.observablesToSubscribe$.next(EMPTY);
      this.value = null;
    } else {
      if (this._currentObs !== obs) {
        this._currentObs = obs;
        // if onPush === true then check if value is referentially equal to previous
        const distinctObs = onPush ? obs.pipe(distinctUntilChanged()) : obs;
        this.observablesToSubscribe$.next(distinctObs);
      }
    }

    return this.value;
  }
}
