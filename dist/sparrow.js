'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  var plugin = "sparrow";

  /**
   * Default options.
   *
   * @type {Object}
   */
  var defaultOptions = {};

  var Sparrow = function () {
    function Sparrow() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Sparrow);

      this.$ = $;
      this.$el = marshalElement.call(this, options.el);
      this.data = options.data;
      this.options = $.extend(true, {}, defaultOptions, options);
      this.boardcasts = {};

      this.init();
      this.options.created.call(this);
    }

    _createClass(Sparrow, [{
      key: 'init',
      value: function init() {
        var _this = this;

        // Build data and methods
        $.each(this.options.data, function (key, value) {
          defineReactive(_this, key, value);
        });
      }
    }, {
      key: 'bind',
      value: function bind(selector, key, callback) {
        var $element = marshalElement.call(this, selector);

        if (!this.boardcasts[key]) {
          this.boardcasts[key] = [];
        }

        // Default callback
        if (typeof callback === 'string') {
          var name = callback;
          callback = function callback($input, value) {
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
    }, {
      key: 'on',
      value: function on(selector, eventName, callback) {
        var delegate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var $element = marshalElement.call(this, selector);

        if (delegate) {
          this.$el.on(eventName, selector, callback);
        } else {
          $element.on(eventName, callback);
        }

        return this;
      }
    }, {
      key: 'model',
      value: function model(selector, key) {
        var _this2 = this;

        var delegate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        this.bind(selector, key, 'value').on(selector, 'change', function (event) {
          _this2[key] = $(event.target).val();
        }, delegate);
      }
    }, {
      key: 'notify',
      value: function notify(key) {
        var _this3 = this;

        if (!this.boardcasts[key]) {
          return;
        }

        $.each(this.boardcasts[key], function (i, e) {
          e.callback(e.element, _this3.data[key]);
        });
      }
    }]);

    return Sparrow;
  }();

  function marshalElement($element) {
    if (typeof $element === 'string' || !($element instanceof this.$)) {
      $element = this.$($element);
    }

    return $element;
  }

  function defineReactive(object, key, value) {
    var property = Object.getOwnPropertyDescriptor(object, key);

    if (property && property.configurable === false) {
      return;
    }

    var getter = property && property.get;
    var setter = property && property.set;

    Object.defineProperty(object, key, {
      get: function get() {
        //value = getter ? getter.call(object) : value;
        object.notify(key);
        return object.data[key];
      },
      set: function set(newValue) {
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