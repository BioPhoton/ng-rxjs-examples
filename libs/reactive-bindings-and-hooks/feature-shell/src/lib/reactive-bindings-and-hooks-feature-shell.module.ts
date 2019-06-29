import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BindingExamplesComponent } from './binding-examples/binding-examples.component';
import { VanillaInputBindingsComponent } from './binding-examples/components/vanilla-input-bindings/vanilla-input-bindings.component';
import { VanillaInputBindingsContainerComponent } from './binding-examples/containers/vanilla-input-bindings-container/vanilla-input-bindings-container.component';
import { ProxyInputBindingsContainerComponent } from './binding-examples/containers/proxy-input-bindings-container/proxy-input-bindings-container.component';
import { ProxyInputBindingsComponentComponent } from './binding-examples/components/proxy-input-bindings/proxy-input-bindings-component.component';

export const FEATURE_ROUTES: Routes = [
  { path: '', redirectTo: 'examples', pathMatch: 'full' },
  {
    path: 'examples',
    component: BindingExamplesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'vanilla-input-bindings-container'
      },
      {
        path: 'vanilla-input-bindings-container',
        component: VanillaInputBindingsContainerComponent
      },
      {
        path: 'proxy-input-bindings-container',
        component: ProxyInputBindingsContainerComponent
      },
      {
        path: 'vanilla-output-bindings',
        component: VanillaInputBindingsComponent
      },
      {
        path: 'vanilla-output-bindings-forms',
        component: VanillaInputBindingsComponent
      },
      {
        path: 'vanilla-output-bindings-observables',
        component: VanillaInputBindingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(FEATURE_ROUTES)
  ],
  declarations: [BindingExamplesComponent, VanillaInputBindingsComponent, VanillaInputBindingsContainerComponent, ProxyInputBindingsContainerComponent, ProxyInputBindingsComponentComponent]
})
export class ReactiveBindingsAndHooksFeatureShellModule {
}
