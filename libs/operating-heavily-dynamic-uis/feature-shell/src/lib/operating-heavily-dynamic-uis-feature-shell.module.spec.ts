import { async, TestBed } from '@angular/core/testing';
import { OperatingHeavilyDynamicUisFeatureShellModule } from './operating-heavily-dynamic-uis-feature-shell.module';

describe('OperatingHeavilyDynamicUisFeatureShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OperatingHeavilyDynamicUisFeatureShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(OperatingHeavilyDynamicUisFeatureShellModule).toBeDefined();
  });
});
