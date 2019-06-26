import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { isNotUndefined, selectDistinctState } from '@ng-rx/shared/core';
import { defer, Observable, ReplaySubject } from 'rxjs';
import { observe } from '../../utils';
import { LayoutConfig } from './layout-config.interface';
import { LayoutSelectionState } from './layout-selection-state.interface';

@Component({
  selector: 'layout-selection',
  templateUrl: './layout-selection.component.html',
  styleUrls: ['./layout-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSelectionComponent {

  @Input()state;
  state$: Observable<LayoutSelectionState>

  @Output() stateChanged = new EventEmitter<LayoutConfig>();

  layoutConfig$ = defer(() => this.state$
    .pipe(
      selectDistinctState<LayoutConfig>('layoutConfig'),
      isNotUndefined()
    )
  );
  layoutOptions$ = defer(() => this.state$
    .pipe(
      selectDistinctState<string[]>('layoutOptions'),
      isNotUndefined()
    )
  );

  constructor() {
    const { state , proxy } = observe<LayoutSelectionState>(this, 'state', new ReplaySubject<LayoutSelectionState>(1));
    this.state$ = state;
    return proxy;
  }

}
