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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Part of sparrow project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license    __LICENSE__
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _watcher = __webpack_require__(1);

var _watcher2 = _interopRequireDefault(_watcher);

var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

/**
 * Dispatcher object.
 */

var Dispatcher = function () {
  /**
   * Class init.
   * @param {Application} app
   * @param {Watcher[]}   watchers
   */
  function Dispatcher(app) {
    var watchers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Dispatcher);

    this.id = ++uid;
    this.watchers = watchers;
    this.app = app;
  }

  /**
   * Add Watcher.
   * @param {Watcher} watcher
   * @returns {function()}
   */


  _createClass(Dispatcher, [{
    key: "attach",
    value: function attach(watcher) {
      var _this = this;

      this.watchers.push(watcher);
      var removeDispatcher = watcher.addDispatcher(this);

      return function () {
        _this.detach(watcher);
        removeDispatcher();
      };
    }

    /**
     * Remove Watcher.
     * @param {Watcher} watcher
     * @returns {Dispatcher}
     */

  }, {
    key: "detach",
    value: function detach(watcher) {
      _utilities2.default.removeElement(this.watchers, watcher);

      watcher.removeDispatcher();

      return this;
    }

    /**
     * Attach current watcher to self.
     */

  }, {
    key: "attachCurrent",
    value: function attachCurrent() {
      if (this.app.currentWatcher) {
        this.attach(this.app.currentWatcher);
      }
    }

    /**
     * Notify all watchers to update themselves.
     */

  }, {
    key: "notify",
    value: function notify() {
      this.watchers.forEach(function (watcher) {
        return watcher.run();
      });
    }
  }]);

  return Dispatcher;
}();

exports.default = Dispatcher;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Part of sparrow project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license    __LICENSE__
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

var _dispatcher = __webpack_require__(0);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

var Watcher = function () {
  function Watcher(app, path, callback) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Watcher);

    this.id = ++uid;
    this.path = path;
    this.callback = callback;
    this.app = app;
    this.options = options;
    this.dispatcherIds = [];
    this.dispatchers = [];
    this.newDisptacherIds = [];
    this.newDisptachers = [];

    if (typeof path === 'function') {
      this.getter = path;
    } else {
      this.getter = function (value) {
        return _utilities2.default.get(value, path);
      };
    }

    this.value = this.get();
  }

  _createClass(Watcher, [{
    key: "get",
    value: function get() {
      this.app.pushStack(this);

      var value = void 0;

      value = this.getter.call(this.app, this.app.data);

      // TODO: deep

      this.app.popStack();

      this.resetDispatchers();

      return value;
    }
  }, {
    key: "run",
    value: function run() {}
  }, {
    key: "resetDispatchers",
    value: function resetDispatchers() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.dispatchers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dispatcher = _step.value;

          if (this.newDisptacherIds.indexOf(dispatcher.id) === -1) {
            dispatcher.detach(this);
          }
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

      var temp = void 0;
      temp = this.newDisptachers;
      this.dispatchers = this.newDisptachers;
      this.newDisptachers = temp;
      this.newDisptachers.length = 0;

      temp = this.newDisptacherIds;
      this.dispatcherIds = this.newDisptacherIds;
      this.newDisptacherIds = temp;
      this.newDisptacherIds.length = 0;
    }
  }, {
    key: "addDispatcher",
    value: function addDispatcher(dispatcher) {
      var id = dispatcher.id;
      if (this.newDisptacherIds.indexOf(id) === -1) {
        this.newDisptacherIds.push(id);
        this.newDisptachers.push(dispatcher);

        if (this.dispatcherIds.indexOf(id) === -1) {
          dispatcher.attach(this);
        }
      }
    }
  }, {
    key: "removeDispatcher",
    value: function removeDispatcher(dispatcher) {
      _utilities2.default.removeElement(this.dispatchers, dispatcher);
    }
  }]);

  return Watcher;
}();

exports.default = Watcher;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.nullFunction = nullFunction;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

