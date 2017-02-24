/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import { ObserverFactory } from './observer/observer';
import Watcher from "./observer/watcher";
import Registry from "./util/registry";
import Scheduler from "./observer/scheduler";
import ErrorHandler from "./error/error";
import Utilities, { nullFunction } from "./util/utilities";

/**
 * Default options.
 *
 * @type {Object}
 */
const defaultOptions = {
  data: {}
};

let uid = 0;

export default class Application {
  constructor ($) {
    this.id = ++uid;
    this.$ = $;
    this.watchers = [];
    this.currentWatcher = null;
    this.watcherStack = [];

    this.registry = new Registry(this, {
      'observerFactory': new ObserverFactory(this),
      'scheduler': new Scheduler(this),
      'error': new ErrorHandler
    });
  }

  init(instance, options = {}) {
    this.$el = this.marshalElement.call(options.el);
    this.data = options.data;
    this.options = this.$.extend({}, defaultOptions, options);
    this.watchers = {};
    this.instance = instance;

    initState(this);

    // Lifecycle
    this.hook('created');

    // Push properties back to instance
    instance.$ = this.$;
    instance.$el = this.$el;
    instance.$data = this.options.data;
  }

  hook (name) {
    if (this.options.hasOwnProperty(name) && typeof this.options[name] === 'function') {
      this.options[name].call(this.instance);
    }
  }

  watch (path, callback) {
    const watcher = new Watcher(this, path, callback);

    return this;
  }

  marshalElement ($element) {
    if (typeof $element === 'string' || (typeof $element === 'object' && !($element instanceof this.$))) {
      $element = this.$($element);
    }

    return $element;
  }

  pushStack (watcher) {
    if (this.currentWatcher) {
      this.watcherStack.push(this.currentWatcher);
    }

    this.currentWatcher = watcher;
  }

  popStack () {
    this.currentWatcher = this.watcherStack.pop();
  }
}

function initState (app) {
  // TODO: Init Props
  initData(app, app.options.data);

  if (app.options.methods) {
    initMethods(app, app.options.methods);
  }

  if (app.options.computed) {
    initComputed(app, app.options.computed);
  }

  if (app.options.watch) {
    initWatchers(app, app.options.watch);
  }
}

function initData (app, data) {
  // TODO: Check no props conflict
  for (let key in data) {
    if (!Utilities.isReserved(key)) {
      proxy(app.instance, data, key);
    }
  }

  app.observerFactory.create(data);
}

function initMethods (app, methods) {
  for (let key in methods) {
    const method = app.methods[key];
    if (!app.options.data[key] && typeof method === 'function') {
      // Faster binding function
      app.instance[key] = (function (arg) {
        const len = arguments.length;
        if (len === 1) {
          return method.call(app, arg);
        } else if (len === 0) {
          return method.call(app);
        }

        return method.apply(app, arguments);
      });
    }
  }
}

function initWatchers (app, watches) {
  for (let key in watches) {
    let handler = watches[key];
    let options;

    if (Utilities.isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }

    if (typeof handler === 'string') {
      handler = app[handler];
    }

    app.watch(key, handler, options);
  }
}

function initComputed (app, computed) {
  for (let key in computed) {
    const handler = computed[key];
    let setter = nullFunction;
    let getter;
    let cache;

    getter = typeof handler === 'function' ? handler : handler.get;

    const watcher = new Watcher(app, key, getter, {lazy: true});

    if (!app.hasOwnProperty(key)) {

      if (typeof handler !== 'function') {
        setter = handler.set;
        cache  = handler.cache;
        getter = cache === false ? nullFunction : function () {
          return watcher.getCachedValue();
        };
      }

      Object.defineProperty(app.data, key, {
        enumerable: true,
        configurable: true,
        get: getter,
        set: setter
      });
    }
  }
}

export function proxy (target, source, key) {
  Object.defineProperty(target, key, {
    get: function proxyGetter () {
      return source[key]
    },
    set: function proxySetter (value) {
      source[key] = value;
    }
  });
}
