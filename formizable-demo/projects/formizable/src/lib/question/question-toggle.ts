import { QuestionBase } from './question-base';

export class ToggleQuestion extends QuestionBase<string> {
  controlType = 'toggle';

  constructor(options: {} = {}) {
    super(options);
  }
}
