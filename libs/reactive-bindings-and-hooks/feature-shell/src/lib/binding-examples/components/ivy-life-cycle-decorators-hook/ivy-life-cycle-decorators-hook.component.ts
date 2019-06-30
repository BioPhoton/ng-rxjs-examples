import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rbah-ivy-life-cycle-decorators-hook',
  templateUrl: './ivy-life-cycle-decorators-hook.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IvyLifeCycleDecoratorsHookComponent {

  constructor() {
  }

}
