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
          redirectTo: 'polling',
          pathMatch: 'full'
        },
        {
          path: 'polling',
          loadChildren:
            '@@rxjs-examples/polling/feature-shell#PollingFeatureShellModule'
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
