import { QuestionBase } from './question-base';

export class DateQuestion extends QuestionBase<Date> {
  controlType = 'date';

  constructor(options: {} = {}) {
    super(options);
  }
}
