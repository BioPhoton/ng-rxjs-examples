import { iif, Observable, timer } from 'rxjs';
import {
  concatMap,
  exhaustMap,
  retry,
  retryWhen,
  takeWhile
} from 'rxjs/operators';

export interface LoopObservableConfig <T, I> {
  initValue$: Observable<T>,
  obsToLoop: (fn: () => any) => Observable<I>,
  extractDataForNext: (s) => any,
  loopCondition: (s) => boolean,
  initialDelay: number,
  interval: number,
  numTrys: number
}

export function loopObservable<T>({
  // @TODO move out of config
                             initValue$,
                             obsToLoop,
                             extractDataForNext,
                             loopCondition,
                             initialDelay = 0,
                             interval = 1000,
                             numTrys = 5
                           }: LoopObservableConfig): Observable<T> {
  return initValue$
    .pipe(
      concatMap(res => timer(initialDelay, interval)
        .pipe(
          // against queing up http req
          exhaustMap(_ => obsToLoop(extractDataForNext(res))),
          // @TODO refactor to retryWhen
          retry(numTrys),
          //
          takeWhile(status => loopCondition(status))
        )
      )
    );
}


iif(() => {
  return 1 ? finished$ : respons.pipe(looopObservable)
})




const retryWhenCustom = () => {
  let interlanState = 0;

  return (o) => o.pipe(retryWhen(() => {
    interlanState++;


  }));
}
