import { Layout } from '../../layout.interface';

export interface ItemViewState<T> {
  data: T[],
  layout: Layout
}
