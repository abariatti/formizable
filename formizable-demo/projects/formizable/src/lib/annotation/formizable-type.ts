import * as METADATA_KEYS from '../keys/metadata-keys';
import * as ERROR_MSGS_KEYS from '../keys/error-msgs-keys';
import 'reflect-metadata';
import { IFormizablePropertyOptions, IFormizableProperty } from '../interface/iformizable-property';



function FormizableType() {

  return function (target: any) {

    // save a reference to the original constructor
    const original = target;
    // a utility function to generate instances of a class
    function construct(constructor, args) {
      const c: any = function () {
        return constructor.apply(this, args);
      };
      c.prototype = constructor.prototype;
      return new c();
    }

    // the new constructor behaviour
    const f: any = function (...args) {
      // original.formizable = true;
      return construct(original, args);
    };

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return target;
  };
}
export { FormizableType };
