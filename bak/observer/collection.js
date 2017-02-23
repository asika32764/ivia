/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

export default class ObservableCollection {
  constructor (observables = {}) {
    this.observables = observables;
  }

  get(name) {
    if (this.has(name)) {
      return this.observables[name];
    }

    return null;
  }

  has(name) {
    return typeof this.observables[name] !== 'undefined';
  }

  add(name, observable) {
    this.observables[name] = observable;

    return this;
  }

  remove(name) {
    delete this.observables[name];

    return this;
  }

  getAll() {
    return this.observables;
  }

  notify(name) {
    let observable = this.get(name);

    if (observable) {
      observable.notify();
    }
  }

  [Symbol.iterator]() {
    return this.observables;
  }
}
