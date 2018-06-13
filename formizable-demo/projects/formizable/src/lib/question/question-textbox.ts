import { QuestionBase, QuestionBaseOptions } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  maxLength: number;
  textArea: boolean;

  constructor(options: TextboxQuestionOptions<string> = {}) {
    super(options);
    this.maxLength = options.maxLength;
    this.textArea = options.textArea;
  }
}

export interface TextboxQuestionOptions<T> extends QuestionBaseOptions<T> {
  maxLength?: number;
  textArea?: boolean;
}