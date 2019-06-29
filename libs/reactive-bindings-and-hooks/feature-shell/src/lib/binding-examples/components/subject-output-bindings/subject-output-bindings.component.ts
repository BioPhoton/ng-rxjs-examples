import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';

@Component({
  selector: 'rbah-subject-output-bindings',
  templateUrl: './subject-output-bindings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectOutputBindingsComponent {


  singleSelectionStateSubject = new ReplaySubject<SingleSelectionState>(1);

  @Input()
  set singleSelectionState(singleSelectionState) {
    this.singleSelectionStateSubject.next(singleSelectionState);
  };
  subjectOutputBindingsState$ = this.singleSelectionStateSubject.asObservable();

  @Output() stateChange = new Subject<string>();

  // =============

  state$ = this.subjectOutputBindingsState$
    .pipe(
      map(v => v.state),
      distinctUntilChanged()
    );

  config$ = this.subjectOutputBindingsState$
    .pipe(
      map(v => v.config),
      distinctUntilChanged()
    );

}
