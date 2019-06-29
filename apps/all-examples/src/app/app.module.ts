import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'interactive-uis',
          pathMatch: 'full'
        },
        {
          path: 'polling',
          loadChildren:
            () => import('@ng-rx/polling/feature-shell').then(m => m.PollingFeatureShellModule)
        },
        {
          path: 'interactive-uis',
          loadChildren:
            () => import('@ng-rx/operating-heavily-dynamic-uis/feature-shell').then(m => m.OperatingHeavilyDynamicUisFeatureShellModule)
        },
        {
          path: 'subjects',
          loadChildren:
            () => import('@ng-rx/subjects/feature-shell').then(m => m.SubjectsFeatureShellModule)
        },
        {
          path: 'reactive-bindings',
          loadChildren:
            () => import('@ng-rx/reactive-bindings-and-hooks/feature-shell').then(m => m.ReactiveBindingsAndHooksFeatureShellModule)
        }
      ],
      {
        initialNavigation: 'enabled',
        useHash: true
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
