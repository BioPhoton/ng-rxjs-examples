import { Component } from '@angular/core';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';

@Component({
  selector: 'rbah-vanilla-input-bindings-container',
  templateUrl: './vanilla-input-bindings-container.component.html'
})
export class VanillaInputBindingsContainerComponent {

  vanillaInputState: SingleSelectionState = {
    state: 'option1',
    config: ['option1', 'option2', 'option3']
  };

  constructor() { }

  onStateChange(state) {
    this.vanillaInputState = {
      ...this.vanillaInputState,
      state
    };
  }

}
