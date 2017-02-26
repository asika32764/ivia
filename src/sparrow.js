/**
 * Part of Sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import Application from './app';
import createElement from './dom/element';

(function ($) {
  /**
   * Plugin Name.
   *
   * @type {string}
   */
  const plugin = "sparrow";

  class Sparrow {
    constructor (options = {}, $ = null) {
      let el = null;
      $ = $ || Sparrow.$;

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

    static plugin (name, options = {}) {
      const $ = Sparrow.$;

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
  Sparrow.$ = $;
  Sparrow.plugin(plugin);

  window.Sparrow = Sparrow;

})(jQuery);
