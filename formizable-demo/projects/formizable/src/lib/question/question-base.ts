import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { ISelectOption } from '../interface/iselect-option';

export interface QuestionBaseOptions<T> {
  value?: T;
  key?: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: string;
  validators?: ValidatorFn[];
  validationMessage?: string;
  multiple?: boolean;
  maxLength?: number;
  textArea?: boolean;
}

export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    validators?: ValidatorFn[];
    validationMessage: string;
    questions?: QuestionBase<any>[];
    constructor(options: QuestionBaseOptions<T> = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.validators = options.validators;
      this.validationMessage = options.validationMessage;
    }
  }


