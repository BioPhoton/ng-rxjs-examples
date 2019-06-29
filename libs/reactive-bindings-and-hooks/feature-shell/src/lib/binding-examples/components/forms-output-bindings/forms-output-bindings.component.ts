import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input, Output, EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { defer, Observable, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  share, shareReplay,
  switchMap,
  tap
} from 'rxjs/operators';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';

@Component({
  selector: 'rbah-forms-output-bindings',
  templateUrl: './forms-output-bindings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsOutputBindingsComponent {
  singleSelectionStateSubject = new ReplaySubject<SingleSelectionState>(1);
  @Input()
  set singleSelectionState (singleSelectionState) {
    this.singleSelectionStateSubject.next(singleSelectionState)
  };
  singleSelectionState$ = this.singleSelectionStateSubject.asObservable();

  formGroup$: Observable<FormGroup> = this.singleSelectionState$
    .pipe(
      map(({state}) => this.fb.group({
        state: [state]
      })),
      // we want a single instance fo formGroup for all subscribers
      shareReplay(1)
    );


  @Output() stateChange = this.formGroup$
    .pipe(
      switchMap(fromGroup => fromGroup.get('state').valueChanges)
    );

  // =============

  state$ = this.singleSelectionState$
    .pipe(
      map(v => v.state),
      distinctUntilChanged()
    );

  config$ = this.singleSelectionState$
    .pipe(
      map(v => v.config),
      distinctUntilChanged()
    )

  constructor(private fb: FormBuilder) {

  }

}
