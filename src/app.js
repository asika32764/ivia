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
import TaskQueue from "./observer/queue";
import ErrorHandler from "./error/error";
import Utilities, { nullFunction } from "./util/utilities";
import PromiseAdapter from "./promise/promise";

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
    this.watcher = null;
    this.watchers = [];
    this.currentWatcher = null;
    this.watcherStack = [];
    this.elements = {};

    this._isMounted = false;

    this.registry = new Registry(this, {
      'observerFactory': new ObserverFactory(this),
      'scheduler': new Scheduler(this),
      'error': new ErrorHandler
    });
  }

  init(instance, options = {}) {
    this.options = this.$.extend({}, defaultOptions, options);
    this.data = options.data;
    this.instance = instance;
    // Push properties back to instance
    instance.$ = this.$;
    instance.$data = this.options.data;
    instance.$find = this.find;

    this.hook('beforeCreate');

    initState(this);

    // Lifecycle
    this.hook('created');

    if (options.el) {
      this.mount(options.el);
    }
  }

  mount (el) {
    this.hook('beforeMount');

    this.$el = el instanceof this.$ ? el : this.$(el);
    this.instance.$el = this.$el;

    this._isMounted = true;

    this.hook('mounted');

    this.watcher = new Watcher(this, function () {
      this.app.watchers.map(watcher => watcher.update());
    }, nullFunction);

    // Manually add all watchers to root watcher
    this.currentWatcher = this.watcher;
    this.watchers.map(watcher => Utilities.get(this.data, watcher.path));
    this.currentWatcher = null;

    this.forceUpdate();
  }

  forceUpdate () {
    if (this.watcher) {
      this.watcher.update();
    }
  }

  hook (name) {
    if (this.options.hasOwnProperty(name) && typeof this.options[name] === 'function') {
      this.options[name].call(this.instance);
    }
  }

  watch (path, callback) {
    const watcher = new Watcher(this, path, callback);
    this.watchers.push(watcher);

    return (function unwatch () {
      watcher.teardown();
    });
  }

  find (selector, refresh = false) {
    if (typeof selector === 'object' && !(selector instanceof this.$)) {
      return this.$(selector);
    }

    if (selector === 'string') {
      if (!this.elements.hasOwnProperty(selector) || refresh) {
        this.elements[selector] = this.$el.find(selector);
      }

      return this.elements[selector];
    }

    return this.$(selector);
  }

  nextTick (callback) {
    return TaskQueue.nextTick(callback);
  }

  async (handler) {
    //const defaultOptions = {
    //  childList: true,
    //  attributes: true,
    //  characterData: true,
    //  subtree: true
    //};
    //
    //options = this.$.extend({}, defaultOptions, options);
    //
    //return new Promise(resolve => {
    //  const observer = new MutationObserver(() => {
    //    resolve.call(this.instance);
    //  });
    //
    //  observer.observe(this.$el[0], options);
    //
    //  handler.call(this.instance);
    //});

    return Application.Promise.resolve().then(handler);
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
    const method = methods[key];
    if (!app.options.data[key] && typeof method === 'function') {
      // Faster binding function
      app.instance[key] = Utilities.bind(method, app.instance);
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

Application.Promise = typeof Promise === 'undefined' ? PromiseAdapter : Promise;
