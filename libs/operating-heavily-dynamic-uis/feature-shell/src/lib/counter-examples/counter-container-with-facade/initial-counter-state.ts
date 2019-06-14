import { CounterState } from './utils/counter-state.interface';

export const initialCounterState: CounterState = {
  isTicking: false,
  count: 0,
  countUp: true,
  tickSpeed: 200,
  countDiff:1
};
