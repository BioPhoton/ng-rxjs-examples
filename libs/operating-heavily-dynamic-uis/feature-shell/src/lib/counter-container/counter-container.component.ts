import { Component } from '@angular/core';
import { CounterFacade } from '../counter.facade';
import { getInputValue } from '../utils/getInputValue';

@Component({
  selector: 'ohdui-counter-container',
  templateUrl: './counter-container.component.html'
})
export class CounterContainerComponent {

  getInputValue = getInputValue;

  constructor(public facade: CounterFacade) {
  }

}
