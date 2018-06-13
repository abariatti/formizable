import { IFormizable } from '../../interface/iformizable-base';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, IterableDiffers, DoCheck } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../question/question-base';
import { QuestionControlService } from '../../question/question-control.service';
import { FormizableBase } from '../../formizable-base';

@Component({
  selector: 'app-formizable-form',
  templateUrl: './formizable-form.component.html',
  styleUrls: ['./formizable-form.component.scss'],
  providers: [QuestionControlService]
})
export class FormizableFormComponent {
  @Input() submitText: string;

  @Input()
  set model(model: IFormizable) {
    this._model = model;
    this.questions = this._model ? this._model.generateQuestions() : [];
    this.formGroup = this.questionControlService.toFormGroup(this.questions);
    this.changeDetectorRef.detectChanges();
  }
  get model(): IFormizable {
    return this._model;
  }

  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  formGroup: FormGroup;

  private _differ: any;
  private _model: IFormizable;

  public questions: QuestionBase<any>[] = [];

  constructor(private questionControlService: QuestionControlService,
    private changeDetectorRef: ChangeDetectorRef,
    private differs: IterableDiffers) {
    this._differ = differs.find([]).create(null);
  }

  onSubmit(event: Event) {
    this._model.updateFromFormData(this.formGroup.value);
    event.stopPropagation();
    this.modelChange.emit(this._model);
    console.log(JSON.stringify(this._model));
    this.submit.emit(this._model);
  }
}
