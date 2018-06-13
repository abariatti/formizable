import { QuestionBase } from './../question/question-base';
export interface IFormizable {
  getTypeName(): string;
  generateQuestions(): QuestionBase<any>[];
  updateFromFormData(formData: any): void;
}
