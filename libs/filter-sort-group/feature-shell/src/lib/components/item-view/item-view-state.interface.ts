import { LayoutConfig } from '../layout-selection/layout-config.interface';
import { SortConfig } from '../sort-selection/sort-config.interface';

export interface ItemViewState<T> {
  data: T[],
  layout: LayoutConfig,
  colorMap: {},
  sortConfig: SortConfig
}
