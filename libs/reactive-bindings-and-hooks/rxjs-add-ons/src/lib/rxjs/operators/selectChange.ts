import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SingleSelectionState } from '../../../../../feature-shell/src/lib/interfaces/single-selection-state';

export const selectChange = (prop: string) => (o$) => o$
  .pipe(
    filter<SingleSelectionState>(change => !!change[prop]),
    map(changes => changes[prop].currentValue),
    distinctUntilChanged()
  );
