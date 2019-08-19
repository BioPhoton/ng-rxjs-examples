import { RxJsDataItem } from '@nx-v8/filter-sort-group/api-client';
import { getLayouts } from './layouts';
import { RxJsExplorerState } from './rxjs-explorer-state.interface';

export const initRxJsExplorerState : RxJsExplorerState = {
  data: [] as RxJsDataItem[],
  queryParams: {},
  layoutOptions: getLayouts(),
  colorMap: {},
  sortConfig: {},
  filterOptions: ['name', 'michael', 'cedric', 'oldSchool'],
  filterConfig: {
    value: '',
    selectedProps: ['name']
  }
}
