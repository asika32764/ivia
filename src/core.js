/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import { createChildObserver } from './observer/observer';

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

    this.initState();
    this.options.created.call(instance);

    // Push properties back to instance
    instance.$ = $;
    instance.$el = this.$el;
    instance.data = this.data;
  }

  initState() {
    createChildObserver(this.data);
    console.log(this.data);
  }

  notify(key) {
    if (!this.watchers[key]) {
      return;
    }

    $.each(this.watchers[key], (i, e) => {
      e.callback(e.element, this.data[key]);
    });
  }

  marshalElement ($element) {
    if (typeof $element === 'string' || (typeof $element === 'object' && !($element instanceof this.$))) {
      $element = this.$($element);
    }

    return $element;
  }
}
