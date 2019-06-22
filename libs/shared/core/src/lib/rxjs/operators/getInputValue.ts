import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const getInputValue = (parse = v => parseInt(v, 10)) =>
  (source: Observable<Event>): Observable<any> =>
    source
      .pipe(
        map(v => (<HTMLInputElement> v.target).value),
        map(v => parse(v))
      );
