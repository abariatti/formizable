import { NumberQuestion } from './question/question-number';
import * as METADATA_KEYS from './keys/metadata-keys';
import * as ERROR_MSGS from './keys/error-msgs-keys';
import { IFormizableProperty } from './interface/iformizable-property';
import { Validators } from '@angular/forms';
import { QuestionBase, QuestionBaseOptions } from './question/question-base';
import { TextboxQuestion } from './question/question-textbox';
import { PropertyType } from './enum/property-type';
import { DropdownQuestion, DropdownQuestionOptions } from './question/question-dropdown';
import { IFormizable } from './interface/iformizable-base';
import { ToggleQuestion } from './question/question-toggle';
import { DateQuestion } from './question/question-date';
import { GroupQuestion, GroupQuestionOptions } from './question/question-group';
import { ArrayQuestion, ArrayQuestionOptions } from './question/question-array';

import 'reflect-metadata';

export abstract class FormizableBase implements IFormizable {

  private _properties: IFormizableProperty[];

  constructor() {
    this._properties = Reflect.getMetadata(METADATA_KEYS.FORM_FIELD_TAG, this) as IFormizableProperty[];
  }

  private createQuestionFromProperty(property: IFormizableProperty, value?: any): QuestionBase<any> {

    const options: QuestionBaseOptions<any> = {
      key: property.name.toString(),
      value: value || this[property.name], // optional value parameter for recursion
      label: property.options.label || property.name.toString(),
      required: property.options.required === undefined ? true : false,
      order: property.options.order || 1,
      validators: property.options.validators,
      validationMessage: property.options.validationMessage,
      maxLength: property.options.maxLength,
      textArea: property.options.textArea,
    };


    // Create Dropdown input so it works for any property type as soon as
    // you define options for it
    if (property.options != null) {
      // if our property is an array then dropdown should be multiple
      options.multiple = property.type === PropertyType.ARRAY;
      // options are defined statically in IFormizableProperty.options
      if (property.options.options) {
        (options as DropdownQuestionOptions<any>).options = property.options.options;
        return new DropdownQuestion(options as DropdownQuestionOptions<any>);
      }
      // options are defined dynamically with property or function at runtime
      if (property.options.arrayOptionsPropertyOrMethodName) {
        const propertyOrMethod = property.options.arrayOptionsPropertyOrMethodName;
        if (typeof (this[propertyOrMethod]) === 'function') {
          (options as DropdownQuestionOptions<any>).options = this[propertyOrMethod]();
        } else {
          (options as DropdownQuestionOptions<any>).options = this[propertyOrMethod];
        }
        return new DropdownQuestion(options as DropdownQuestionOptions<any>);
      }
    }

    // Create TextBox input so it works for any string property
    if (property.type === PropertyType.STRING) {
      return new TextboxQuestion(options);
    }

    // Create Toggle input so it works for any boolean property
    if (property.type === PropertyType.BOOLEAN) {
      return new ToggleQuestion(options);
    }

    // Create Date input for any Date property
    if (property.type === PropertyType.DATE) {
      return new DateQuestion(options);
    }

    // Create Date input for any Date property
    if (property.type === PropertyType.NUMBER) {
      return new NumberQuestion(options);
    }

    // Create from array then create from usual property or @formizabletype
    if (property.type === PropertyType.ARRAY) {

      if (property.instance) {

        const questions: QuestionBase<any>[] = [];
        const items: QuestionBase<any>[][] = [];
        const properties = property.instance._properties as IFormizableProperty[];
        properties.forEach(p => {
          const q = this.createQuestionFromProperty(p, undefined);
          questions.push(q);
        });

        if (options.value) {
          options.value.forEach(v => {
            const valueQuestions = [];
            properties.forEach(p => {
              const q = this.createQuestionFromProperty(p, v[p.name]);
              valueQuestions.push(q);
            });
            items.push(valueQuestions);
          });
        }

        (options as ArrayQuestionOptions<any>).questions = questions;
        (options as ArrayQuestionOptions<any>).items = items;

        const question = new ArrayQuestion(options as ArrayQuestionOptions<any>);

        return question;
      }

      throw new Error(ERROR_MSGS.FIELD_ARRAY_WITH_NO_OPTIONS_OR_TYPE);
    }

    // Create from @formizable type
    if (property.instance) {


      const questions: QuestionBase<any>[] = [];
      const properties = property.instance._properties as IFormizableProperty[];
      properties.forEach(p => {
        let v;
        if (options.value) {
          v = options.value[p.name];
        }

        const q = this.createQuestionFromProperty(p, v);
        questions.push(q);
      });

      (options as GroupQuestionOptions<any>).questions = questions;

      const question = new GroupQuestion(options as GroupQuestionOptions<any>);

      return question;
    }

    throw new Error(ERROR_MSGS.UNKNOWN_FORM_FIELD_TYPE);
  }

  /**
   * this is used if we need to retrieve the name of the class we are creating a form for
   */
  public getTypeName(): string {
    return this.constructor.name;
  }

  /**
   * this is used by formizable-form to update it with its form data
   * it will match this properties with formData properties and update accordingly
   * @param formData
   */
  public updateFromFormData(formData: any): void {
    Object.keys(formData).map(key => {
      this[key] = formData[key];
    });
  }

  /**
   * Generate questions suitable for a formizable-form
   */
  public generateQuestions(): QuestionBase<any>[] {
    const questions: QuestionBase<any>[] = [];
    this._properties.forEach(property => {

      const question = this.createQuestionFromProperty(property);

      questions.push(question);
    });

    return questions;
  }
}
