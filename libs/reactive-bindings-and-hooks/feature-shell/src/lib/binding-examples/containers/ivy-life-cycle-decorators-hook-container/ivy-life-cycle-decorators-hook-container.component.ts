import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rbah-ivy-life-cycle-decorators-hook-container',
  templateUrl: './ivy-life-cycle-decorators-hook-container.component.html',
})
export class IvyLifeCycleDecoratorsHookContainerComponent {

  @LifeCycleHook('onDestroy') destroy$: Observable<void>;

  constructor() { }

}
