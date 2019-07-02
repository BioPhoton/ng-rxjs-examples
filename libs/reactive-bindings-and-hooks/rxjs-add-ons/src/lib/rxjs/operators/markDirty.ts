import { ChangeDetectorRef, ɵmarkDirty} from '@angular/core';
import { tap } from 'rxjs/operators';

export const markDirty = (cdr: ChangeDetectorRef) =>
  o$ => o$.pipe(tap(_ => {
    const component = ivyComponentInstance(cdr);
    if (component) {
      ɵmarkDirty(component);
    }
  }));


function ivyComponentInstance(cdr: ChangeDetectorRef) {
  return (cdr as any)._lView.find(viewPart =>
    viewPart && viewPart.__ngContext__ && !viewPart.namespaceURI);
}
