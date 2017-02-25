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

  on (name, callback) {
    if (Array.isArray(name)) {
      name.map(n => this.on(n, callback));
      return this;
    }

    add(this.events, name, callback);

    return this;
  }

  once (name, callback) {
    const fn = () => {
      const r = callback.apply(this.app.instance, arguments);

      this.off(name);

      return r;
    };

    return this.on(name, callback);
  }

  off (name = null, callback = null) {
    if (name === null) {
      this.events = {};
    } else if (Array.isArray(name)) {
      name.map(n => this.on(n, callback));
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

function add (queue, name, value) {
  if (!queue.hasOwnProperty(name)) {
    queue[name] = [];
  }

  queue[name].push(value);
}
