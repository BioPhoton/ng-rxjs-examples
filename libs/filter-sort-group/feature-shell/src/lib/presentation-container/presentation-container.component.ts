import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { combineLatest, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { filter, getColorMap, sort } from '../utils';
import { getLayouts } from './layouts';
import { PresentationFacade } from './presentation-facade.service';

@Component({
  selector: 'presentation-container',
  templateUrl: './presentation-container.component.html',
  styleUrls: ['./presentation-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PresentationFacade
  ]
})
export class PresentationContainerComponent {

  // COMMANDS
  command$ = this.facade.command$;

  // QUERIES

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
  sortSelectionState$ = combineLatest(this.facade.sortConfig$, this.facade.sortOptions$)
    .pipe(
      map(([sortConfig, sortOptions]) => ({ sortConfig, sortOptions }))
    );

  layoutSelectionState$ = combineLatest(this.facade.layoutConfig$, this.facade.layoutOptions$)
    .pipe(
      map(([layoutConfig, layoutOptions]) => ({ layoutConfig, layoutOptions }))
    );

  filterSelectionState$ = combineLatest(this.facade.filterConfig$, this.facade.filterOptions$)
    .pipe(
      map(([filterConfig, filterOptions]) => ({ filterConfig, filterOptions }))
    );

  itemViewState$ = combineLatest(
    this.facade.layoutConfig$,
    this.selectedData$,
    this.facade.sortConfig$,
    this.facade.colorMap$)
    .pipe(
      map(
        ([layoutConfig, data, sortConfig, colorMap]) =>
          ({ layoutConfig, data, sortConfig, colorMap })
      )
    );

  constructor(private facade: PresentationFacade,
              private route: ActivatedRoute,
              private router: Router) {
  }

}
