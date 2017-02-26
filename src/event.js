/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

export default class EventHandler {
  constructor (app) {
    this.app = app;
    this.events = {};
  }

  listen (name, callback) {
    if (Array.isArray(name)) {
      name.map(n => this.listen(n, callback));
      return this;
    }

    if (!this.events.hasOwnProperty(name)) {
      this.events[name] = [];
    }

    this.events[name].push(callback);

    return this;
  }

  once (name, callback) {
    const fn = () => {
      const r = callback.apply(this.app.instance, arguments);

      this.off(name);

      return r;
    };

    return this.listen(name, fn);
  }

  off (name = null, callback = null) {
    if (name === null) {
      this.events = {};
    } else if (Array.isArray(name)) {
      name.map(n => this.listen(n, callback));
      return this;
    }

    if (!this.events.hasOwnProperty(name)) {
      return this;
    }

    if (callback === null) {
      this.events[name] = [];
    } else if (typeof callback === 'function' && Array.isArray(this.events[name])) {
      for (let k in this.events[name]) {
        const fn = this.events[name][k];

        if (fn === callback) {
          this.events[name].splice(k, 1);
        }
      }
    }

    return this;
  }

  emit (name, ...args) {
    if (!this.events.hasOwnProperty(name)) {
      return this;
    }

    if (!Array.isArray(this.events[name])) {
      return this;
    }

    for (let k in this.events[name]) {
      const callback = this.events[name][k];
      callback.call(this.app.instance, ...args);
    }

    return this;
  }
}
