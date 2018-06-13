import { ArrayQuestion } from './question-array';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { QuestionBase } from './question-base';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';

@Injectable()
export class QuestionControlService {
  private formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({});
  }

  public toFormGroup(questions: QuestionBase<any>[]): FormGroup {
    const group: any = {};

    questions.forEach(question => {
      if (question.controlType === 'group') {
        group[question.key] = this.toFormGroup(question.questions);
      } else if (question.controlType === 'array') {

        const arrayQuestion = question as ArrayQuestion;
        const groups: FormGroup[] = [];
        arrayQuestion.items.forEach(item => {
          groups.push(this.toFormGroup(item));
        });

        group[question.key] = new FormArray(groups);
      } else {
        group[question.key] = this.toFormControl(question);
      }
    });

    return new FormGroup(group);
  }

  private toFormControl(question: QuestionBase<any>): FormControl {
    const formControl = question.required ? new FormControl(question.value || '', [Validators.required])
      : new FormControl(question.value || '');
    formControl.setValidators(question.validators);
    return formControl;
  }
}
