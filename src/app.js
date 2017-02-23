/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import { ObserverFactory } from './observer/observer';
import Watcher from "./observer/watcher";

/**
 * Default options.
 *
 * @type {Object}
 */
const defaultOptions = {};

let uid = 0;

export default class Application {
  constructor ($) {
    this.id = ++uid;
    this.$ = $;
    this.watchers = [];
    this.observerFactory = new ObserverFactory(this);
    this.currentWatcher = null;
    this.watcherStack = [];
  }

  init(instance, options = {}) {
    this.$el = this.marshalElement.call(options.el);
    this.data = options.data;
    this.options = $.extend(true, {}, defaultOptions, options);
    this.watchers = {};
    this.app = instance;

    this.initState();
    this.options.created.call(instance);

    // Push properties back to instance
    instance.$ = $;
    instance.$el = this.$el;
    instance.data = this.data;
  }

  initState() {
    this.observerFactory.create(this.data);

    //for (let i in this.data) {
    //  this.instance[i] = this.data[i];
    //}

    console.log(this.data);
  }

  addWatcher(path, $element, callback) {
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
