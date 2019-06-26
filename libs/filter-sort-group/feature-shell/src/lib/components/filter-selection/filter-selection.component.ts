import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNotUndefined, selectDistinctState } from '@ng-rx/shared/core';
import { combineLatest, defer, ReplaySubject } from 'rxjs';
import { auditTime, map, shareReplay, switchMap } from 'rxjs/operators';
import { FilterConfig } from './filter-config.interface';
import { FilterSelectionState } from './filter-selection-state.interface';

@Component({
  selector: 'filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSelectionComponent {

  stateSubject = new ReplaySubject<FilterSelectionState>(1);

  @Input() set state(keys: FilterSelectionState) {
    this.stateSubject.next(keys);
  }

  @Output() stateChanged = defer(() => this.formGroup$
    .pipe(
      switchMap(f => f.valueChanges),
      auditTime(250),
      map(this.selectedPropsMapToOutput)
    )
  );


  // Preparing input values
  filterConfig$ = this.stateSubject
    .pipe(
      selectDistinctState<FilterConfig>('filterConfig'),
      isNotUndefined<FilterConfig>()
    );
  filterOptions$ = this.stateSubject
    .pipe(
      selectDistinctState<string[]>('filterOptions'),
      isNotUndefined<string[]>()
    );

  // Generating Form
  formGroup$ = combineLatest(this.filterOptions$, this.filterConfig$)
    .pipe(
      map(([options, { value, selectedProps }]) => {
        const selectedPropsConfig = this.selectedPropsMapToInput(options, selectedProps);
        return this.getForm(value, selectedPropsConfig);
      }),
      // we need this because we have multiple subscribers
      // and we want to have only one instance
      shareReplay(1)
    );

  constructor(private fb: FormBuilder) {

  }

  selectedPropsMapToInput(options: string[] = [], selectedProps: string[] = []) {
    return options
      .reduce((preparedConfig: {}, key: string): {} => {
        preparedConfig[key] = selectedProps.includes(key);
        return preparedConfig;
      }, {});
  }

  selectedPropsMapToOutput(formValue) {
    return {
      ...formValue,
      selectedProps: Object
        .keys(formValue.selectedProps)
        .filter(key => formValue.selectedProps[key])
    };
  }

  getForm(value: string, selectedPropsOptions: {}): FormGroup {
    const selectedPropsFromConfig = Object
      .keys(selectedPropsOptions)
      .reduce((a: {}, key): {} => {
        a[key] = [selectedPropsOptions[key]];
        return a;
      }, {});

    return this.fb.group({
      value: [value],
      selectedProps: this.fb.group(selectedPropsFromConfig)
    });
  }

}
