import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormGroupName } from '@angular/forms';
import { QuestionBase } from '../../question/question-base';

@Component({
  selector: 'app-mat-dynamic-form-question',
  templateUrl: './mat-dynamic-form-question.component.html',
  styleUrls: ['./mat-dynamic-form-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MatDynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() formGroup: FormGroup;

  // get isValid() {
  //   return this.form.controls[this.question.key].valid;
  // }

  public maxLength = MAX_LENGTH;

  ngOnInit() {
    console.log(this.question);
  }

  getFormGroup(name) {
    return this.formGroup.controls[name];
  }
}

export const MAX_LENGTH = 255; // rapid ugly fix to refactor
