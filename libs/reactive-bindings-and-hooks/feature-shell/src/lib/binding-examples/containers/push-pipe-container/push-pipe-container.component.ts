import { ChangeDetectionStrategy, Component } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rbah-push-pipe-container',
  template: `
    <div>
      <!--  
      async-pipe: {{primitiveInterval$ | async}}<br>
      primitiveInterval$ | push: {{primitiveInterval$ | push}}<br>
      mutuableInterval$ | push: {{(mutuableInterval$ | push:false)?.value}}<br>
      immutableInterval$ | push: {{(immutableInterval$ | push)?.value}}<br>
     
    -->

      <rbah-push-pipe [value]="immutableInterval$ | push">
      </rbah-push-pipe>
      <!--
                 
            
      -->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PushPipeContainerComponent {

  mutualData = { value: 0 };

  primitiveInterval$ = timer(0, 1000);
  mutuableInterval$ = timer(0, 1000).pipe(
    map(value => {
      this.mutualData.value = value;
      return this.mutualData;
    })
  );
  immutableInterval$ = timer(0, 1000).pipe(
    map(value => ({ value }))
  );

}
