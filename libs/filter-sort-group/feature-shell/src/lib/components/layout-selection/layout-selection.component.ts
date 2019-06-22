import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { selectDistinctState } from '@ng-rx/shared/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Layout } from '../../layout.interface';
import {
  LayoutConfig,
  LayoutSelectionState
} from './layout-selection-state.interface';

@Component({
  selector: 'layout-selection',
  templateUrl: './layout-selection.component.html',
  styleUrls: ['./layout-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSelectionComponent {
  ngOnDestroy$ = new Subject<boolean>();

  // BINDINGS
  stateSubject = new ReplaySubject<LayoutSelectionState>(1);
  @Input() set state(state) {
    this.stateSubject.next(state);
  }
  state$ = this.stateSubject.asObservable();

  @Output() layoutConfigChange = new EventEmitter<LayoutConfig>();

  // STATE
  layoutConfig$ = this.state$.pipe(selectDistinctState('layoutConfig'));
  layoutOptions$ = this.state$.pipe(selectDistinctState('layoutOptions'));

  constructor() {

  }

  layoutSelection(l: {key: string, value: Layout}) {
   this.layoutConfigChange.emit({[l.key]: l.value})
  }

}
