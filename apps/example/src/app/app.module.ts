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
            () => import('@rxjs-examples/polling/feature-shell').then(m => m.PollingFeatureShellModule)
        },
        {
          path: 'interactive-uis',
          loadChildren:
            () => import('@rxjs-examples/operating-heavily-dynamic-uis/feature-shell').then(m => m.OperatingHeavilyDynamicUisFeatureShellModule)
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
