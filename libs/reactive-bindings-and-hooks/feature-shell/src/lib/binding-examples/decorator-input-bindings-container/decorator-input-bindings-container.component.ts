import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rbah-decorator-input-bindings-container',
  templateUrl: './decorator-input-bindings-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecoratorInputBindingsContainerComponent implements OnInit {

  singleSelection$ = interval(1000)
    .pipe(
      map(v => ({
        state: v,
        config: ['a', 'b', 'c']
      }))
    );

  constructor() {
  }

  ngOnInit() {
  }

}
