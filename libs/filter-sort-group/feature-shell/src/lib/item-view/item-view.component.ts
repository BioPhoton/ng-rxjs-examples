import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, tap, withLatestFrom } from 'rxjs/operators';
import { selectDistinctState } from '../operators/selectDistinctState';

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

  stateSubject = new ReplaySubject<ItemViewState<any>>(1);
  state$ = this.stateSubject.asObservable();

  layout$ = this.state$.pipe(selectDistinctState('layout'));
  data$: Observable<any[]> = this.state$.pipe(selectDistinctState('data'));
  primarySortKey$ = this.state$.pipe(selectDistinctState('sortConfig'),
    map(o => Object.entries(o).shift()[0]),
    distinctUntilChanged()
  );

  groupColors$ = combineLatest(this.data$, this.primarySortKey$).pipe(
    map(([data, key]) => {
      const group = Object.keys(
        data.reduce((g:any, i): any => {
          g[i[key]] = true;
          return g;
        }, {})
      );
      const color = d3.schemeSpectral(group.length);
      const colorMap = group.reduce((result, field, index) => {
        result[color[index]] = field;
        return result;
      }, {})
      console.log(color, colorMap);
    })
  );

  @Input()
  set state(state) {
    this.stateSubject.next(state)
  }

  @Output() action = new Subject();
  // ========================================

  animTime = 650;

  selectors = {
    parentId: 'holder',
    itemClass: 'item',
    nameClass: 'name',
    michaelClass: 'michael'
  };
  holder;

  getCardsPerRow(): number {
    const width = window.innerWidth - 20;
    return Math.floor(width / 200);
  }

  renderElements(data) {
    const t = d3.transition().duration(this.animTime);

    this.holder = d3.select('#'+this.selectors.parentId);
    const enter = this.holder.selectAll('.'+this.selectors.itemClass)
      .data(data, d => {return d.id})
      .enter()
      .append('div')
      .attr('class', this.selectors.itemClass);

    enter.insert('div')
      .attr('class', this.selectors.nameClass)
      .html(d => d.name);
    enter.insert('div')
      .attr('class', this.selectors.michaelClass)
      .html(d => d.id + ' ' + d.michael);

    this.holder = d3.select('#'+this.selectors.parentId);
    const exit = this.holder.selectAll('.'+this.selectors.itemClass)
      .data(data, d => {return d.id})
      .exit()
      .transition(t)
      .style('height', 0+'px')
      .style('width', 0+'px')
      .remove();
  }

  drawLayout(layout, data: any[]){
    const t = d3.transition().duration(this.animTime);

    this.holder.attr("class", layout.name);
    this.holder.selectAll('.'+this.selectors.itemClass)
      .data(data, d =>  d.id)
      .transition(t)
      .style('left', layout.left)
      .style('top', layout.top)
      .style('height', layout.height)
      .style('width', layout.width);

    const totalHeight = 20 + Math.ceil(data.length / this.getCardsPerRow()) * 90;

    this.holder.transition(t)
      .style('height', totalHeight);
  }

  constructor() {
   // this.groupColors$.subscribe(console.log);
  }

  getBackgroundColor(key, data) {

  }

  ngAfterViewInit(): void {
    this.data$
      .pipe(
        withLatestFrom(this.layout$)
      )
      .subscribe(([data, layout]) => {
        this.renderElements(data);
        this.drawLayout(layout, data);
      });
  }

}
