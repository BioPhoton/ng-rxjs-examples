import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { isNotUndefined, selectDistinctState } from '@ng-rx/shared/core';
import { RxJsDataItem } from '@nx-v8/filter-sort-group/api-client';
import * as d3 from 'd3';
import {
  combineLatest,
  defer,
  merge,
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  mapTo,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { observe } from '../../utils';

import { LayoutConfig } from '../layout-selection/layout-config.interface';
import { LayoutSelectionState } from '../layout-selection/layout-selection-state.interface';
import { SortConfig } from '../sort-selection/sort-config.interface';
import { ItemViewState } from './item-view-state.interface';

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemViewComponent implements AfterViewInit {

  selectors = {
    itemView: 'item-view',
    item: 'item',
    sorted: 'sorted'
  };

  transition = d3.transition().duration(650);

  afterViewInit$ = new Subject<boolean>();

  @Input()
  state;
  state$: Observable<LayoutSelectionState>;

  layoutConfig$ = defer(() => this.state$.pipe(
    selectDistinctState('layoutConfig'),
    isNotUndefined<LayoutConfig>()
  ));
  data$ = defer(() => this.state$.pipe(
    selectDistinctState('data'),
    isNotUndefined<RxJsDataItem[]>()
  ));
  colorMap$ = defer(() => this.state$.pipe(
    selectDistinctState('colorMap'),
    isNotUndefined<{}>())
  );
  primarySortKey$ = defer(() => this.state$.pipe(
    selectDistinctState<SortConfig>('sortConfig'),
    map(o => {
      const length = o ? Object.entries(o).length : 0;
      return length ? Object.entries(o).shift()[0] : '';
    }),
    distinctUntilChanged<string>()
    )
  );


  layoutName$ = this.layoutConfig$
    .pipe(
      map(l => l.name() || 'default')
    );

  holder$ = this.afterViewInit$
    .pipe(
      map(_ => d3.select('.' + this.selectors.itemView))
    );

  selectedElements$ = this.holder$.pipe(
    // select elements
    map(holder => holder.selectAll('.' + this.selectors.item))
  );

  boundDataElements$ = this.selectedElements$.pipe(
    // bind de elements with latest data
    withLatestFrom(this.data$, (holder, data) => holder.data(data, d => d.id))
  );

  onNgAfterViewInitSideEffects$ = merge(
    combineLatest(this.holder$, this.layoutConfig$, this.data$)
      .pipe(
        tap((d) => this.renderContainer(...d))
      ),
    this.boundDataElements$
      .pipe(
        tap(v => this.renderEnterElems(v)),
        tap(v => this.renderExitElems(v))
      ),
    //@TODO
    combineLatest(this.selectedElements$, this.layoutConfig$, this.data$, this.boundDataElements$)
      .pipe(
        tap((d) => this.renderUpdateElems(...d)
        )
      ),
    combineLatest(this.holder$, this.primarySortKey$, this.boundDataElements$, this.colorMap$)
      .pipe(
        tap((d) => this.renderSortColor(...d))
      )
  )
  // dirty hack in view
    .pipe(mapTo(''));

  constructor() {
    const { state, proxy } = observe<LayoutSelectionState>(this, 'state', new ReplaySubject<ItemViewState<RxJsDataItem>>(1));
    this.state$ = state;
    return proxy;
  }

  // Life cycle hooks

  ngAfterViewInit(): void {
    this.afterViewInit$.next(true);
  }

  // rendering function

  renderContainer(holder, layout: LayoutConfig, data: RxJsDataItem[]): void {
    holder
      .transition(this.transition)
      .style('height', layout.totalHeight(data));
  }

  renderEnterElems(elems) {
    const visibleProps = ['name', 'isOperator', 'isDeprecated', 'cedric', 'oldSchool', 'michael'];

    const enterElems = elems.enter();
    const items = enterElems.append('div')
      .attr('class', d => this.selectors.item + visibleProps.reduce((a, i) => a + `${i}-${d[i]} `, ' '));

    visibleProps.forEach(p => items
      .insert('div')
      .attr('class', p)
      .html(d => d[p])
    );
    /*
    enter.insert('img')
       .attr('src', d => `https://raw.githubusercontent.com/BioPhoton/Rx-Marble-Design-System/dev/assets/operators/new/${d.name}.png`);
    */
  }

  renderUpdateElems(holder, layout: LayoutConfig, data, bound): void {
    const updateElems = holder
      .data(data, d => d.id);

    updateElems.transition(this.transition)
      .style('left', layout.left)
      .style('top', layout.top)
      .style('height', layout.height)
      .style('width', layout.width);

  }

  renderExitElems(elems): void {
    const exitElems = elems.exit();
    exitElems
      .transition(this.transition)
      .style('height', 0 + 'px')
      .style('width', 0 + 'px')
      .remove();
  }

  renderSortColor(holder, key: string, boundDataElems, colorMap: {}): void {
    holder.classed(this.selectors.sorted, !!key);
    boundDataElems
      .style('border-color', d => {
        return key ? colorMap[key][d[key]] : 'inherit';
      });
  }

}
