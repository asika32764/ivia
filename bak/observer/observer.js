/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import Dispatcher from './dispatcher';

export default class Observer {
  constructor (value, dispatcher = null) {
    this.value = value;
    this.dispatcher = dispatcher || new Dispatcher;

    this.prepareProperties(value);
  }

  prepareProperties(value) {
    if (Array.isArray(value)) {
      value.forEach(function () {
        createChildObserver(this);
      });
    } else {
      let keys = Object.keys(value);

      for (let key of keys) {
        defineReactive(value, key, value[key]);
      }
    }
  }
}

export function createChildObserver (value) {
  if (value === null || typeof value !== 'object') {
    return;
  }

  if (!value.hasOwnProperty('__ob__') || !(value.__ob__ instanceof Observer)) {
    Object.defineProperty(value, '__ob__', {
      value: new Observer(value),
      enumerable: false
    });
  }

  return value.__ob__;
}

export function defineReactive(object, key, value) {
  const property = Object.getOwnPropertyDescriptor(object, key);

  if (property && property.configurable === false) {
    return;
  }

  const getter = property && property.get;
  const setter = property && property.set;

  const childObserver = createChildObserver(value);

  Object.defineProperty(object, key, {
    get: function () {
      //value = getter ? getter.call(object) : value;

      return value;
    },
    set: function (newValue) {
      // Loop deep
      createChildObserver(newValue);

      object.data[key] = newValue;
    }
  });
}

