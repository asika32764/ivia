/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

import Utilities from '../util/utilities';

export default class Dispatcher {
  constructor () {
    this.watchers = {};
  }

  addWatcher (path, watcher) {
    let watchers = Utilities.get(this.watchers, path, []);

    return this;
  }

  removeWatcher (path) {
    Utilities.remove(this.watchers, path);

    return this;
  }

  getWatcher
}

class Node {
  constructor (name) {
    this.name = name;
    this.watchers = [];
    this.children = {};
  }

  pushWatcher (watcher) {
    this.watchers.push(watcher);

    return this;
  }

  removeCustomWatcher() {

  }

  addChild (name, node) {
    this.children[name] = node;

    return this;
  }

  removeChild(name) {
    delete this.children[name];

    return this;
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

export function defineReactive (object, key, value) {
  const property = Object.getOwnPropertyDescriptor(object, key);
  const observable = new Dispatcher;

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
