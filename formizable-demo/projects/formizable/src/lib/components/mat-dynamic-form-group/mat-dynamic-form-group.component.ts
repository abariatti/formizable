import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormGroupName } from '@angular/forms';
import { QuestionBase } from '../../question/question-base';

@Component({
  selector: 'app-mat-dynamic-form-group',
  templateUrl: './mat-dynamic-form-group.component.html',
  styleUrls: ['./mat-dynamic-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatDynamicFormGroupComponent implements OnInit {
  @Input() questions: QuestionBase<any>[];
  @Input() formGroup: FormGroup;
  @Input() label: string;

  ngOnInit() {
    // console.log(this.formGroup);
    // console.log(this.questions);    
  }
}
