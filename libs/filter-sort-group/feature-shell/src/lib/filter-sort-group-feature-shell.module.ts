import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterSelectionComponent } from './components/filter-selection/filter-selection.component';
import { ItemViewComponent } from './components/item-view/item-view.component';
import { LayoutSelectionComponent } from './components/layout-selection/layout-selection.component';
import { SortSelectionComponent } from './components/sort-selection/sort-selection.component';
import { PresentationContainerComponent } from './presentation-container/presentation-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: PresentationContainerComponent }
    ])
  ],
  declarations: [
    LayoutSelectionComponent,
    SortSelectionComponent,
    FilterSelectionComponent,
    ItemViewComponent,
    PresentationContainerComponent
  ]
})
export class FilterSortGroupFeatureShellModule {
}
