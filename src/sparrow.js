/**
 * Part of Sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    The MIT License (MIT)
 */

import Application from './app';
import createElement from './dom/element';

const plugin = "sparrow";

export default class Sparrow {
  constructor (options = {}, $ = null) {
    let el = null;
    $ = $ || Sparrow.$;

    if (!$) {
      console.error('Sparrow.$ is NULL, please set jQuery or Zepto object into it.');
    }

    if (options.domready) {
      el = options.el;
      options.el = null;

      $(document).ready($ => {
        this.$options.el = el;
        this.$mount(el);
      });
    }

    this.app = new Application($);
    this.app.init(this, options);
  }

  static set $(value) {
    Object.defineProperty(Sparrow, '$', {
      value: value
    });

    Sparrow.$._name = ('zepto' in Sparrow.$) ? 'Zepto' : 'jQuery';

    Sparrow.plugin(plugin);
  }

  static plugin (name, options = {}) {
    const $ = Sparrow.$;

    if (!$) {
      console.error('Sparrow.$ is NULL, please set jQuery or Zepto object into it.');
    }

    $.fn[name] = function (customOptions) {
      const $this = $(this[0]);

      if (!$this.data(name)) {
        options = $.extend(true, {}, options, customOptions);
        options.el = $this;

        $this.data(name, new Sparrow(options));
      }

      return $this.data(name);
    };
  }
}

Sparrow.prototype.$createElement = Sparrow.createElement = createElement;
Sparrow.Promise = Application.Promise;
