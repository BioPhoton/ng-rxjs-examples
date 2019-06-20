import { Component, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'exp-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor() {
  }

}
