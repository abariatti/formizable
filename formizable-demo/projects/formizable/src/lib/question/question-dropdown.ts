import { QuestionBase, QuestionBaseOptions } from './question-base';
import { ISelectOption } from '../interface/iselect-option';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: ISelectOption[] = [];
  multiple: boolean;

  constructor(options: DropdownQuestionOptions<string>) {
    super(options);
    this.options = options.options || [];
    this.multiple = options.multiple || false;
  }
}

export interface DropdownQuestionOptions<T> extends QuestionBaseOptions<T> {
  options: ISelectOption[];
  multiple: boolean;
}