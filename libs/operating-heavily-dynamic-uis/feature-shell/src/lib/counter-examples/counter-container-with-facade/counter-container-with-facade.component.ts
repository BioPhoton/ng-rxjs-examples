import { Component } from '@angular/core';
import { initialCounterState } from '../initial-counter-state';
import { getInputValue } from '../utils/getInputValue';
import { CounterFacade } from './counter.facade';

@Component({
  selector: 'ohdui-counter-container-with-facade',
  templateUrl: './counter-container-with-facade.component.html'
})
export class CounterContainerWithFacadeComponent {

  readonly initialCounterState = initialCounterState;
  getInputValue = getInputValue;

  constructor(public facade: CounterFacade) {
  }

}
