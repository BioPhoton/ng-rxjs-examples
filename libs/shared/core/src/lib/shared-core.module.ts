import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToArrayPipe } from './to-array.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ToArrayPipe],
  exports: [ToArrayPipe]
})
export class SharedCoreModule {}
