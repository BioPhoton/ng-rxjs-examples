import { pipe } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

export function selectDistinctState<T>(key: string) {
  return  pipe(
    pluck(key),
    distinctUntilChanged<T>()
  );
}
