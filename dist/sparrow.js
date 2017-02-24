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
        return watcher.update();
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

var defaultOptions = {
  deep: false,
  user: false,
  sync: false,
  computed: false,
  deferred: false
};

var Watcher = function () {
  function Watcher(app, path, callback) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Watcher);

    this.options = app.$.extend({}, defaultOptions, options);

    this.id = ++uid;
    this.path = path;
    this.callback = callback;
    this.app = app;
    this.active = true;
    this.deep = this.options.deep;
    this.user = this.options.user;
    this.sync = this.options.sync;
    this.computed = this.options.computed;
    this.deferred = this.options.deferred;
    this.expression = ''; // TODO: print handler string if DEBUG
    this.dispatcherIds = [];
    this.dispatchers = [];
    this.newDisptacherIds = [];
    this.newDisptachers = [];

    if (typeof this.path === 'function') {
      this.getter = this.path;
    } else {
      this.getter = function (value) {
        return _utilities2.default.get(value, path);
      };
    }

    this.value = this.computed ? undefined : this.get();
  }

  _createClass(Watcher, [{
    key: 'get',
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
    key: 'update',
    value: function update() {
      if (this.computed) {
        this.deferred = true;
      } else if (this.sync) {
        this.run();
      } else {
        this.app.scheduler.enqueueWatcher(this);
      }
    }
  }, {
    key: 'run',
    value: function run() {
      if (this.active) {
        var value = this.get();

        if (value !== this.value || this.deep || _utilities2.default.isObject(value)) {
          var oldValue = this.value;
          this.value = value;

          this.callback.call(this.app, value, oldValue);
        }
      }
    }
  }, {
    key: 'getCachedValue',
    value: function getCachedValue() {
      if (this.defer) {
        this.get();
        this.defer = false;
      }

      // Push all dispatchers of this watcher to current active watcher.
      if (this.app.currentWatcher) {
        for (var k in this.watcher.dispatchers) {
          this.dispatchers[k].attach(this.app.currentWatcher);
        }
      }

      return this.value;
    }
  }, {
    key: 'resetDispatchers',
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
    key: 'addDispatcher',
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
    key: 'removeDispatcher',
    value: function removeDispatcher(dispatcher) {
      _utilities2.default.removeElement(this.dispatchers, dispatcher);
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.dispatchers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var dispatcher = _step2.value;

          dispatcher.detach(this);
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
  }, {
    key: 'isNative',
    value: function isNative(object) {
      return (/native code/.test(object.toString())
      );
    }
  }, {
    key: 'isReserved',
    value: function isReserved(string) {
      var str = (string + '').charCodeAt(0);
      return str === '$' || str === '_';
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

exports.proxy = proxy;

var _observer = __webpack_require__(4);

var _watcher = __webpack_require__(1);

var _watcher2 = _interopRequireDefault(_watcher);

var _registry = __webpack_require__(8);

var _registry2 = _interopRequireDefault(_registry);

var _scheduler = __webpack_require__(6);

var _scheduler2 = _interopRequireDefault(_scheduler);

var _error = __webpack_require__(10);

var _error2 = _interopRequireDefault(_error);

var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default options.
 *
 * @type {Object}
 */
var defaultOptions = {
  data: {}
};

var uid = 0;

var Application = function () {
  function Application($) {
    _classCallCheck(this, Application);

    this.id = ++uid;
    this.$ = $;
    this.watchers = [];
    this.currentWatcher = null;
    this.watcherStack = [];

    this.registry = new _registry2.default(this, {
      'observerFactory': new _observer.ObserverFactory(this),
      'scheduler': new _scheduler2.default(this),
      'error': new _error2.default()
    });
  }

  _createClass(Application, [{
    key: "init",
    value: function init(instance) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.$el = this.marshalElement.call(options.el);
      this.data = options.data;
      this.options = this.$.extend({}, defaultOptions, options);
      this.watchers = {};
      this.instance = instance;

      initState(this);

      // Lifecycle
      this.hook('created');

      // Push properties back to instance
      instance.$ = this.$;
      instance.$el = this.$el;
      instance.$data = this.options.data;
    }
  }, {
    key: "hook",
    value: function hook(name) {
      if (this.options.hasOwnProperty(name) && typeof this.options[name] === 'function') {
        this.options[name].call(this.instance);
      }
    }
  }, {
    key: "watch",
    value: function watch(path, callback) {
      var watcher = new _watcher2.default(this, path, callback);

      return this;
    }
  }, {
    key: "marshalElement",
    value: function marshalElement($element) {
      if (typeof $element === 'string' || (typeof $element === "undefined" ? "undefined" : _typeof($element)) === 'object' && !($element instanceof this.$)) {
        $element = this.$($element);
      }

      return $element;
    }
  }, {
    key: "pushStack",
    value: function pushStack(watcher) {
      if (this.currentWatcher) {
        this.watcherStack.push(this.currentWatcher);
      }

      this.currentWatcher = watcher;
    }
  }, {
    key: "popStack",
    value: function popStack() {
      this.currentWatcher = this.watcherStack.pop();
    }
  }]);

  return Application;
}();

exports.default = Application;


function initState(app) {
  // TODO: Init Props
  initData(app, app.options.data);

  if (app.options.methods) {
    initMethods(app, app.options.methods);
  }

  if (app.options.computed) {
    initComputed(app, app.options.computed);
  }

  if (app.options.watch) {
    initWatchers(app, app.options.watch);
  }
}

function initData(app, data) {
  // TODO: Check no props conflict
  for (var key in data) {
    if (!_utilities2.default.isReserved(key)) {
      proxy(app.instance, data, key);
    }
  }

  app.observerFactory.create(data);
}

function initMethods(app, methods) {
  var _loop = function _loop(key) {
    var method = app.methods[key];
    if (!app.options.data[key] && typeof method === 'function') {
      // Faster binding function
      app.instance[key] = function (arg) {
        var len = arguments.length;
        if (len === 1) {
          return method.call(app, arg);
        } else if (len === 0) {
          return method.call(app);
        }

        return method.apply(app, arguments);
      };
    }
  };

  for (var key in methods) {
    _loop(key);
  }
}

function initWatchers(app, watches) {
  for (var key in watches) {
    var handler = watches[key];
    var options = void 0;

    if (_utilities2.default.isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }

    if (typeof handler === 'string') {
      handler = app[handler];
    }

    app.watch(key, handler, options);
  }
}

function initComputed(app, computed) {
  var _loop2 = function _loop2(key) {
    var handler = computed[key];
    var setter = _utilities.nullFunction;
    var getter = void 0;
    var cache = void 0;

    getter = typeof handler === 'function' ? handler : handler.get;

    var watcher = new _watcher2.default(app, key, getter, { lazy: true });

    if (!app.hasOwnProperty(key)) {

      if (typeof handler !== 'function') {
        setter = handler.set;
        cache = handler.cache;
        getter = cache === false ? _utilities.nullFunction : function () {
          return watcher.getCachedValue();
        };
      }

      Object.defineProperty(app.data, key, {
        enumerable: true,
        configurable: true,
        get: getter,
        set: setter
      });
    }
  };

  for (var key in computed) {
    _loop2(key);
  }
}

function proxy(target, source, key) {
  Object.defineProperty(target, key, {
    get: function proxyGetter() {
      return source[key];
    },
    set: function proxySetter(value) {
      source[key] = value;
    }
  });
}

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

var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

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
      key: "bind",
      value: function bind(selector, key, callback) {
        var conditions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var $element = this.app.marshalElement(selector);

        // Default callback
        if (typeof callback === 'string') {
          var name = callback;
          callback = function callback($element, value) {
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

        this.app.watch(key, function (value, oldValue) {
          callback($element, value, oldValue);
        });

        return this;
      }
    }, {
      key: "on",
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
      key: "model",
      value: function model(selector, key) {
        var _this = this;

        var delegate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        this.bind(selector, key, 'value').on(selector, 'change', function (event) {
          return _utilities2.default.set(_this.app.data, key, _this.app.$(event.target).val());
        }, delegate).on(selector, 'keyup', function (event) {
          return _utilities2.default.set(_this.app.data, key, _this.app.$(event.target).val());
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
/* 6 */
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


var _queue = __webpack_require__(9);

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = {
  WAITING: 'waiting',
  RUNNING: 'running'
};

var maxCircularNumber = 1000;

var Scheduler = function () {
  function Scheduler(app) {
    _classCallCheck(this, Scheduler);

    this.app = app;
    this.queue = [];
    this.watchers = {};
    this.index = 0;
    this.state = State.WAITING;
    this.circular = [];
  }

  _createClass(Scheduler, [{
    key: 'setState',
    value: function setState(state) {
      this.state = state;
    }
  }, {
    key: 'is',
    value: function is(state) {
      return this.state === state;
    }
  }, {
    key: 'enqueueWatcher',
    value: function enqueueWatcher(watcher) {
      // Make sure watcher is already in queue
      if (!this.watchers[watcher.id]) {
        this.watchers[watcher.id] = true;

        switch (this.state) {
          case State.WAITING:
            this.queue.push(watcher);

            this.setState(State.RUNNING);

            _queue2.default.nextTick(this.execute, this);
            break;

          case State.RUNNING:
            // if already flushing, splice the watcher based on its id
            // if already past its id, it will be run next immediately.
            var i = this.queue.length - 1;

            while (i >= 0 && this.queue[i].id > watcher.id) {
              i--;
            }

            this.queue.splice(Math.max(i, this.index) + 1, 0, watcher);
        }
      }
    }
  }, {
    key: 'execute',
    value: function execute() {
      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is always
      //    created before the child)
      // 2. A component's user watchers are run before its render watcher (because
      //    user watchers are created before the render watcher)
      // 3. If a component is destroyed during a parent component's watcher run,
      //    its watchers can be skipped.
      this.queue.sort(function (a, b) {
        return a.id - b.id;
      });

      // do not cache length because more watchers might be pushed
      // as we run existing watchers
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _watcher = _step.value;

          this.index++;
          this.watchers[_watcher.id] = null;
          _watcher.run();

          // in dev build, check and stop circular updates.
          if (this.watchers[_watcher.id] != null) {
            this.circular[id] = (this.circular[id] || 0) + 1;
            if (this.circular[id] > maxCircularNumber) {
              // TODO: More debug info
              console.log('Infinite loop for max 1000 times');
              break;
            }
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

      var watcher = void 0;
      var i = this.queue.length;
      for (i; i < 0; i--) {
        watcher = this.queue[index];

        // TODO: call updated hook
      }

      this.reset();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.queue.length = 0;
      this.watchers = {};
      this.circular = {};
      this.setState(State.WAITING);
    }
  }]);

  return Scheduler;
}();

exports.default = Scheduler;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

// Browser environment sniffing
var inBrowser = exports.inBrowser = typeof window !== 'undefined';
var UA = exports.UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = exports.isIE = UA && /msie|trident/.test(UA);
var isIE9 = exports.isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = exports.isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = exports.isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = exports.isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

/***/ }),
/* 8 */
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
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

var Registry = function () {
  function Registry(app) {
    var store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Registry);

    this.app = app;
    this.store = {};

    for (var name in store) {
      this.set(name, store[name]);
    }
  }

  _createClass(Registry, [{
    key: "get",
    value: function get(name) {
      return this.store[name];
    }
  }, {
    key: "set",
    value: function set(name, value) {
      var _this = this;

      this.store[name] = value;

      Object.defineProperty(this.app, name, {
        get: function get() {
          return _this.get(name);
        }
      });

      return this;
    }
  }]);

  return Registry;
}();

exports.default = Registry;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

var _environment = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskQueue = {
  pending: false,
  tasks: [],
  handler: null,
  nextTick: function nextTick(callback, app) {
    var handler = this.getHandler();

    var _resolve = void 0;
    this.tasks.push(function () {
      if (callback) {
        callback.call(app);
      }

      if (_resolve) {
        _resolve(app);
      }
    });

    if (!this.pending) {
      this.pending = true;
      handler();
    }

    if (!callback && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      });
    }
  },
  execute: function execute() {
    TaskQueue.pending = false;
    var tasks = TaskQueue.tasks.slice(0);
    TaskQueue.tasks.length = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var task = _step.value;

        task();
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
  },
  /**
   * This method based on Vue.$nextTick to handle callback asynchronously.
   */
  getHandler: function getHandler() {
    var _this = this;

    if (typeof this.handler !== 'function') {
      // the nextTick behavior leverages the microtask queue, which can be accessed
      // via either native Promise.then or MutationObserver.
      // MutationObserver has wider support, however it is seriously bugged in
      // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
      // completely stops working after triggering a few times... so, if native
      // Promise is available, we will use it:
      /* istanbul ignore if */
      if (typeof Promise !== 'undefined' && _utilities2.default.isNative(Promise)) {
        var p = Promise.resolve();
        this.handler = function () {
          p.then(_this.execute).catch(function (err) {
            return console.error(err);
          });

          // in problematic UIWebViews, Promise.then doesn't completely break, but
          // it can get stuck in a weird state where callbacks are pushed into the
          // microtask queue but the queue isn't being flushed, until the browser
          // needs to do some other work, e.g. handle a timer. Therefore we can
          // "force" the microtask queue to be flushed by adding an empty timer.
          if (_environment.isIOS) {
            setTimeout(_utilities.nullFunction);
          }
        };
      } else if (typeof MutationObserver !== 'undefined' && (_utilities2.default.isNative(MutationObserver) ||
      // PhantomJS and iOS 7.x
      MutationObserver.toString() === '[object MutationObserverConstructor]')) {
        // use MutationObserver where native Promise is not available,
        // e.g. PhantomJS IE11, iOS7, Android 4.4
        var counter = 1;
        var observer = new MutationObserver(this.execute);
        var textNode = document.createTextNode(String(counter));
        observer.observe(textNode, {
          characterData: true
        });
        this.handler = function () {
          counter = (counter + 1) % 2;
          textNode.data = String(counter);
        };
      } else {
        // fallback to setTimeout
        /* istanbul ignore next */
        this.handler = function () {
          setTimeout(_this.execute, 0);
        };
      }
    }

    return this.handler;
  }
}; /**
    * Part of sparrow project.
    *
    * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
    * @license    __LICENSE__
    */

exports.default = TaskQueue;

/***/ }),
/* 10 */
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
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

var ErrorHandler = function () {
  function ErrorHandler(app) {
    _classCallCheck(this, ErrorHandler);

    this.app = app;
  }

  _createClass(ErrorHandler, [{
    key: "warn",
    value: function warn(message) {
      console.warn(message);
    }
  }, {
    key: "log",
    value: function log(message) {
      console.log(message);
    }
  }]);

  return ErrorHandler;
}();

exports.default = ErrorHandler;

/***/ })
/******/ ]);