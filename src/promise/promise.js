/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
import Utilities from "../util/utilities";

const $ = window.jQuery;

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

  static rase (promises) {
    return $.when(...promises);
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
