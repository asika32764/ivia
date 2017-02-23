/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import ObserverableCollection from './collection';

export default class Observerable {
  constructor (watchers = []) {
    this.watchers = watchers;
  }

  addWatcher(watcher) {
    this.watchers.push(watcher);
  }

  notify(value, oldValue) {
    for (let watcher of this.watchers) {
      watcher.update(value, oldValue);
    }
  }
}

export function createObservable (value) {
  if (Array.isArray(value)) {
    value.forEach(function () {
      createObservable(this);
    });
  } else if (typeof value === 'object' && value !== null) {
    if (!value.hasOwnProperty('__ob__') || !(value.__ob__ instanceof ObserverableCollection)) {
      Object.defineProperty(value, '__ob__', {
        value: new ObserverableCollection,
        enumerable: false
      });
    }

    let keys = Object.keys(value);

    for (let key of keys) {
      value.__ob__.add(key, defineReactive(value, key, value[key]));
    }

    return value.__ob__;
  }
}

export function defineReactive(object, key, value) {
  const property = Object.getOwnPropertyDescriptor(object, key);
  const observable = new Observerable;

  if (property && property.configurable === false) {
    return;
  }

  const getter = property && property.get;
  const setter = property && property.set;

  const childObserver = createObservable(value);

  Object.defineProperty(object, key, {
    get: function () {
      //value = getter ? getter.call(object) : value;

      return value;
    },
    set: function (newValue) {
      createObservable(object, key, newValue);

      observable.notify(newValue, value);

      value = newValue;
    }
  });

  return observable;
}
