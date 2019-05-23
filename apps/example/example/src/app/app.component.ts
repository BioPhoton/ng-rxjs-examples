import { Component, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'exp-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {

  private ngOnDestroySub = new Subject();
  public ngOnDestroy$ = this.ngOnDestroySub.asObservable();

  constructor() {
    interval()
      .pipe(
        takeUntil(this.ngOnDestroy$)
      )
      .subscribe(
        (n) => {
          console.log('hallo', n);
        }
      );
  }

  ngOnDestroy(): void {
    this.ngOnDestroySub.next('something');
  }

}
