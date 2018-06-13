import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, IterableDiffers, DoCheck } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../question/question-base';
import { QuestionControlService } from '../../question/question-control.service';

@Component({
  selector: 'app-mat-dynamic-form',
  templateUrl: './mat-dynamic-form.component.html',
  styleUrls: ['./mat-dynamic-form.component.scss'],
  providers: [QuestionControlService]
})
export class MatDynamicFormComponent implements DoCheck  {
  @Input() submitText: string;

  @Input()
  set questions(questions: QuestionBase<any>[]) {
    this._questions = questions;
    this.formGroup = this.questionControlService.toFormGroup(this._questions);
    this.changeDetectorRef.detectChanges();
  }
  get questions(): QuestionBase<any>[] {
    return this._questions;
  }

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  formGroup: FormGroup;

  private _differ: any;
  private _questions: QuestionBase<any>[];

  constructor(private questionControlService: QuestionControlService,
    private changeDetectorRef: ChangeDetectorRef,
    private differs: IterableDiffers) {
    this._differ = differs.find([]).create(null);
  }

  ngDoCheck() {
    const change = this._differ.diff(this._questions);
    if (change) {
      this.formGroup = this.questionControlService.toFormGroup(this._questions);
      this.changeDetectorRef.detectChanges();
    }
  }

  onSubmit(event: Event) {
    event.stopPropagation();
    this.submit.emit(this.formGroup.value);
  }
}