var Utilities = function () {
  function Utilities() {
    _classCallCheck(this, Utilities);
  }

  _createClass(Utilities, null, [{
    key: 'get',
    value: function get(data, path, def) {
      if (path.indexOf('.') !== -1) {
        var paths = path.split('.');
        var key = paths.shift();

        if (!Utilities.has(data, key)) {
          return def;
        }

        return Utilities.get(data[key], paths.join('.'), def);
      }

      return Utilities.has(data, path) ? data[path] : def;
    }
  }, {
    key: 'set',
    value: function set(data, path, value) {
      if (path.indexOf('.') !== -1) {
        var paths = path.split('.');
        var key = paths.shift();

        if (!Utilities.has(data, key)) {
          data[key] = {};
        }

        data[key] = Utilities.set(data[key], paths.join('.'), value);

        return data;
      }

      data[path] = value;

      return data;
    }
  }, {
    key: 'remove',
    value: function remove(data, path) {
      if (path.indexOf('.') !== -1) {
        var paths = path.split('.');
        var key = paths.shift();

        if (!Utilities.has(data, key)) {
          return data;
        }

        Utilities.remove(data[key], paths.join('.'));

        return data;
      }

      _remove(data, path);

      return data;
    }
  }, {
    key: 'removeElement',
    value: function removeElement(arr, element) {
      if (arr.length) {
        var index = arr.indexOf(element);
        if (index > -1) {
          return arr.splice(index, 1);
        }
      }
    }
  }, {
    key: 'has',
    value: function has(data, key) {
      if (Array.isArray(data)) {
        return typeof data[key] !== 'undefined';
      } else if (Utilities.isObject(data)) {
        return data.hasOwnProperty(key);
      }

      return false;
    }
  }, {
    key: 'define',
    value: function define(object, key, value) {
      var enumerable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      Object.defineProperty(object, key, {
        value: value,
        enumerable: enumerable,
        writable: true,
        configurable: true
      });
    }
  }, {
    key: 'flatten',
    value: function flatten(data) {
      var toReturn = {};

      for (var i in data) {
        if (!data.hasOwnProperty(i)) continue;

        if (_typeof(data[i]) == 'object') {
          var flatObject = flattenObject(data[i]);
          for (var x in flatObject) {
            if (!flatObject.hasOwnProperty(x)) {
              continue;
            }

            toReturn[i + '.' + x] = flatObject[x];
          }
        } else {
          toReturn[i] = data[i];
        }
      }

      return toReturn;
    }
  }, {
    key: 'isObject',
    value: function isObject(data) {
      return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null;
    }
  }, {
    key: 'isPlainObject',
    value: function isPlainObject(data) {
      return Object.prototype.toString.call(data) === '[object Object]';
    }
  }]);

  return Utilities;
}();

exports.default = Utilities;


function _remove(data, key) {
  if (Array.isArray(data)) {
    if (data.length) {
      data.splice(key, 1);
    }

    return data;
  } else if (Utilities.isObject(data)) {
    delete data[key];

    return data;
  }

  return data;
}

function nullFunction() {}

/***/ }),
/* 3 */
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

var _observer = __webpack_require__(4);

var _watcher = __webpack_require__(1);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default options.
 *
 * @type {Object}
 */
var defaultOptions = {};

var uid = 0;

var Application = function () {
  function Application($) {
    _classCallCheck(this, Application);

    this.id = ++uid;
    this.$ = $;
    this.watchers = [];
    this.observerFactory = new _observer.ObserverFactory(this);
    this.currentWatcher = null;
    this.watcherStack = [];
  }

  _createClass(Application, [{
    key: 'init',
    value: function init(instance) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.$el = this.marshalElement.call(options.el);
      this.data = options.data;
      this.options = $.extend(true, {}, defaultOptions, options);
      this.watchers = {};
      this.app = instance;

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
      this.observerFactory.create(this.data);

      //for (let i in this.data) {
      //  this.instance[i] = this.data[i];
      //}

      console.log(this.data);
    }
  }, {
    key: 'addWatcher',
    value: function addWatcher(path, $element, callback) {
      var watcher = new _watcher2.default(this, path, callback);

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
  }, {
    key: 'pushStack',
    value: function pushStack(watcher) {
      if (this.currentWatcher) {
        this.watcherStack.push(this.currentWatcher);
      }

      this.currentWatcher = watcher;
    }
  }, {
    key: 'popStack',
    value: function popStack() {
      this.currentWatcher = this.watcherStack.pop();
    }
  }]);

  return Application;
}();

exports.default = Application;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObserverFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

