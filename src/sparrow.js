/**
 * Part of Sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import Application from './app';
import Utilities from "./util/utilities";

;(function ($) {
  /**
   * Plugin Name.
   *
   * @type {string}
   */
  const plugin = "sparrow";

  class Sparrow {
    constructor (options = {}) {
      this.app = new Application($);
      this.app.init(this, options);
    }

    bind (selector, key, callback, conditions = {}) {
      const $element = this.app.marshalElement(selector);

      // Default callback
      if (typeof callback === 'string') {
        const name = callback;
        callback = ($element, value) => {
          switch (name) {
            case ':html':
              $element.html(value);
              break;

            case ':text':
              $element.text(value);
              break;

            case 'value':
              if ($element[0].tagName === 'INPUT') {
                $element.val(value);
                break;
              }

            default:
              $element.attr(name, value);
          }
        };
      }

      this.app.watch(key, $element, (value, oldValue) => {
        callback($element, value, oldValue);
      });

      return this;
    }

    on (selector, eventName, callback, delegate = false) {
      const $element = this.app.marshalElement(selector);

      if (delegate) {
        this.$el.on(eventName, selector, callback);
      } else {
        $element.on(eventName, callback);
      }

      return this;
    }

    model (selector, key, delegate = false) {
      this
        .bind(selector, key, 'value')
        .on(selector, 'change', event => {
          this.app.data[key] = $(event.target).val();
        }, delegate);
    }
  }

  /**
   * Push plugins.
   *
   * @param {Object} options
   *
   * @returns {*}
   */
  $.fn[plugin] = function (options) {
    if (!$.data(this, plugin)) {
      options.el = this;

      $.data(this, plugin, new Sparrow(options));
    }

    return $.data(this, plugin);
  };

  window.Sparrow = Sparrow;

})(jQuery);
