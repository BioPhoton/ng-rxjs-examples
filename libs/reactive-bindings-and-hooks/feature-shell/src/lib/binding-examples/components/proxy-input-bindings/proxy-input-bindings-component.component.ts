import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input, Output, EventEmitter
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';

@Component({
  selector: 'examples',
  templateUrl: './proxy-input-bindings-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProxyInputBindingsComponentComponent {


  singleSelectionStateSubject = new ReplaySubject<SingleSelectionState>();
  @Input()
  set singleSelectionState (singleSelectionState) {
    this.singleSelectionStateSubject.next(singleSelectionState)
  };
  vanillaInputBindingsState$ = this.singleSelectionStateSubject.asObservable();

  @Output() stateChange = new EventEmitter<string>();

  // =============

  state$ = this.vanillaInputBindingsState$
    .pipe(
      map(v => v.state),
      distinctUntilChanged()
    );

  config$ = this.vanillaInputBindingsState$
    .pipe(
      map(v => v.config),
      distinctUntilChanged()
    )

}
