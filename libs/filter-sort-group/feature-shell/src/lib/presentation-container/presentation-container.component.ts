import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter, getColorMap, sort } from '../utils';
import { PresentationFacade } from './presentation-facade.service';

@Component({
  selector: 'presentation-container',
  templateUrl: './presentation-container.component.html',
  styleUrls: ['./presentation-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationContainerComponent implements OnInit {

  command$ = this.facade.command$;
  // STATE
  sortKeys$ = this.facade.data$.pipe(map(a => Object.keys(a[0])));
  colorMap$ = this.facade.data$.pipe(map(getColorMap));

  // DERIVATION
  sortPanelState$ = combineLatest(this.facade.sortConfig$, this.sortKeys$)
    .pipe(
      map(([sortConfig, sortKeys]) => ({ sortConfig, sortKeys }))
    );

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

  itemViewState$ = combineLatest(
    this.facade.layout$,
    this.selectedData$,
    this.facade.sortConfig$,
    this.colorMap$)
    .pipe(
      map(
        ([layout, data, sortConfig, colorMap]) =>
          ({ layout, data, sortConfig, colorMap })
      )
    );

  constructor(private facade: PresentationFacade) {
    // this.facade.init();
  }

  ngOnInit() {
  }

}
