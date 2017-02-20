/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Part of sparrow project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license    GNU General Public License version 2 or later.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _observer = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default options.
 *
 * @type {Object}
 */
var defaultOptions = {};

var SparrowCore = function () {
  function SparrowCore($) {
    _classCallCheck(this, SparrowCore);

    this.$ = $;
  }

  _createClass(SparrowCore, [{
    key: 'init',
    value: function init(instance) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
  }, {
    key: 'initState',
    value: function initState() {
      (0, _observer.createChildObserver)(this.data);
      console.log(this.data);
    }
  }, {
    key: 'notify',
    value: function notify(key) {
      var _this = this;

      if (!this.watchers[key]) {
        return;
      }

      $.each(this.watchers[key], function (i, e) {
        e.callback(e.element, _this.data[key]);
      });
    }
  }, {
    key: 'marshalElement',
    value: function marshalElement($element) {
      if (typeof $element === 'string' || (typeof $element === 'undefined' ? 'undefined' : _typeof($element)) === 'object' && !($element instanceof this.$)) {
        $element = this.$($element);
      }

      return $element;
    }
  }]);

  return SparrowCore;
}();

exports.default = SparrowCore;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

var Dispatcher = function () {
  function Dispatcher() {
    var watchers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Dispatcher);

    this.watchers = watchers;
  }

  _createClass(Dispatcher, [{
    key: "notify",
    value: function notify() {
      this.watchers.forEach(function () {
        this.update();
      });
    }
  }]);

  return Dispatcher;
}();

exports.default = Dispatcher;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Part of sparrow project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license    GNU General Public License version 2 or later.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.createChildObserver = createChildObserver;
exports.defineReactive = defineReactive;

var _dispatcher = __webpack_require__(1);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function () {
  function Observer(value) {
    var dispatcher = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Observer);

    this.value = value;
    this.dispatcher = dispatcher || new _dispatcher2.default();

    this.prepareProperties(value);
  }

  _createClass(Observer, [{
    key: 'prepareProperties',
    value: function prepareProperties(value) {
      if (Array.isArray(value)) {
        value.forEach(function () {
          createChildObserver(this);
        });
      } else {
        var keys = Object.keys(value);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            defineReactive(value, key, value[key]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }]);

  return Observer;
}();

exports.default = Observer;
function createChildObserver(value) {
  if (value === null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
    return;
  }

  if (!value.hasOwnProperty('__ob__') || !(value.__ob__ instanceof Observer)) {
    Object.defineProperty(value, '__ob__', {
      value: new Observer(value),
      enumerable: false
    });
  }

  return value.__ob__;
}

function defineReactive(object, key, value) {
  var property = Object.getOwnPropertyDescriptor(object, key);

  if (property && property.configurable === false) {
    return;
  }

  var getter = property && property.get;
  var setter = property && property.set;

  var childObserver = createChildObserver(value);

  Object.defineProperty(object, key, {
    get: function get() {
      //value = getter ? getter.call(object) : value;

      return value;
    },
    set: function set(newValue) {
      // Loop deep
      createChildObserver(newValue);

      object.data[key] = newValue;
    }
  });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Part of Sparrow project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license    GNU General Public License version 2 or later.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
  /**
   * Plugin Name.
   *
   * @type {string}
   */
  var plugin = "sparrow";

  var core = new _core2.default($);

  var Sparrow = function () {
    function Sparrow() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Sparrow);

      core.init(this, options);
    }

    _createClass(Sparrow, [{
      key: 'bind',
      value: function bind(selector, key, callback) {
        var $element = core.marshalElement(selector);

        if (!core.watchers[key]) {
          core.watchers[key] = [];
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

        core.watchers[key].push({
          element: $element,
          callback: callback
        });

        return this;
      }
    }, {
      key: 'on',
      value: function on(selector, eventName, callback) {
        var delegate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var $element = core.marshalElement(selector);

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
        var _this = this;

        var delegate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        this.bind(selector, key, 'value').on(selector, 'change', function (event) {
          _this[key] = $(event.target).val();
        }, delegate);
      }
    }]);

    return Sparrow;
  }();

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

/***/ })
/******/ ]);