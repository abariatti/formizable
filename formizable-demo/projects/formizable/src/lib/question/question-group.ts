import { QuestionBase, QuestionBaseOptions } from './question-base';

export class GroupQuestion extends QuestionBase<any> {
  controlType = 'group';
  questions: QuestionBase<any>[] = [];
  constructor(options: GroupQuestionOptions<any>) {
    super(options);
    this.questions = options.questions;
  }
}

export interface GroupQuestionOptions<T> extends QuestionBaseOptions<T> {
  questions: QuestionBase<any>[];
}
