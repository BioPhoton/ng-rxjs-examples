import { RxJsDataItem } from '@nx-v8/filter-sort-group/api-client';
import { FilterConfig } from '../components/filter-selection/filter-config.interface';
import { LayoutConfig } from '../components/layout-selection/layout-config.interface';
import { SortConfig } from '../components/sort-selection/sort-config.interface';

export interface RxJsExplorerState {
  data?: RxJsDataItem[];
  layoutConfig?: LayoutConfig,
  colorMap?: { [key: string]: { [key: string]: string } },
  sortConfig?: SortConfig,
  filterConfig?: FilterConfig
}
