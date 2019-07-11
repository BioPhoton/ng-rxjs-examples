import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap
} from 'rxjs/operators';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';

@Component({
  selector: 'rbah-forms-output-bindings',
  template: `
    <h2>Forms output binding component</h2>
    <div>
      <form
        *ngIf="(formGroup$ | async) as form"
        [formGroup]="form">
        <label>State: {{state$ | async}}</label>
        <br/>
        <label [for]="option"
          *ngFor="let option of config$ | async">
          {{option}}
          <input
            [id]="option"
            type="radio"
            formControlName="state"
            [value]="option"
          >
        </label>

      </form>
    </div>
  `,
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
