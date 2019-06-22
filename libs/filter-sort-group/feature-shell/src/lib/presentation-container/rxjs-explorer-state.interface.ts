import { RxJsDataItem } from '../../../../api-client/src/lib/rxjs-data-item.interface';
import { Layout } from '../layout.interface';

export interface RxJsExplorerState {
  data?: RxJsDataItem[];
  layoutConfig?:  {[key: string]: Layout},
  colorMap?: {[key: string]: {[key: string]: string}},
  sortConfig?: {[key: string]: string},
  filterConfig?: {[key: string]: string}
}