var _dispatcher = __webpack_require__(0);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Part of sparrow project.
                                                                                                                                                           *
                                                                                                                                                           * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
                                                                                                                                                           * @license    __LICENSE__
                                                                                                                                                           */

/**
 * Observer object.
 */
var Observer =
/**
 * Class init.
 *
 * @param {*}         value
 * @param {Dispatcher} dispatcher
 */
function Observer(value, dispatcher) {
  _classCallCheck(this, Observer);

  this.value = value;
  this.dispatcher = dispatcher;

  _utilities2.default.define(value, '__observer__', this, false);
};

exports.default = Observer;

var ObserverFactory = exports.ObserverFactory = function () {
  /**
   * Class init.
   *
   * @param {Application} app
   */
  function ObserverFactory(app) {
    _classCallCheck(this, ObserverFactory);

    this.app = app;
  }

  /**
   * Create observer object.
   *
   * @param {*} value
   *
   * @returns Observer|null
   */


  _createClass(ObserverFactory, [{
    key: 'create',
    value: function create(value) {
      var _this = this;

      if (!_utilities2.default.isObject(value)) {
        return null;
      }

      var observer = void 0;

      if (!value.hasOwnProperty('__observer__') && value.__observer__ instanceof Observer) {
        observer = value.__observer__;
      } else if (Array.isArray(value)) {
        //observer = new Observer(value);

        value.forEach(function (val) {
          return _this.create(val);
        });
      } else if (_utilities2.default.isPlainObject(value) && Object.isExtensible(value)) {
        observer = new Observer(value, new _dispatcher2.default(this.app));

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            this.reactive(value, key, value[key]);
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

      return observer;
    }

    /**
     * Make a value reactive.
     *
     * This method will add getter and setter to a value and inject Dispatcher to setter,
     * So we can notify Watchers if value has been set a new value.
     *
     * @param {Object} object
     * @param {string} key
     * @param {*}      value
     */

  }, {
    key: 'reactive',
    value: function reactive(object, key, value) {
      var property = Object.getOwnPropertyDescriptor(object, key);
      var dispatcher = new _dispatcher2.default(this.app);
      var self = this;

      if (property && property.configurable === false) {
        return;
      }

      var getter = property && property.get;
      var setter = property && property.set;

      var childObserver = this.create(value);

      Object.defineProperty(object, key, {
        get: function get() {
          value = getter ? getter.call(object) : value;

          /*
           * If there is an active Watcher working, means this watcher depends on current value,
           * Let's push it into current Dispatcher instance.
           */
          if (self.app.currentWatcher) {
            dispatcher.attach(self.app.currentWatcher);

            // If child value is object, also inject active Watcher to their dispatcher.
            if (childObserver) {
              childObserver.dispatcher.attach(self.app.currentWatcher);
            }

            if (Array.isArray(value)) {
              self.attachArray(value);
            }
          }

          return value;
        },
        set: function set(newValue) {
          var oldValue = getter ? getter.call(object) : value;

          if (newValue === oldValue || newValue !== newValue && oldValue !== oldValue) {
            return;
          }

          if (setter) {
            setter.call(object, newValue);
          } else {
            value = newValue;
          }

          childObserver = self.create(newValue);

          dispatcher.notify();
        }
      });
    }

    /**
     * Attach observer to array
     * @param {Array} value
     */

  }, {
    key: 'attachArray',
    value: function attachArray() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var ele = _step2.value;

          ele && ele.__observer__ && ele.__observer__.dispatcher.attach(this.app.currentWatcher);

          if (Array.isArray(ele)) {
            this.attachArray(ele);
          }
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
    }
  }]);

  return ObserverFactory;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Part of Sparrow project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license    GNU General Public License version 2 or later.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _app = __webpack_require__(3);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
  /**
   * Plugin Name.
   *
   * @type {string}
   */
  var plugin = "sparrow";

  var Sparrow = function () {
    function Sparrow() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Sparrow);

      this.app = new _app2.default($);
      this.app.init(this, options);
    }

    _createClass(Sparrow, [{
      key: 'bind',
      value: function bind(selector, key, callback) {
        var $element = this.app.marshalElement(selector);

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

        this.app.addWatcher(key, $element, callback);

        return this;
      }
    }, {
      key: 'on',
      value: function on(selector, eventName, callback) {
        var delegate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var $element = this.app.marshalElement(selector);

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
          _this.app.data[key] = $(event.target).val();
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