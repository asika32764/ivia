/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import { createObservable } from './observer/observable';
import Watcher from './observer/watcher';

/**
 * Default options.
 *
 * @type {Object}
 */
const defaultOptions = {};

export default class SparrowCore {
  constructor ($) {
    this.$ = $;
  }

  init(instance, options = {}) {
    this.$el = this.marshalElement.call(options.el);
    this.data = options.data;
    this.options = $.extend(true, {}, defaultOptions, options);
    this.watchers = {};
    this.instance = instance;

    this.initState();
    this.options.created.call(instance);

    // Push properties back to instance
    instance.$ = $;
    instance.$el = this.$el;
    instance.data = this.data;
  }

  initState() {
    createObservable(this.data);

    //for (let i in this.data) {
    //  this.instance[i] = this.data[i];
    //}

    console.log(this.data);
  }

  addWatcher(path, $element, callback) {
    let paths = path.split('.');
    let current;
    let previous = this.data;
    let key;

    for (key of paths) {
      current = previous[key];
    }

    previous.__ob__.get(key).addWatcher(new Watcher(key, $element, callback));

    return this;
  }

  marshalElement ($element) {
    if (typeof $element === 'string' || (typeof $element === 'object' && !($element instanceof this.$))) {
      $element = this.$($element);
    }

    return $element;
  }
}
