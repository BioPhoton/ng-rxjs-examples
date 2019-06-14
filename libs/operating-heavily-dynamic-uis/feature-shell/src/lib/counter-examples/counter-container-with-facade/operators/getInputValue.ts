import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function getInputValue (source: Observable<Event>): Observable<number> {
  return source
    .pipe(
      map(v => (<HTMLInputElement> v.target).value),
      map(v => parseInt(v, 10))
    );
}
