import { QuestionControlService } from './../../question/question-control.service';
import { ArrayQuestion } from './../../question/question-array';
import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormGroupName, FormArray } from '@angular/forms';
import { QuestionBase } from '../../question/question-base';

@Component({
  selector: 'app-mat-dynamic-form-array',
  templateUrl: './mat-dynamic-form-array.component.html',
  styleUrls: ['./mat-dynamic-form-array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatDynamicFormArrayComponent implements OnInit {
  @Input() question: ArrayQuestion;
  @Input() formGroup: FormGroup;
  @Input() label: string;

  constructor(private questionControlService: QuestionControlService) { }

  ngOnInit() {

  }

  addItem() {
    const newQuestions: QuestionBase<any>[] = [];
    Object.assign(newQuestions, this.question.questions);
    const formArray = <FormArray>this.formGroup.controls[this.question.key];
    formArray.push(this.questionControlService.toFormGroup(newQuestions));
    this.question.items.push(newQuestions);
  }

  removeItem(idx) {
    const formArray = <FormArray>this.formGroup.controls[this.question.key];
    formArray.controls.splice(idx, 1);
    this.question.items.splice(idx, 1);
  }
}
