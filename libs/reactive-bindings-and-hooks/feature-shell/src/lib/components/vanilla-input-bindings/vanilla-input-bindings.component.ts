import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'examples',
  templateUrl: './vanilla-input-bindings.component.html'
})
export class VanillaInputBindingsComponent {

  value: string;
  valueChange = new EventEmitter();

  constructor() {
  }

}
