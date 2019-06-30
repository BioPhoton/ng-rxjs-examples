import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from './pipes/push.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [PushPipe],
  exports: [PushPipe]
})
export class RxJSAddOnsModule {}
