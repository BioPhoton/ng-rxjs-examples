import { async, TestBed } from '@angular/core/testing';
import { SubjectsFeatureShellModule } from './subjects-feature-shell.module';

describe('SubjectsFeatureShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SubjectsFeatureShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SubjectsFeatureShellModule).toBeDefined();
  });
});
