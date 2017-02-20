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

var _observable = __webpack_require__(4);

var _watcher = __webpack_require__(6);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      this.instance = instance;

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
      (0, _observable.createObservable)(this.data);

      //for (let i in this.data) {
      //  this.instance[i] = this.data[i];
      //}

      console.log(this.data);
    }
  }, {
    key: 'addWatcher',
    value: function addWatcher(path, $element, callback) {
      var paths = path.split('.');
      var current = void 0;
      var previous = this.data;
      var key = void 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          key = _step.value;

          current = previous[key];
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

      previous.__ob__.get(key).addWatcher(new _watcher2.default(key, $element, callback));

      return this;
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
/* 1 */,
/* 2 */,
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

        core.addWatcher(key, $element, callback);

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
        var delegate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        this.bind(selector, key, 'value').on(selector, 'change', function (event) {
          core.data[key] = $(event.target).val();
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

/***/ }),
/* 4 */
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

exports.createObservable = createObservable;
exports.defineReactive = defineReactive;

var _collection = __webpack_require__(5);

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observerable = function () {
  function Observerable() {
    var watchers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Observerable);

    this.watchers = watchers;
  }

  _createClass(Observerable, [{
    key: 'addWatcher',
    value: function addWatcher(watcher) {
      this.watchers.push(watcher);
    }
  }, {
    key: 'notify',
    value: function notify(value, oldValue) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.watchers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var watcher = _step.value;

          watcher.update(value, oldValue);
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
  }]);

  return Observerable;
}();

exports.default = Observerable;
function createObservable(value) {
  if (Array.isArray(value)) {
    value.forEach(function () {
      createObservable(this);
    });
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
    if (!value.hasOwnProperty('__ob__') || !(value.__ob__ instanceof _collection2.default)) {
      Object.defineProperty(value, '__ob__', {
        value: new _collection2.default(),
        enumerable: false
      });
    }

    var keys = Object.keys(value);

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        value.__ob__.add(key, defineReactive(value, key, value[key]));
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return value.__ob__;
  }
}

function defineReactive(object, key, value) {
  var property = Object.getOwnPropertyDescriptor(object, key);
  var observable = new Observerable();

  if (property && property.configurable === false) {
    return;
  }

  var getter = property && property.get;
  var setter = property && property.set;

  var childObserver = createObservable(value);

  Object.defineProperty(object, key, {
    get: function get() {
      //value = getter ? getter.call(object) : value;

      return value;
    },
    set: function set(newValue) {
      createObservable(object, key, newValue);

      observable.notify(newValue, value);

      value = newValue;
    }
  });

  return observable;
}

/***/ }),
/* 5 */
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

var ObservableCollection = function () {
  function ObservableCollection() {
    var observables = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ObservableCollection);

    this.observables = observables;
  }

  _createClass(ObservableCollection, [{
    key: 'get',
    value: function get(name) {
      if (this.has(name)) {
        return this.observables[name];
      }

      return null;
    }
  }, {
    key: 'has',
    value: function has(name) {
      return typeof this.observables[name] !== 'undefined';
    }
  }, {
    key: 'add',
    value: function add(name, observable) {
      this.observables[name] = observable;

      return this;
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      delete this.observables[name];

      return this;
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      return this.observables;
    }
  }, {
    key: 'notify',
    value: function notify(name) {
      var observable = this.get(name);

      if (observable) {
        observable.notify();
      }
    }
  }, {
    key: Symbol.iterator,
    value: function value() {
      return this.observables;
    }
  }]);

  return ObservableCollection;
}();

exports.default = ObservableCollection;

/***/ }),
/* 6 */
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

var Watcher = function () {
  function Watcher(key, $element, callback) {
    _classCallCheck(this, Watcher);

    this.key = key;
    this.callback = callback;
    this.$element = $element;
  }

  _createClass(Watcher, [{
    key: "update",
    value: function update(value) {
      var oldValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this.callback(this.$element, value, oldValue);
    }
  }]);

  return Watcher;
}();

exports.default = Watcher;

/***/ })
/******/ ]);