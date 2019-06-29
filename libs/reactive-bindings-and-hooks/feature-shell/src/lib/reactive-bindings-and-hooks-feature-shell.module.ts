import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BindingExamplesComponent } from './binding-examples/binding-examples.component';
import { FormsOutputBindingsComponent } from './binding-examples/components/forms-output-bindings/forms-output-bindings.component';
import { ProxyInputBindingsComponent } from './binding-examples/components/proxy-input-bindings/proxy-input-bindings.component';
import { SubjectHookComponent } from './binding-examples/components/subject-hook/subject-hook.component';
import { SubjectOutputBindingsComponent } from './binding-examples/components/subject-output-bindings/subject-output-bindings.component';
import { VanillaInputBindingsComponent } from './binding-examples/components/vanilla-input-bindings/vanilla-input-bindings.component';
import { FormsOutputBindingsContainerComponent } from './binding-examples/containers/forms-output-bindings-container/forms-output-bindings-container.component';
import { ProxyInputBindingsContainerComponent } from './binding-examples/containers/proxy-input-bindings-container/proxy-input-bindings-container.component';
import { SubjectHookContainerComponent } from './binding-examples/containers/subject-hook-container/subject-hook-container.component';
import { SubjectOutputBindingsContainerComponent } from './binding-examples/containers/subject-output-bindings-container/subject-output-bindings-container.component';
import { VanillaInputBindingsContainerComponent } from './binding-examples/containers/vanilla-input-bindings-container/vanilla-input-bindings-container.component';

export const FEATURE_ROUTES: Routes = [
  { path: '', redirectTo: 'examples', pathMatch: 'full' },
  {
    path: 'examples',
    component: BindingExamplesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'vanilla-input-bindings'
      },
      {
        path: 'vanilla-input-bindings',
        component: VanillaInputBindingsContainerComponent
      },
      {
        path: 'proxy-input-bindings',
        component: ProxyInputBindingsContainerComponent
      },
      {
        path: 'subject-output-bindings',
        component: SubjectOutputBindingsContainerComponent
      },
      {
        path: 'forms-output-bindings',
        component: FormsOutputBindingsContainerComponent
      },
      {
        path: 'subject-hooks',
        component: SubjectHookContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(FEATURE_ROUTES)
  ],
  declarations: [
    BindingExamplesComponent,
    VanillaInputBindingsContainerComponent,
    VanillaInputBindingsComponent,
    ProxyInputBindingsContainerComponent,
    ProxyInputBindingsComponent,
    SubjectOutputBindingsContainerComponent,
    SubjectOutputBindingsComponent,
    FormsOutputBindingsContainerComponent,
    FormsOutputBindingsComponent,
    SubjectHookContainerComponent,
    SubjectHookComponent
  ]
})
export class ReactiveBindingsAndHooksFeatureShellModule {
}
