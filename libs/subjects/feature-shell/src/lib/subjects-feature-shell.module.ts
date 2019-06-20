import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubjectComponent } from './subject/subject.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: '', pathMatch: 'full', component: SubjectComponent}
    ])
  ],
  declarations: [SubjectComponent]
})
export class SubjectsFeatureShellModule {}
