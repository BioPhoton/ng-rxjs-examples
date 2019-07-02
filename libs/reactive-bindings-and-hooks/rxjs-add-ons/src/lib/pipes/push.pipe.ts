import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import { detectChanges } from '../rxjs/operators/detectChanges';
import {combineLatest, isObservable, Observable, of, Subject} from 'rxjs';
import {distinctUntilChanged, map, switchAll, takeUntil, tap} from 'rxjs/operators';

/**
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `push` pipe subscribes to an `Observable` and returns the latest value it has
 * emitted. When a new value is emitted, the `push` pipe detects change in the component.
 * When the component gets destroyed, the `push` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 */
@Pipe({name: 'push', pure: false})
export class PushPipe implements PipeTransform, OnDestroy {
  private value: any = null;

  ngOnDestroy$$ = new Subject<boolean>();

  checkReference$$ = new Subject<boolean>();
  checkReference$ = this.checkReference$$.pipe(
    // only forward distinct values
    distinctUntilChanged()
  );

  // @TODO fix any types
  observablesToSubscribe$$ = new Subject<Observable<any>>();
  observablesToSubscribe$ = this.observablesToSubscribe$$
    .pipe(
      // only forward new references (avoids holding a local reference to the previous observable => this.currentObs !== obs)
      distinctUntilChanged(),
      // trigger change detection for new observables bound in the template
      detectChanges(this.cdRef)
    );

  handleChangesSideEffect$ = combineLatest(
    this.observablesToSubscribe$,
    this.checkReference$
  )
    .pipe(
      // if checkReference is truesy then check if value is referentially equal to previous
      // @TODO fix any types
      map<any, any>(([o$, checkReference]) => checkReference ? o$.pipe(distinctUntilChanged()) : o$),

      // unsubscribe from previous observables
      // then flatten the latest internal observables into the output
      switchAll(),

      // assign value that will get returned from the transform function on the next change detection
      tap(v => this.value = v),

      // trigger change detection for the to get the newly assigned value rendered
      detectChanges(this.cdRef),

      // unsubscribe if component gets destroyed
      takeUntil(this.ngOnDestroy$$)
    );

  constructor(private cdRef: ChangeDetectorRef) {
    this.handleChangesSideEffect$
      .pipe(takeUntil(this.ngOnDestroy$$))
      .subscribe();
  }

  // @TODO Minor improvement: Use observable lifecycle hooks over decorators
  ngOnDestroy(): void {
    this.ngOnDestroy$$.next(true);
  }

  transform<T>(obs: null | undefined, forwardOnlyNewReferences: boolean): null;
  transform<T>(obs: Observable<T>, forwardOnlyNewReferences: boolean): T;
  transform<T>(obs: Observable<T> | null | undefined, forwardOnlyNewReferences = true): T | null {
    this.checkReference$$.next(forwardOnlyNewReferences);
    this.observablesToSubscribe$$.next(!isObservable(obs) ? of(null) : obs);
    return this.value;
  }
}
