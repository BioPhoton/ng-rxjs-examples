import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';

@Component({
  selector: 'vanilla-input-bindings',
  templateUrl: './vanilla-input-bindings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VanillaInputBindingsComponent {

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
