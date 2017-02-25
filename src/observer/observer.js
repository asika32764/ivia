/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

import Utilities from '../util/utilities';
import Dispatcher from './dispatcher';

/**
 * Observer object.
 */
export default class Observer {
  /**
   * Class init.
   *
   * @param {*}         value
   * @param {Dispatcher} dispatcher
   */
  constructor (value, dispatcher) {
    this.value = value;
    this.dispatcher = dispatcher;

    Utilities.define(value, '__observer__', this, false);
  }
}

export class ObserverFactory {
  /**
   * Class init.
   *
   * @param {Application} app
   */
  constructor (app) {
    this.app = app;
  }

  /**
   * Create observer object.
   *
   * @param {*} value
   *
   * @returns Observer|null
   */
  create (value) {
    if (!Utilities.isObject(value)) {
      return null;
    }

    let observer;

    if (!value.hasOwnProperty('__observer__') && value.__observer__ instanceof Observer) {
      observer = value.__observer__;
    } else if (Array.isArray(value)) {
      //observer = new Observer(value);

      value.forEach(val => this.create(val));
    } else if (Utilities.isPlainObject(value) && Object.isExtensible(value)) {
      observer = new Observer(value, new Dispatcher(this.app));

      for (let key of Object.keys(value)) {
        this.reactive(value, key, value[key]);
      }
    }

    return observer;
  }

  /**
   * Make a value reactive.
   *
   * This method will add getter and setter to a value and inject Dispatcher to setter,
   * So we can notify Watchers if value has been set a new value.
   *
   * @param {Object} object
   * @param {string} key
   * @param {*}      value
   */
  reactive (object, key, value) {
    const property = Object.getOwnPropertyDescriptor(object, key);
    const dispatcher = new Dispatcher(this.app);
    const self = this;

    if (property && property.configurable === false) {
      return;
    }

    const getter = property && property.get;
    const setter = property && property.set;

    let childObserver = this.create(value);

    Object.defineProperty(object, key, {
      get: function () {
        value = getter ? getter.call(object) : value;

        /*
         * If there is an active Watcher working, means this watcher depends on current value,
         * Let's push it into current Dispatcher instance.
         */
        if (self.app.currentWatcher) {
          self.app.currentWatcher.addDispatcher(dispatcher);

          // If child value is object, also inject active Watcher to their dispatcher.
          if (childObserver) {
            self.app.currentWatcher.addDispatcher(childObserver.dispatcher);
          }

          if (Array.isArray(value)) {
            self.attachArray(value);
          }
        }

        return value;
      },
      set: function (newValue) {
        const oldValue = getter ? getter.call(object) : value;

        if (newValue === oldValue || (newValue !== newValue && oldValue !== oldValue)) {
          return;
        }

        if (setter) {
          setter.call(object, newValue);
        } else {
          value = newValue;
        }

        childObserver = self.create(newValue);

        dispatcher.notify();
      }
    });
  }

  /**
   * Attach observer to array
   * @param {Array} value
   */
  attachArray (value = []) {
    for (let ele of value) {
      ele && ele.__observer__ && this.app.currentWatcher.addDispatcher(ele.__observer__.dispatcher);

      if (Array.isArray(ele)) {
        this.attachArray(ele);
      }
    }
  }
}
