import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { defer, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';
import { observe } from './observe';

@Component({
  selector: 'rbah-proxy-input-bindings',
  templateUrl: './proxy-input-bindings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProxyInputBindingsComponent {


  @Input()
  singleSelectionState: SingleSelectionState;
  singleSelectionState$: Observable<SingleSelectionState>;

  @Output() stateChange = new EventEmitter<string>();

  // =============

  state$ = defer(() => this.singleSelectionState$
    .pipe(
      map(v => v.state),
      distinctUntilChanged()
    )
  );

  config$ = defer(() => this.singleSelectionState$
    .pipe(
      map(v => v.config),
      distinctUntilChanged()
    )
  );

  constructor() {
    const { proxy, singleSelectionState } = observe<ProxyInputBindingsComponent, SingleSelectionState>(this, 'singleSelectionState');
    this.singleSelectionState$ = singleSelectionState;
    return proxy;
  }

}
