/**
 * Part of Ivia project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    The MIT License (MIT)
 */

import Application from './app';
import createElement from './dom/element';

const plugin = "ivia";

export default class Ivia {
  constructor (options = {}, $ = null) {
    let el = null;
    $ = $ || Ivia.$;

    if (!$) {
      throw new Error('Ivia.$ is NULL, please set jQuery or Zepto object into it.');
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
    Object.defineProperty(Ivia, '$', {
      value: value
    });

    Ivia.$._name = ('zepto' in Ivia.$) ? 'Zepto' : 'jQuery';

    Ivia.plugin(plugin);
  }

  static plugin (name, options = {}) {
    const $ = Ivia.$;

    if (!$) {
      throw new Error('Ivia.$ is NULL, please set jQuery or Zepto object into it.');
    }

    if (typeof $.fn === 'undefined') {
      $('body'); // Test document
      throw new Error('Ivia.$.fn not exists, are you sure you inject a jQuery / Zepto object?');
    }

    $.fn[name] = function (customOptions) {
      const $this = $(this[0]);

      if (!$this.data(name)) {
        options = $.extend(true, {}, options, customOptions);
        options.el = $this;

        $this.data(name, new Ivia(options));
      }

      return $this.data(name);
    };
  }
}

Ivia.prototype.$createElement = Ivia.createElement = createElement;
Ivia.Promise = Application.Promise;
