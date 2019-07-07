import { Observable, ReplaySubject } from 'rxjs';

export function observe<T extends object, I>(
  obj: T,
  prop: string
): {
  proxy: any,
  [prop: string]: Observable<I>
} {
  const subject = new ReplaySubject<I>(1);
  const handler: any = {
    set(target: any, propKey: string | symbol, value: any) {
      if (propKey === prop) {
        subject.next(value);
      }
      target[propKey] = value;
      return true;
    }
  };

  return {
    proxy: new Proxy(obj, handler),
    [prop]: subject.asObservable() as any
  };
}
