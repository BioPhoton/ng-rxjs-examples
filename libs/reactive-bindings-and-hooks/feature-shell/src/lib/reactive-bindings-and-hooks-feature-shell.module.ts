import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { BindingExamplesComponent } from './binding-examples/binding-examples.component';
import { VanillaInputBindingsComponent } from './components/vanilla-input-bindings/vanilla-input-bindings.component';

export const ROUTES: Routes = [
  {
    path:'vanilla-input-bindings',
    component: VanillaInputBindingsComponent
  },
  {
    path:'vanilla-output-bindings',
    component: VanillaInputBindingsComponent
  },
  {
    path:'vanilla-output-bindings-forms',
    component: VanillaInputBindingsComponent
  },
  {
    path:'vanilla-output-bindings-observables',
    component: VanillaInputBindingsComponent
  }
];

@NgModule({
  imports: [CommonModule],
  declarations: [BindingExamplesComponent, VanillaInputBindingsComponent]
})
export class ReactiveBindingsAndHooksFeatureShellModule {}
