import { PropertyType } from './../enum/property-type';
import { Validators, ValidatorFn } from '@angular/forms';
import { ISelectOption } from './iselect-option';
import { QuestionBaseOptions } from '../question/question-base';

export interface IFormizableProperty {
    name: string | symbol;
    type: PropertyType | string;
    options: IFormizablePropertyOptions;
    instance?: any;
}

export interface IFormizablePropertyOptions extends QuestionBaseOptions<any> {
    /**
     * Set the name of the property or method
     * where options will be retrieved from at
     * runtime on the instance
     */
    arrayOptionsPropertyOrMethodName?: string;
    options?: ISelectOption[];
}
