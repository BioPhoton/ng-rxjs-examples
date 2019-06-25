import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { isNotUndefined, selectDistinctState } from '@ng-rx/shared/core';
import { ReplaySubject } from 'rxjs';
import { LayoutConfig } from './layout-config.interface';
import { LayoutSelectionState } from './layout-selection-state.interface';

@Component({
  selector: 'layout-selection',
  templateUrl: './layout-selection.component.html',
  styleUrls: ['./layout-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSelectionComponent {

  stateSubject = new ReplaySubject<LayoutSelectionState>(1);

  @Input() set state(state) {
    this.stateSubject.next(state);
  }

  @Output() stateChanged = new EventEmitter<LayoutConfig>();

  layoutConfig$ = this.stateSubject.pipe(
    selectDistinctState<LayoutConfig>('layoutConfig'),
    isNotUndefined()
  );
  layoutOptions$ = this.stateSubject.pipe(
    selectDistinctState<string[]>('layoutOptions'),
    isNotUndefined()
  );

  constructor() {

  }

}
