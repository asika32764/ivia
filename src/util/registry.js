/**
 * Part of ivia project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

export default class Registry {
  constructor (app, store = {}) {
    this.app = app;
    this.store = {};

    for (let name in store) {
      this.set(name, store[name]);
    }
  }

  get (name) {
    return this.store[name];
  }

  set (name, value) {
    this.store[name] = value;

    Object.defineProperty(this.app, name, {
      get: () => {
        return this.get(name);
      }
    });

    return this;
  }
}
