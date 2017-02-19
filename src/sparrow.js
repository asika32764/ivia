/**
 * Part of Sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

;(function ($) {
  /**
   * Plugin Name.
   *
   * @type {string}
   */
  const plugin = "sparrow";

  /**
   * Default options.
   *
   * @type {Object}
   */
  const defaultOptions = {};

  class Sparrow {
    constructor(options = {}) {
      this.$ = $;
      this.$el = marshalElement.call(this, options.el);
      this.data = options.data;
      this.options = $.extend(true, {}, defaultOptions, options);
      this.boardcasts = {};

      this.init();
      this.options.created.call(this);
    }

    init() {
      // Build data and methods
      $.each(this.options.data, (key, value) => {
        defineReactive(this, key, value);
      });
    }

    bind(selector, key, callback) {
      const $element = marshalElement.call(this, selector);

      if (!this.boardcasts[key]) {
        this.boardcasts[key] = [];
      }

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

      this.boardcasts[key].push({
        element: $element,
        callback: callback
      });

      return this;
    }

    on(selector, eventName, callback, delegate = false) {
      const $element = marshalElement.call(this, selector);

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
          this[key] = $(event.target).val();
        }, delegate);
    }

    notify(key) {
      if (!this.boardcasts[key]) {
        return;
      }

      $.each(this.boardcasts[key], (i, e) => {
        e.callback(e.element, this.data[key]);
      });
    }
  }

  function marshalElement ($element) {
    if (typeof $element === 'string' || !($element instanceof this.$)) {
      $element = this.$($element);
    }

    return $element;
  }

  function defineReactive(object, key, value) {
    const property = Object.getOwnPropertyDescriptor(object, key);

    if (property && property.configurable === false) {
      return;
    }

    const getter = property && property.get;
    const setter = property && property.set;

    Object.defineProperty(object, key, {
      get: function () {
        //value = getter ? getter.call(object) : value;
        object.notify(key);
        return object.data[key];
      },
      set: function (newValue) {
        object.data[key] = newValue;
        object.notify(key);
      }
    });
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
