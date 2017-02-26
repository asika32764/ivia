/**
 * Part of Sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import Application from './app';
import Utilities from "./util/utilities";
import SPromise from "./promise/promise";

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

    bind (selector, key, callback) {
      const $element = this.app.find(selector);

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
                switch ($element.attr('type')) {
                  case 'radio':
                  case 'checkbox':
                    $element.filter(`[value=${value}]`).prop('checked', true);
                    break;
                  default:
                    $element.val(value);
                }
                break;
              }
            default:
              $element.attr(name, value);
          }
        };
      }

      this.app.watch(key, function biding (value, oldValue, ctrl) {
        callback.call(this, $element, value, oldValue, ctrl);
      }, {dom: true});

      return this;
    }

    on (selector, eventName, callback, delegate = false) {
      const $element = this.app.find(selector);
      let self = this;

      const handler = function (event) {
        callback.call(self, self.$(this), event);
      };

      if (delegate) {
        this.app.$el.on(eventName, selector, handler);
      } else {
        $element.on(eventName, handler);
      }

      return this;
    }

    model (selector, key, delegate = false) {
      const handler = function ($element, event) {
        let value;
        switch ($element.attr('type')) {
          case 'radio':
            value = $element[0].value;
            break;
          default:
            value = $element.val();
        }

        return Utilities.set(this.app.data, key, value);
      };

      this
        .bind(selector, key, 'value')
        .on(selector, 'change', handler, delegate)
        .on(selector, 'keyup', handler, delegate);
    }
  }

  Sparrow.Promise = Application.Promise;

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
