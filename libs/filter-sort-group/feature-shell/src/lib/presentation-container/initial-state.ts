import { RxJsDataItem } from '@nx-v8/filter-sort-group/api-client';
import { RxJsExplorerState } from './rxjs-explorer-state.interface';

export const initRxJsExplorerState : RxJsExplorerState = {
  data: [] as RxJsDataItem[],
  layoutConfig: undefined,
  colorMap: {},
  sortConfig: {},
  filterConfig: {}
}
