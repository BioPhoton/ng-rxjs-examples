import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { selectDistinctState } from '@ng-rx/shared/core';
import * as d3 from 'd3';
import { combineLatest, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

export interface Layout {
  name: string;
  top: (d, i) => string;
  left: (d, i) => string;
  height: string;
  width: string;
}

export interface ItemViewState<T> {
  data: T[],
  layout: Layout
}

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemViewComponent implements AfterViewInit {

  transition = d3.transition().duration(650);


  stateSubject = new ReplaySubject<ItemViewState<any>>(1);
  state$ = this.stateSubject.asObservable();

  layout$ = this.state$.pipe(selectDistinctState('layout'));
  data$: Observable<any[]> = this.state$.pipe(selectDistinctState('data'));
  colorMap$ = this.state$.pipe(selectDistinctState('colorMap'));

  @Input()
  set state(state) {
    this.stateSubject.next(state);
  }

  @Output() action = new Subject();
  primarySortKey$ = this.state$.pipe(selectDistinctState('sortConfig'),
    map(o => {
      const length = o ? Object.entries(o).length : 0;
      return length ? Object.entries(o).shift()[0] : '';
    }),
    distinctUntilChanged()
  );


  // ========================================

  selectors = {
    parentId: 'holder',
    itemClass: 'item',
    nameClass: 'name',
    michaelClass: 'michael'
  };
  holder;

  renderElements(data) {
    this.holder = d3.select('#' + this.selectors.parentId);
    const enter = this.holder
      .selectAll('.' + this.selectors.itemClass)
      .data(data, d => d.id)
      .enter()
      .append('div')
      .attr('class', this.selectors.itemClass);

    enter.insert('div')
      .attr('class', this.selectors.nameClass)
      .html(d => d.name);
    enter.insert('div')
      .attr('class', this.selectors.michaelClass)
      .html(d => d.id + ' ' + d.michael);

    this.holder = d3.select('#' + this.selectors.parentId);
    const exit = this.holder.selectAll('.' + this.selectors.itemClass)
      .data(data, d => d.id)
      .exit()
      .transition(this.transition)
      .style('height', 0 + 'px')
      .style('width', 0 + 'px')
      .remove();
  }

  drawLayout(layout, data: any[]) {

    this.holder.attr('class', layout.name);
    return this.holder.selectAll('.' + this.selectors.itemClass)
      .data(data, d => d.id)
      .transition(this.transition)
      .style('left', layout.left)
      .style('top', layout.top)
      .style('height', layout.height)
      .style('width', layout.width);

  }

  drawContainer(layout, data: any[]) {
    this.holder.transition(this.transition)
      .style('height', layout.totalHeight(data));
  }


  drawSortColor(key: string, data: any[], colorMap) {
    if (key === '') {
      return;
    }

    this.holder.selectAll('.' + this.selectors.itemClass)
      .data(data, d => d.id)
      //.transition(this.transition)
      .style('background', d => colorMap[key][d[key]]);

  }

  constructor() {

  }

  ngAfterViewInit(): void {
    merge(
      this.data$
        .pipe(
          tap(data => this.renderElements(data))
        ),
      combineLatest(this.layout$, this.data$)
        .pipe(
          tap(([layout, data]) => {
              this.drawLayout(layout, data);
              this.drawContainer(layout, data);
            }
          )
        ),
      combineLatest(this.primarySortKey$, this.data$, this.colorMap$)
        .pipe(
          tap(([key, data, colorMap]) => this.drawSortColor(key, data, colorMap))
        )
    )
      .subscribe();
  }

}
