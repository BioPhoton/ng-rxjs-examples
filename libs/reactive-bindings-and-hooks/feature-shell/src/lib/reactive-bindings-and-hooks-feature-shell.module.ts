import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RxJSAddOnsModule } from '@nx-v8/reactive-bindings-and-hooks/rxjs-add-ons';
import { BindingExamplesComponent } from './binding-examples/binding-examples.component';
import { DecoratorInputBindingsContainerComponent } from './binding-examples/decorator-input-bindings-container/decorator-input-bindings-container.component';
import { DecoratorInputBindingsComponent } from './binding-examples/decorator-input-bindings-container/decorator-input-bindings/decorator-input-bindings.component';
import { FormsOutputBindingsContainerComponent } from './binding-examples/forms-output-bindings-container/forms-output-bindings-container.component';
import { FormsOutputBindingsComponent } from './binding-examples/forms-output-bindings-container/forms-output-bindings/forms-output-bindings.component';
import { IvyLifeCycleDecoratorsHookContainerComponent } from './binding-examples/ivy-life-cycle-decorators-hook-container/ivy-life-cycle-decorators-hook-container.component';
import { IvyLifeCycleDecoratorsHookComponent } from './binding-examples/ivy-life-cycle-decorators-hook-container/ivy-life-cycle-decorators-hook/ivy-life-cycle-decorators-hook.component';
import { ProxyInputBindingsContainerComponent } from './binding-examples/proxy-input-bindings-container/proxy-input-bindings-container.component';
import { ProxyInputBindingsComponent } from './binding-examples/proxy-input-bindings-container/proxy-input-bindings/proxy-input-bindings.component';
import { PushPipeContainerComponent } from './binding-examples/push-pipe-container/push-pipe-container.component';
import { PushPipeComponent } from './binding-examples/push-pipe-container/push-pipe/push-pipe.component';
import { SubjectHookContainerComponent } from './binding-examples/subject-hook-container/subject-hook-container.component';
import { SubjectHookComponent } from './binding-examples/subject-hook-container/subject-hook/subject-hook.component';
import { SubjectOutputBindingsContainerComponent } from './binding-examples/subject-output-bindings-container/subject-output-bindings-container.component';
import { SubjectOutputBindingsComponent } from './binding-examples/subject-output-bindings-container/subject-output-bindings/subject-output-bindings.component';
import { VanillaInputBindingsContainerComponent } from './binding-examples/vanilla-input-bindings-container/vanilla-input-bindings-container.component';
import { VanillaInputBindingsComponent } from './binding-examples/vanilla-input-bindings-container/vanilla-input-bindings/vanilla-input-bindings.component';

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
      },
      {
        path: 'push-pipe',
        component: PushPipeContainerComponent
      },
      {
        path: 'ivy-life-cycle-hooks',
        component: IvyLifeCycleDecoratorsHookContainerComponent
      },
      {
        path: 'decorator-input-bindings',
        component: DecoratorInputBindingsContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxJSAddOnsModule,
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
    SubjectHookComponent,
    IvyLifeCycleDecoratorsHookContainerComponent,
    IvyLifeCycleDecoratorsHookComponent,
    PushPipeContainerComponent,
    PushPipeComponent,
    DecoratorInputBindingsContainerComponent,
    DecoratorInputBindingsComponent
  ]
})
export class ReactiveBindingsAndHooksFeatureShellModule {
}
