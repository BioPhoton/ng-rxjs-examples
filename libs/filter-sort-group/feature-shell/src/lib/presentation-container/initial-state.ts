import { RxJsDataItem } from '../../../../api-client/src/lib/rxjs-data-item.interface';
import { RxJsExplorerState } from './rxjs-explorer-state.interface';

export const initRxJsExplorerState : RxJsExplorerState = {
  data: [] as RxJsDataItem[],
  layoutConfig: {},
  colorMap: {},
  sortConfig: {},
  filterConfig: {}
}
