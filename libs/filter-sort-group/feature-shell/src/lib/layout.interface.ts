export type projectionFn = <T, I>(d:T) =>  I

export interface Layout {
  name: string;
  top: projectionFn;
  left: projectionFn;
  height: string;
  width: string;
  totalHeight: projectionFn
}
