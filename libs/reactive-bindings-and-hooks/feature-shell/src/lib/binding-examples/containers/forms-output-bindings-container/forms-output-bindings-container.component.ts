import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';

@Component({
  selector: 'rbah-forms-output-bindings-container',
  templateUrl: './forms-output-bindings-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsOutputBindingsContainerComponent {

  formsOutputState: SingleSelectionState = {
    state: 'option2',
    config: ['option1', 'option2', 'option3']
  };

  constructor() { }

  onStateChange(state) {
    console.log('state', state);
    this.formsOutputState = {
      ...this.formsOutputState,
      state
    };
  }

}
