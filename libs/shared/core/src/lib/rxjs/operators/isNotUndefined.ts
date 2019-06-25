import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

function inputIsNotUndefined<T>(input: undefined | T): input is T {
  return input !== undefined;
}

export function isNotUndefined<T>() {
  return (source$: Observable<undefined | T>) =>
    source$.pipe(
      filter(inputIsNotUndefined)
    );
}
