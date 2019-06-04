export interface CounterState {
  isTicking: boolean;
  count: number;
  countUp: boolean;
  tickSpeed: number;
  countDiff:number;
}

export type PartialCounterState =
  { isTicking: boolean } |
  { count: number } |
  { countUp: boolean } |
  { tickSpeed: number } |
  { countDiff:number};

export enum CounterStateKeys {
  isTicking = 'isTicking',
  count = 'count',
  countUp = 'countUp',
  tickSpeed = 'tickSpeed',
  countDiff = 'countDiff'
}
