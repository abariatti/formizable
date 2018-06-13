import { QuestionBase, QuestionBaseOptions } from './question-base';

export class ArrayQuestion extends QuestionBase<any> {
  controlType = 'array';
  questions: QuestionBase<any>[];
  items?: Array<Array<QuestionBase<any>>>;
  constructor(options: ArrayQuestionOptions<any>) {
    super(options);
    this.questions = options.questions || [];
    this.items = options.items || [];
  }
}

export interface ArrayQuestionOptions<T> extends QuestionBaseOptions<T> {
  questions: QuestionBase<any>[];
  items?: Array<Array<QuestionBase<any>>>;
}