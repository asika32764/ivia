/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
import Utilities from "../util/utilities";

const $ = window.jQuery;

let uid = 0;
const events = {};

export default class PromiseAdapter {
  constructor (callback) {
    const deferred = $.Deferred();
    const resolve = deferred.resolve;
    const reject = deferred.reject;

    callback(resolve, reject);

    this.defer = $.when(deferred);
  }

  then (onFulfilled, onRejected) {
    return this.defer.then(onFulfilled, onRejected);
  }

  catch (handler) {
    return this.defer.catch(onRejected);
  }

  static all (promises) {
    return $.when(...promises);
  }

  static race (promises) {
    let id = ++uid;
    const eventName = 'sparrow.promise.race.' + id;

    return new PromiseAdapter(resolve => {
      events[eventName] = (v) => {
        resolve(v);
        delete events[eventName];
      };

      promises.map(promise => {
        promise.then((v) => {
          if (events.hasOwnProperty(eventName)) {
            events[eventName](v);
          }
        });
      });
    });
  }

  static resolve (object) {
    if (object instanceof PromiseAdapter) {
      object.defer.resolve();

      return object;
    }

    const promise = new PromiseAdapter(resolve => resolve(object));

    if (Utilities.isObject(object) && object.hasOwnProperty('then')) {
      return promise.then(object.then);
    }

    return promise;
  }

  static reject (reason) {
    return new PromiseAdapter((resolve, reject) => reject(reason));
  }
}
