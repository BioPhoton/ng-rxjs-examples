import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';

@Component({
  selector: 'rbah-subject-output-bindings-container',
  templateUrl: './subject-output-bindings-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectOutputBindingsContainerComponent {
  subjectOutputState: SingleSelectionState = {
    state: 'option1',
    config: ['option1', 'option2', 'option3']
  };

  constructor() { }

  onStateChange(state) {
    this.subjectOutputState = {
      ...this.subjectOutputState,
      state
    };
  }

}
