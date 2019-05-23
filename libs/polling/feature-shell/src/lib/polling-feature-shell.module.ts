import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PollingMenuComponent } from './polling-menu/polling-menu.component';
import { SimpleComponent } from './simple/simple.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PollingMenuComponent,
        children: [
          {
            path: 'simple-polling',
            component: SimpleComponent
          }
        ]
      },
    ])
  ],
  declarations: [PollingMenuComponent, SimpleComponent]
})
export class PollingFeatureShellModule {

}
