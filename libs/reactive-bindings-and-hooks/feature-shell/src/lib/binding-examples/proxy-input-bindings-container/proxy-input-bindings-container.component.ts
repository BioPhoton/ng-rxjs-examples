import { Component } from '@angular/core';
import { SingleSelectionState } from '../../interfaces/single-selection-state';

@Component({
  selector: 'rbah-proxy-input-bindings-container',
  templateUrl: './proxy-input-bindings-container.component.html'
})
export class ProxyInputBindingsContainerComponent {
  proxyInputState: SingleSelectionState = {
    state: 'option1',
    config: ['option1', 'option2', 'option3']
  };

  constructor() {
  }

  onStateChange(state) {
    this.proxyInputState = {
      ...this.proxyInputState,
      state
    };
  }

}
