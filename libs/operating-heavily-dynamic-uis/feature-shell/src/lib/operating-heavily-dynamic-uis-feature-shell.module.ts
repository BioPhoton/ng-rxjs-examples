import { SharedCoreModule } from '@@rxjs-examples/shared/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CounterContainerWithFacadeComponent } from './counter-examples/counter-container-with-facade/counter-container-with-facade.component';
import { CounterWithFacadeComponent } from './counter-examples/counter-container-with-facade/counter-with-facade/counter-with-facade.component';
import { CounterContainerComponent } from './counter-examples/counter-container/counter-container.component';
import { CounterComponent } from './counter-examples/counter-container/counter/counter.component';
import { CounterExamplesComponent } from './counter-examples/counter-examples.component';
import { CounterPlainComponent } from './counter-examples/counter-plain/counter-plain.component';
import { CounterWithMicroArchitectureComponent } from './counter-examples/counter-with-micro-architecture/counter-with-micro-architecture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedCoreModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'examples', pathMatch: 'full'},
      {
        path: 'examples',
        component: CounterExamplesComponent,
        children: [
          {path: '', redirectTo: 'plain', pathMatch: 'full'},
          {path: 'plain', component: CounterPlainComponent},
          {path: 'container', component: CounterContainerComponent},
          {path: 'container-and-facade', component: CounterContainerWithFacadeComponent}
        ]
      }
    ])
  ],
  declarations: [
    CounterExamplesComponent,
    CounterPlainComponent,
    CounterWithMicroArchitectureComponent,
    CounterComponent, CounterContainerComponent,
    CounterWithFacadeComponent, CounterContainerWithFacadeComponent
  ]
})
export class OperatingHeavilyDynamicUisFeatureShellModule {
}
