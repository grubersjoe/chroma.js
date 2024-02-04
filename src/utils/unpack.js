import { prettyObj } from './print';
import { isObject } from './type';

/**
 * @returns number[]
 */
export const unpack = (args, objKeys = null) => {
  // If called with more than 3 arguments, we return the arguments
  if (args.length >= 3) {
    return args.slice(0);
  }

  // With less than 3 arguments we check if first arg is an object
  // and use the keyOrder string to extract and sort properties
  if (isObject(args[0]) && objKeys) {
    const arr = objKeys
      .split('')
      .filter(k => args[0][k] !== undefined)
      .map(k => args[0][k]);

    if (arr.length !== objKeys.length) {
      throw new Error(
        `invalid argument, can not unpack keys "${objKeys}" from argument ${prettyObj(args)}`,
      );
    }

    return arr;
  }

  // Otherwise, we just return the first argument
  // (which we suppose is an array of args)
  return args[0];
};
