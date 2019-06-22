import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { ItemViewComponent } from './components/item-view/item-view.component';
import { SortPanelComponent } from './components/sort-panel/sort-panel.component';
import { PresentationContainerComponent } from './presentation-container/presentation-container.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: PresentationContainerComponent }
    ])
  ],
  declarations: [
    ItemViewComponent,
    SortPanelComponent,
    FilterPanelComponent,
    PresentationContainerComponent
  ]
})
export class FilterSortGroupFeatureShellModule {
}
