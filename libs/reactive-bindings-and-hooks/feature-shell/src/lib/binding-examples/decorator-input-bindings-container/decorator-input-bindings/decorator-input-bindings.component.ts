import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit, SimpleChanges
} from '@angular/core';
import { selectChange } from '@nx-v8/reactive-bindings-and-hooks/rxjs-add-ons';
import { LifeCycleHook } from '@se-ng/ivy-life-cycle-decorators';
import { Observable } from 'rxjs';
import { SingleSelectionState } from '../../../interfaces/single-selection-state';

@Component({
  selector: 'rbah-decorator-input-bindings',
  templateUrl: './decorator-input-bindings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecoratorInputBindingsComponent implements OnInit {



  @Input() singleSelection;

  constructor() {

    this.changes$
    //  .subscribe(console.log)

  }

  ngOnInit() {
  }

}
