import { SharedCoreModule } from '@@rxjs-examples/shared/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { CounterContainerComponent } from './counter-container/counter-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedCoreModule,
    RouterModule.forChild([
       {path: '', pathMatch: 'full', component: CounterContainerComponent}
    ])
  ],
  declarations: [CounterComponent, CounterContainerComponent]
})
export class OperatingHeavilyDynamicUisFeatureShellModule {}
