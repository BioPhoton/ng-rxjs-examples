import { RxJsDataItem } from '@nx-v8/filter-sort-group/api-client';

export type projectRxJsDataItemToStringFn = (d?:RxJsDataItem, i?: number) =>  string
export type projectArrayToStringFn = (d:any[]) =>  string

export interface LayoutConfig {
  name: projectRxJsDataItemToStringFn;
  top: projectRxJsDataItemToStringFn;
  left: projectRxJsDataItemToStringFn;
  height: projectRxJsDataItemToStringFn;
  width: projectRxJsDataItemToStringFn;
  totalHeight: projectArrayToStringFn;
}

