import { Observable, pipe, UnaryFunction } from 'rxjs';
import { distinctUntilChanged, filter, pluck } from 'rxjs/operators';

export function selectDistinctState<T, I>(key: string): UnaryFunction<Observable<T>, Observable<I>> {
  return  pipe(
    pluck<T, I>(key),
   // filter(v => v !== undefined),
    distinctUntilChanged<I>()
  );
}
