import {
  ChangeDetectionStrategy,
  Component,
  SimpleChanges
} from '@angular/core';
import { LifeCycleHook } from '@se-ng/ivy-life-cycle-decorators';
import { interval, Observable } from 'rxjs';
import {
  mergeMapTo,
  switchMap,
  switchMapTo,
  takeUntil,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'rbah-ivy-life-cycle-decorators-hook',
  templateUrl: './ivy-life-cycle-decorators-hook.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IvyLifeCycleDecoratorsHookComponent {

  @LifeCycleHook('doCheck') doCheck$: Observable<void>;
  @LifeCycleHook('onChanges') onChanges$: Observable<SimpleChanges>;
  @LifeCycleHook('onInit') onInit$: Observable<void>;
  @LifeCycleHook('afterContentChecked') afterContentChecked$: Observable<void>;
  @LifeCycleHook('afterContentInit') afterContentInit$: Observable<void>;
  @LifeCycleHook('afterViewInit') afterViewInit$: Observable<void>;
  @LifeCycleHook('onDestroy') onDestroy$: Observable<void>;

  constructor() {

    // this.doCheck$.subscribe(v => console.log('doCheck$', v));
    // this.onChanges$.subscribe(v => console.log('onChanges$', v));
    // this.onInit$.subscribe(v => console.log('onInit$', v));
    // this.afterContentChecked$.subscribe(v => console.log('afterContentChecked$', v));
    // this.afterContentInit$.subscribe(v => console.log('afterContentInit$', v));
    // this.afterViewInit$.subscribe(v => console.log('afterViewInit$', v));
    // this.onDestroy$.subscribe(v => console.log('onDestroy$', v));

    this.onInit$
      .pipe(
        switchMapTo(
          interval(1000)
            .pipe(
              tap(v => console.log('internal process', v)),
              takeUntil(this.onDestroy$)
            )
        )
      )
    //  .subscribe(console.log);
  }

}
