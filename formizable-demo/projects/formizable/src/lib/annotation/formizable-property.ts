import * as METADATA_KEYS from '../keys/metadata-keys';
import * as ERROR_MSGS_KEYS from '../keys/error-msgs-keys';
import 'reflect-metadata';
import { IFormizablePropertyOptions, IFormizableProperty } from '../interface/iformizable-property';
import { FormizableBase } from '../formizable-base';
import { catchError } from 'rxjs/operators';

function FormizableProperty(options?: IFormizablePropertyOptions, arrayType?: any) {

  return function (target: Object, propertyKey: string | symbol): void {
    const type = Reflect.getMetadata('design:type', target, propertyKey);

    const properties: IFormizableProperty[] =
      Reflect.getMetadata(METADATA_KEYS.FORM_FIELD_TAG, target) || [];

    const obj = new type();

    if (obj.getTypeName) {
      // we have a formizable inside our formizable we save an instance
      // of our type to be able to generate question from that instance
      properties.push({ name: propertyKey, type: type.name, options: options || {}, instance: new type() });
    } else if (type.name === 'Array' && arrayType) {
      // we have an array let's save an instance of optional T type it will allow us to build array of
      // anything with formizable
      properties.push({ name: propertyKey, type: type.name, options: options || {}, instance: new arrayType });
    } else {
      // we have a standard property type
      properties.push({ name: propertyKey, type: type.name, options: options || {} });
    }

    Reflect.defineMetadata(METADATA_KEYS.FORM_FIELD_TAG, properties, target);
  };
}

export { FormizableProperty };
