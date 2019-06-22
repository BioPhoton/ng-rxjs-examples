import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { PresentationContainerComponent } from './presentation-container/presentation-container.component';
import { SortPanelComponent } from './sort-panel/sort-panel.component';

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
