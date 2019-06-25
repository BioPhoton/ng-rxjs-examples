import { ChangeDetectionStrategy, Component } from '@angular/core';

import { combineLatest, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { filter, getColorMap, sort } from '../utils';
import { getLayouts } from './layouts';
import { PresentationFacade } from './presentation-facade.service';

@Component({
  selector: 'presentation-container',
  templateUrl: './presentation-container.component.html',
  styleUrls: ['./presentation-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationContainerComponent {

  // COMMANDS
  command$ = this.facade.command$;

  // QUERIES
  sortOptions$ = this.facade.data$.pipe(map(a => Object.keys(a[0])));
  colorMap$ = this.facade.data$.pipe(map(getColorMap));
  layoutOptions$ = of(getLayouts()).pipe(shareReplay(1));

  // INTERMEDIATE
  selectedData$ = combineLatest(
    this.facade.data$,
    this.facade.sortConfig$,
    this.facade.filterConfig$
  )
    .pipe(
      map(([data, sortConfig, filterConfig]) => {
        // filter
        const dataFiltered = filter(data, filterConfig);
        // group
        const groupedData = dataFiltered;
        // sort
        return sort(sortConfig, groupedData);
      })
    );

  // OUTPUT
  sortSelectionState$ = combineLatest(this.facade.sortConfig$, this.sortOptions$)
    .pipe(
      map(([sortConfig, sortOptions]) => ({ sortConfig, sortOptions }))
    );

  layoutSelectionState$ = combineLatest(this.facade.layoutConfig$, this.layoutOptions$)
    .pipe(
      map(([layoutConfig, layoutOptions]) => ({ layoutConfig, layoutOptions }))
    );

  filterSelectionState$ = combineLatest(this.facade.filterConfig$, of(['name', 'michael', 'cedric', 'oldSchool']))
    .pipe(
      map(([filterConfig, filterOptions]) => ({ filterConfig, filterOptions }))
    );

  itemViewState$ = combineLatest(
    this.facade.layoutConfig$,
    this.selectedData$,
    this.facade.sortConfig$,
    this.colorMap$)
    .pipe(
      map(
        ([layoutConfig, data, sortConfig, colorMap]) =>
          ({ layoutConfig, data, sortConfig, colorMap })
      )
    );

  constructor(private facade: PresentationFacade) {
  }

}
