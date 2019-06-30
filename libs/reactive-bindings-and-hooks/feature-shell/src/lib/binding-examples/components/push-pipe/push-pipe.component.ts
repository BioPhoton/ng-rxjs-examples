import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rbah-push-pipe',
  template: `
    <div>
      value over input: {{value | json}}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PushPipeComponent {

  @Input() value;

}
