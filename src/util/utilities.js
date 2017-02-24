/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

export default class Utilities {
  static get (data, path, def) {
    if (path.indexOf('.') !== -1) {
      let paths = path.split('.');
      let key = paths.shift();

      if (!Utilities.has(data, key)) {
        return def;
      }

      return Utilities.get(data[key], paths.join('.'), def);
    }

    return Utilities.has(data, path) ? data[path] : def;
  }

  static set (data, path, value) {
    if (path.indexOf('.') !== -1) {
      let paths = path.split('.');
      let key = paths.shift();

      if (!Utilities.has(data, key)) {
        data[key] = {};
      }

      data[key] = Utilities.set(data[key], paths.join('.'), value);

      return data;
    }

    data[path] = value;

    return data;
  }

  static remove (data, path) {
    if (path.indexOf('.') !== -1) {
      let paths = path.split('.');
      let key = paths.shift();

      if (!Utilities.has(data, key)) {
        return data;
      }

      Utilities.remove(data[key], paths.join('.'));

      return data;
    }

    remove(data, path);

    return data;
  }

  static removeElement (arr, element) {
    if (arr.length) {
      const index = arr.indexOf(element);
      if (index > -1) {
        return arr.splice(index, 1);
      }
    }
  }

  static has (data, key) {
    if (Array.isArray(data)) {
      return typeof data[key] !== 'undefined';
    } else if (Utilities.isObject(data)) {
      return data.hasOwnProperty(key);
    }

    return false;
  }

  static define (object, key, value, enumerable = true) {
    Object.defineProperty(object, key, {
      value: value,
      enumerable: enumerable,
      writable: true,
      configurable: true
    });
  }

  static flatten (data) {
    const toReturn = {};

    for (let i in data) {
      if (!data.hasOwnProperty(i)) continue;

      if ((typeof data[i]) == 'object') {
        let flatObject = flattenObject(data[i]);
        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) {
            continue;
          }

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = data[i];
      }
    }

    return toReturn;
  }

  static isObject (data) {
    return typeof data === 'object' && data !== null;
  }

  static isPlainObject (data) {
    return Object.prototype.toString.call(data) === '[object Object]';
  }

  static isNative (object) {
    return /native code/.test(object.toString());
  }

  static isReserved (string) {
    const str = (string + '').charCodeAt(0);
    return str === '$' || str === '_';
  }
}

function remove (data, key) {
  if (Array.isArray(data)) {
    if (data.length) {
      data.splice(key, 1);
    }

    return data;
  } else if (Utilities.isObject(data)) {
    delete data[key];

    return data;
  }

  return data;
}

export function nullFunction () {
}
