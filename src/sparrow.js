/**
 * Part of Sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import SparrowCore from './core';

;(function ($) {
  /**
   * Plugin Name.
   *
   * @type {string}
   */
  const plugin = "sparrow";

  const core = new SparrowCore($);

  class Sparrow {
    constructor (options = {}) {
      core.init(this, options);
    }

    bind(selector, key, callback) {
      const $element = core.marshalElement(selector);

      // Default callback
      if (typeof callback === 'string') {
        const name = callback;
        callback = ($input, value) => {
          switch (name) {
            case ':html':
              $input.html(value);
              break;

            case ':text':
              $input.text(value);
              break;

            case 'value':
              if ($input[0].tagName === 'INPUT') {
                $input.val(value);
                break;
              }

            default:
              $input.attr(name, value);
          }
        };
      }

      core.addWatcher(key, $element, callback);

      return this;
    }

    on(selector, eventName, callback, delegate = false) {
      const $element = core.marshalElement(selector);

      if (delegate) {
        this.$el.on(eventName, selector, callback);
      } else {
        $element.on(eventName, callback);
      }

      return this;
    }

    model(selector, key, delegate = false) {
      this
        .bind(selector, key, 'value')
        .on(selector, 'change', event => {
          core.data[key] = $(event.target).val();
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
