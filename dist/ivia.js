var Ivia =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.nullFunction = nullFunction;

var _ivia = __webpack_require__(1);

var _ivia2 = _interopRequireDefault(_ivia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      return _ivia2.default.$.isPlainObject(data);
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
  }, {
    key: 'bind',
    value: function bind(method, target) {
      return function (arg) {
        var len = arguments.length;
        if (len === 1) {
          return method.call(target, arg);
        } else if (len === 0) {
          return method.call(target);
        }

        return method.apply(target, arguments);
      };
    }
  }, {
    key: 'isJquery',
    value: function isJquery(object) {
      if (!Utilities.isObject(object)) {
        return false;
      }

      if (object instanceof _ivia2.default.$ || 'jquery' in object) {
        return true;
      }

      if ('zepto' in _ivia2.default.$) {
        return _ivia2.default.$.zepto.isZ(object);
      }

      return false;
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = __webpack_require__(3);

var _app2 = _interopRequireDefault(_app);

var _element = __webpack_require__(6);

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var plugin = "ivia";

var Ivia = function () {
  function Ivia() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var $ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Ivia);

    var el = null;
    $ = $ || Ivia.$;

    if (!$) {
      throw new Error('Ivia.$ is NULL, please set jQuery or Zepto object into it.');
    }

    if (options.domready) {
      el = options.el;
      options.el = null;

      $(document).ready(function ($) {
        _this.$options.el = el;
        _this.$mount(el);
      });
    }

    this.app = new _app2.default($);
    this.app.init(this, options);
  }

  _createClass(Ivia, null, [{
    key: 'plugin',
    value: function plugin(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var $ = Ivia.$;

      if (!$) {
        throw new Error('Ivia.$ is NULL, please set jQuery or Zepto object into it.');
      }

      if (typeof $.fn === 'undefined') {
        $('body');
        throw new Error('Ivia.$.fn not exists, are you sure you inject a jQuery / Zepto object?');
      }

      $.fn[name] = function (customOptions) {
        var $this = $(this[0]);

        if (!$this.data(name)) {
          options = $.extend(true, {}, options, customOptions);
          options.el = $this;

          $this.data(name, new Ivia(options));
        }

        return $this.data(name);
      };
    }
  }, {
    key: '$',
    set: function set(value) {
      Object.defineProperty(Ivia, '$', {
        value: value
      });

      Ivia.$._name = 'zepto' in Ivia.$ ? 'Zepto' : 'jQuery';

      Ivia.plugin(plugin);
    }
  }]);

  return Ivia;
}();

exports.default = Ivia;


Ivia.prototype.$createElement = Ivia.createElement = _element2.default;
Ivia.Promise = _app2.default.Promise;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
var inBrowser = exports.inBrowser = typeof window !== 'undefined';
var UA = exports.UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = exports.isIE = UA && /msie|trident/.test(UA);
var isIE9 = exports.isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = exports.isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = exports.isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = exports.isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.proxy = proxy;
exports.proxyMethod = proxyMethod;

var _observer = __webpack_require__(11);

var _watcher = __webpack_require__(5);

var _watcher2 = _interopRequireDefault(_watcher);

var _registry = __webpack_require__(14);

var _registry2 = _interopRequireDefault(_registry);

var _scheduler = __webpack_require__(12);

var _scheduler2 = _interopRequireDefault(_scheduler);

var _queue = __webpack_require__(4);

var _queue2 = _interopRequireDefault(_queue);

var _error = __webpack_require__(8);

var _error2 = _interopRequireDefault(_error);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _promise = __webpack_require__(13);

var _promise2 = _interopRequireDefault(_promise);

var _event = __webpack_require__(9);

var _event2 = _interopRequireDefault(_event);

var _form = __webpack_require__(7);

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  data: {}
};

var uid = 0;

var Application = function () {
  function Application($) {
    _classCallCheck(this, Application);

    this.id = ++uid;
    this.$ = $;
    this.watcher = null;
    this.watchers = [];
    this.currentWatcher = null;
    this.watcherStack = [];
    this.elements = {};

    this._isMounted = false;

    this.registry = new _registry2.default(this, {
      'observerFactory': new _observer.ObserverFactory(this),
      'scheduler': new _scheduler2.default(this),
      'error': new _error2.default(),
      'event': new _event2.default(this)
    });
  }

  _createClass(Application, [{
    key: "init",
    value: function init(instance) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.options = this.$.extend({}, defaultOptions, options);
      this.data = options.data;
      this.instance = instance;

      instance.$ = this.$;
      instance.$data = this.options.data;
      instance.$options = this.options;
      proxyMethod(instance, this, 'find');
      proxyMethod(instance, this, 'async');
      proxyMethod(instance, this, 'mount', true);
      proxyMethod(instance, this, 'bind', true);
      proxyMethod(instance, this, 'on', true);
      proxyMethod(instance, this, 'model', true);
      proxyMethod(instance, this, 'show', true);
      proxyMethod(instance, this, 'hide', true);
      proxyMethod(instance, this, 'wrap', true);
      proxyMethod(instance, this, 'watch', true);
      proxyMethod(instance, this, 'nextTick');
      proxyMethod(instance, this, 'forceUpdate', true);
      proxyMethod(instance, this.event, 'listen', true);
      proxyMethod(instance, this.event, 'off', true);
      proxyMethod(instance, this.event, 'once', true);
      proxyMethod(instance, this.event, 'emit', true);
      proxyMethod(instance, this.observerFactory, 'set', true);
      proxyMethod(instance, this.observerFactory, 'delete', true);

      this.hook('beforeCreate');

      initState(this);

      this.hook('created');

      if (options.el) {
        this.mount(options.el);
      }
    }
  }, {
    key: "mount",
    value: function mount(el) {
      if (this._isMounted) {
        this.error.warn('This app has been already mounted.');
        return;
      }

      this.hook('beforeMount');

      var $el = _utilities2.default.isJquery(el) ? el : this.$(el);

      if ($el.length === 0) {
        if (true) {
          var str = $el.selector ? $el.selector : $el[0] + '';
          this.error.warn("Can not mount " + str + ", element not found. Consider change selector or call after \"domready\".");
        }

        return;
      }

      this.instance.$el = this.$el = $el;

      this._isMounted = true;

      this.hook('configure');

      this.hook('mounted');

      this.watcher = new _watcher2.default(this, function () {
        this.app.watchers.map(function (watcher) {
          return watcher.update();
        });
      }, _utilities.nullFunction);

      this.forceUpdate();
    }
  }, {
    key: "forceUpdate",
    value: function forceUpdate() {
      if (this.watcher) {
        this.watcher.update();
      }
    }
  }, {
    key: "hook",
    value: function hook(name) {
      if (this.options.hasOwnProperty(name) && typeof this.options[name] === 'function') {
        this.options[name].call(this.instance);
      }
    }
  }, {
    key: "bind",
    value: function bind(selector, key, callback) {
      var $element = this.find(selector);

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

            case ':value':
              if (_form2.default.isFormElement($element)) {
                _form2.default.update($element);
              }
              break;
            default:
              $element.attr(name, value);
          }
        };
      }

      this.watch(key, function biding(value, oldValue, ctrl) {
        callback.call(this.instance, $element, value, oldValue, ctrl);
      });

      return this;
    }
  }, {
    key: "on",
    value: function on(selector, eventName, callback) {
      var delegate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var $element = this.find(selector);
      var self = this;

      var handler = function handler(event) {
        callback.call(self.instance, self.$(this), event);
      };

      if (delegate) {
        this.$el.on(eventName, selector, handler);
      } else {
        $element.on(eventName, handler);
      }

      return this;
    }
  }, {
    key: "model",
    value: function model(selector, key) {
      var delegate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var handler = function handler($element, event) {
        var value = void 0;
        switch ($element.attr('type')) {
          case 'radio':
            value = $element[0].value;
            break;
          default:
            value = $element.val();
        }

        return _utilities2.default.set(this.$data, key, value);
      };

      var $element = this.find(selector);

      if ("development" === 'development' && !_form2.default.isFormElement($element)) {
        this.error.warn('Please only use two-way-binding on input, select or textarea elements. The element you selected: ' + $element[0].outerHTML.substr(0, 50) + '...');
      }

      this.watch(function () {
        var value = _utilities2.default.get(this.$data, key);
        if ($element.val() !== value) {
          _form2.default.update($element, value);
        }
      }, _utilities.nullFunction);

      this.on(selector, 'change', handler, delegate);

      if ($element[0].tagName !== 'SELECT') {
        this.on(selector, 'input', handler, delegate);
      }

      return this;
    }
  }, {
    key: "show",
    value: function show(selector, key) {
      var _this = this;

      var onShow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var onHide = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var $element = this.find(selector);

      if (onShow !== null) {
        onHide = onHide || onShow;
      }

      var toggleHandler = function toggleHandler(handler) {
        return function () {
          if (typeof handler === 'string') {
            if ("development" === 'development' && typeof $element[handler] !== 'function') {
              _this.error.error("Method: " + handler + "() not found in " + Ivia.$._name + " object.");
            }

            return function () {
              return $element[handler]();
            };
          } else if (typeof handler === 'function') {
            return function (value, oldValue, ctrl) {
              return handler.call(_this.instance, $element, value, oldValue, ctrl);
            };
          }
        }();
      };

      onShow = toggleHandler(onShow || 'show');
      onHide = toggleHandler(onHide || 'hide');

      var handler = function handler(value, oldValue, ctrl) {
        var valueBool = value == true || value != 0;

        if (valueBool != (oldValue == true || oldValue != 0)) {
          if (valueBool) {
            onShow(value, oldValue, ctrl);
          } else {
            onHide(value, oldValue, ctrl);
          }
        }
      };

      this.watch(key, handler);

      return this;
    }
  }, {
    key: "hide",
    value: function hide(selector, key) {
      var onShow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var onHide = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var getter = function () {
        if (typeof key === 'function') {
          return function () {
            return key.call(this);
          };
        } else {
          return function () {
            return this[key];
          };
        }
      }.call(this);

      var shouldHide = function shouldHide() {
        var value = getter.call(this);
        return value != true && value == 0;
      };

      this.show(selector, shouldHide, onShow, onHide);
    }
  }, {
    key: "wrap",
    value: function wrap(selector, handler) {
      var $element = this.find(selector);
      var self = this;
      var wrapper = {
        execute: function execute() {
          handler.call(this, $element, this);
        }
      };

      ['bind', 'on', 'model', 'show'].forEach(function (method) {
        wrapper['$' + method] = function () {
          self[method].apply(self, [$element].concat(Array.prototype.slice.call(arguments)));
          return this;
        };
      });

      wrapper.execute($element);

      return this;
    }
  }, {
    key: "watch",
    value: function watch(path, callback) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options.user = true;

      var watcher = new _watcher2.default(this, path, callback, options);
      this.watchers.push(watcher);

      if (options.immediate) {
        callback.call(this.instance, watcher.get());
      }

      return function unwatch() {
        watcher.teardown();
      };
    }
  }, {
    key: "find",
    value: function find(selector) {
      var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) === 'object' && !_utilities2.default.isJquery(selector)) {
        return this.$(selector);
      }

      if (selector === 'string') {
        if (!this.elements.hasOwnProperty(selector) || refresh) {
          this.elements[selector] = this.$el.find(selector);
        }

        return this.elements[selector];
      }

      return this.$(selector);
    }
  }, {
    key: "nextTick",
    value: function nextTick(callback) {
      return _queue2.default.nextTick(callback);
    }
  }, {
    key: "async",
    value: function async(handler) {
      return new Application.Promise(function (resolve) {
        Application.Promise.resolve().then(handler).then(function (value) {
          return resolve(value);
        });
      });
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

  for (var key in data) {
    if (!_utilities2.default.isReserved(key)) {
      proxy(app.instance, data, key);
    }
  }

  app.observerFactory.create(data);
}

function initMethods(app, methods) {
  for (var key in methods) {
    var method = methods[key];
    if (!app.options.data[key] && typeof method === 'function') {

      app.instance[key] = _utilities2.default.bind(method, app.instance);
    }
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
  var _loop = function _loop(key) {
    var handler = computed[key];
    var setter = _utilities.nullFunction;
    var getter = void 0;
    var cache = void 0;

    getter = typeof handler === 'function' ? handler : handler.get;
    getter = _utilities2.default.bind(getter, app.instance);

    var watcher = new _watcher2.default(app, key, getter, { lazy: true });

    if (!app.hasOwnProperty(key)) {

      if (typeof handler !== 'function') {
        setter = handler.set;
        cache = handler.cache;
        getter = cache === false ? _utilities.nullFunction : function () {
          return watcher.getCachedValue();
        };
      }

      setter = _utilities2.default.bind(setter, app.instance);

      Object.defineProperty(app.data, key, {
        enumerable: true,
        configurable: true,
        get: getter,
        set: setter
      });
    }
  };

  for (var key in computed) {
    _loop(key);
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

function proxyMethod(target, source, key) {
  var chain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var methodName = '$' + key;
  target[methodName] = function () {
    var r = source[key].apply(source, arguments);

    return chain ? target : r;
  };
}

Application.Promise = _promise2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _environment = __webpack_require__(2);

var _app = __webpack_require__(3);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskQueue = {
  pending: false,
  tasks: [],
  handler: null,
  nextTick: function nextTick(callback, target, app) {
    var handler = this.getHandler();

    var _resolve = void 0;
    this.tasks.push(function () {
      if (callback) {
        callback.call(target);
      }

      if (_resolve) {
        _resolve(target);
      }
    });

    if (!this.pending) {
      this.pending = true;

      if (app) {
        app.hook('beforeUpdate');
      }

      handler();
    }

    if (!callback && typeof Promise !== 'undefined') {
      return _app2.default.Promise(function (resolve) {
        _resolve = resolve;
      });
    }
  },
  execute: function execute() {
    TaskQueue.pending = false;
    var tasks = TaskQueue.tasks.slice(0);
    TaskQueue.tasks.length = 0;

    tasks.forEach(function (task) {
      return task();
    });
  },

  getHandler: function getHandler() {
    var _this = this;

    if (typeof this.handler !== 'function') {

      if (typeof Promise !== 'undefined' && _utilities2.default.isNative(Promise)) {
        var p = Promise.resolve();
        this.handler = function () {
          p.then(_this.execute).catch(function (err) {
            return console.error(err);
          });

          if (_environment.isIOS) {
            setTimeout(_utilities.nullFunction);
          }
        };
      } else if (typeof MutationObserver !== 'undefined' && (_utilities2.default.isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')) {

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

        this.handler = function () {
          setTimeout(_this.execute, 0);
        };
      }
    }

    return this.handler;
  }
};

exports.default = TaskQueue;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

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
    this.ctrl = null;
    this.deep = this.options.deep;
    this.user = this.options.user;
    this.sync = this.options.sync;
    this.computed = this.options.computed;
    this.deferred = this.options.deferred;
    this.expression =  true ? path + '' : '';
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
  }

  _createClass(Watcher, [{
    key: 'get',
    value: function get() {
      this.app.pushStack(this);

      var value = void 0;

      value = this.getter.call(this.app.instance, this.app.data);

      this.app.popStack();

      this.resetDispatchers();

      return value;
    }
  }, {
    key: 'update',
    value: function update() {
      var ctrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.ctrl = ctrl;

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

          this.callback.call(this.app.instance, value, oldValue, this.ctrl);
        }
      }

      this.ctrl = null;
    }
  }, {
    key: 'getCachedValue',
    value: function getCachedValue() {
      if (this.defer) {
        this.get();
        this.defer = false;
      }

      if (this.app.currentWatcher) {
        for (var k in this.watcher.dispatchers) {
          this.app.currentWatcher.addDispatcher(this.dispatchers[k]);
        }
      }

      return this.value;
    }
  }, {
    key: 'resetDispatchers',
    value: function resetDispatchers() {
      var _this = this;

      this.dispatchers.map(function (dispatcher) {
        if (_this.newDisptacherIds.indexOf(dispatcher.id) === -1) {
          dispatcher.detach(_this);
        }
      });

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
      dispatcher.detach(this);
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      var _this2 = this;

      this.dispatchers.map(function (dispatcher) {
        _this2.removeDispatcher(dispatcher);
        _utilities2.default.removeElement(_this2.watchers, _this2);
      });
    }
  }]);

  return Watcher;
}();

exports.default = Watcher;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _ivia = __webpack_require__(1);

var _ivia2 = _interopRequireDefault(_ivia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createElement(name) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var ele = document.createElement(name);

  for (var key in attrs) {
    var value = attrs[key];

    ele.setAttribute(key, value);
  }

  addChildren(ele, children);

  return ele;
}

function addChildren(ele, children) {
  if (children !== null) {
    if (typeof children === 'string' || typeof children === 'number') {
      ele.append(children);
    } else if (children instanceof Element) {
      ele.appendChild(children);
    } else if (children instanceof _ivia2.default.$ || _utilities2.default.isJquery(children)) {
      children.each(function () {
        ele.appendChild(this);
      });
    } else if (Array.isArray(children) || _utilities2.default.isObject(children)) {
      for (var k in children) {
        var child = children[k];
        if (child.hasOwnProperty('nodeName')) {
          child = createElement(child.nodeName, child.attributes, child.children);
          ele.appendChild(child);
        } else {
          addChildren(ele, child);
        }
      }
    }
  }
}
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormHelper = function () {
  function FormHelper() {
    _classCallCheck(this, FormHelper);
  }

  _createClass(FormHelper, null, [{
    key: 'isFormElement',
    value: function isFormElement($element) {
      var tag = _utilities2.default.isJquery($element) ? $element[0].tagName : $element.tagName;

      return [FormHelper.INPUT, FormHelper.SELECT, FormHelper.TEXTAREA].indexOf(tag) !== -1;
    }
  }, {
    key: 'update',
    value: function update($element, value) {
      var method = 'update' + $element[0].tagName;

      FormHelper[method]($element, value);
    }
  }, {
    key: 'updateINPUT',
    value: function updateINPUT($element, value) {
      switch ($element.attr('type')) {
        case 'radio':
        case 'checkbox':
          $element.filter('[value=' + value + ']').prop('checked', true);
          break;
        default:
          $element.val(value);
      }
    }
  }, {
    key: 'updateTEXTAREA',
    value: function updateTEXTAREA($element, value) {
      $element.val(value);
    }
  }, {
    key: 'updateSELECT',
    value: function updateSELECT($element, value) {
      $element.val(value);
    }
  }]);

  return FormHelper;
}();

exports.default = FormHelper;


FormHelper.INPUT = 'INPUT';
FormHelper.SELECT = 'SELECT';
FormHelper.TEXTAREA = 'TEXTAREA';
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorHandler = function () {
  function ErrorHandler(app) {
    _classCallCheck(this, ErrorHandler);

    this.app = app;
  }

  _createClass(ErrorHandler, [{
    key: "warn",
    value: function warn(message) {
      console.warn(this.format(message));
    }
  }, {
    key: "error",
    value: function error(message) {
      console.error(this.format(message));
    }
  }, {
    key: "log",
    value: function log(message) {
      console.log(this.format(message));
    }
  }, {
    key: "format",
    value: function format(message) {
      return "[Ivia]: " + message;
    }
  }]);

  return ErrorHandler;
}();

exports.default = ErrorHandler;
module.exports = exports["default"];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventHandler = function () {
  function EventHandler(app) {
    _classCallCheck(this, EventHandler);

    this.app = app;
    this.events = {};
  }

  _createClass(EventHandler, [{
    key: 'listen',
    value: function listen(name, callback) {
      var _this = this;

      if (Array.isArray(name)) {
        name.map(function (n) {
          return _this.listen(n, callback);
        });
        return this;
      }

      if (!this.events.hasOwnProperty(name)) {
        this.events[name] = [];
      }

      this.events[name].push(callback);

      return this;
    }
  }, {
    key: 'once',
    value: function once(name, callback) {
      var _this2 = this,
          _arguments = arguments;

      var fn = function fn() {
        var r = callback.apply(_this2.app.instance, _arguments);

        _this2.off(name);

        return r;
      };

      return this.listen(name, fn);
    }
  }, {
    key: 'off',
    value: function off() {
      var _this3 = this;

      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (name === null) {
        this.events = {};
      } else if (Array.isArray(name)) {
        name.map(function (n) {
          return _this3.listen(n, callback);
        });
        return this;
      }

      if (!this.events.hasOwnProperty(name)) {
        return this;
      }

      if (callback === null) {
        this.events[name] = [];
      } else if (typeof callback === 'function' && Array.isArray(this.events[name])) {
        for (var k in this.events[name]) {
          var fn = this.events[name][k];

          if (fn === callback) {
            this.events[name].splice(k, 1);
          }
        }
      }

      return this;
    }
  }, {
    key: 'emit',
    value: function emit(name) {
      if (!this.events.hasOwnProperty(name)) {
        return this;
      }

      if (!Array.isArray(this.events[name])) {
        return this;
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var k in this.events[name]) {
        var callback = this.events[name][k];
        callback.call.apply(callback, [this.app.instance].concat(args));
      }

      return this;
    }
  }]);

  return EventHandler;
}();

exports.default = EventHandler;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _watcher = __webpack_require__(5);

var _watcher2 = _interopRequireDefault(_watcher);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

var Dispatcher = function () {
   function Dispatcher(app) {
      var watchers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      _classCallCheck(this, Dispatcher);

      this.id = ++uid;
      this.watchers = watchers;
      this.app = app;
   }

   _createClass(Dispatcher, [{
      key: "attach",
      value: function attach(watcher) {
         this.watchers.push(watcher);
      }
   }, {
      key: "detach",
      value: function detach(watcher) {
         _utilities2.default.removeElement(this.watchers, watcher);

         watcher.removeDispatcher();

         return this;
      }
   }, {
      key: "attachCurrent",
      value: function attachCurrent() {
         if (this.app.currentWatcher) {
            this.app.currentWatcher.addDispatcher(this);
         }
      }
   }, {
      key: "notify",
      value: function notify() {
         var ctrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

         this.watchers.forEach(function (watcher) {
            return watcher.update(ctrl);
         });
      }
   }]);

   return Dispatcher;
}();

exports.default = Dispatcher;
module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObserverFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _dispatcher = __webpack_require__(10);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function Observer(value, dispatcher) {
  _classCallCheck(this, Observer);

  this.value = value;
  this.dispatcher = dispatcher;

  _utilities2.default.define(value, '__observer__', this, false);
};

exports.default = Observer;


var hasProto = '__proto__' in {};
var arrayProto = Array.prototype;
var replaceMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

var ObserverFactory = exports.ObserverFactory = function () {
  function ObserverFactory(app) {
    _classCallCheck(this, ObserverFactory);

    this.app = app;
  }

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
        observer = new Observer(value, new _dispatcher2.default(this.app));

        this.replaceArrayMethods(value);

        value.forEach(function (val) {
          return _this.create(val);
        });
      } else if (_utilities2.default.isPlainObject(value) && Object.isExtensible(value)) {
        observer = new Observer(value, new _dispatcher2.default(this.app));

        Object.keys(value).forEach(function (key) {
          return _this.reactive(value, key, value[key]);
        });
      }

      return observer;
    }
  }, {
    key: 'set',
    value: function set(object, key, value) {
      if (Array.isArray(object)) {
        object.length = Math.max(object.length, key);
        object.splice(key, 1, value);
        return value;
      }

      if (_utilities2.default.has(object, key)) {
        object[key] = value;
        return value;
      }

      var ob = object.__observer__;
      if (!ob) {
        ob[key] = value;
        return value;
      }

      this.reactive(object, key, value);
      ob.dispatcher.notify();
      return value;
    }
  }, {
    key: 'delete',
    value: function _delete(object, key) {
      if (Array.isArray(object)) {
        object.splice(key, 1);
        return;
      }

      var ob = object.__observer__;

      if (!_utilities2.default.has(object, key)) {
        return;
      }

      delete object[key];

      if (!ob) {
        return;
      }

      ob.dispatcher.notify();
    }
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

          if (self.app.currentWatcher) {
            self.app.currentWatcher.addDispatcher(dispatcher);

            if (childObserver) {
              self.app.currentWatcher.addDispatcher(childObserver.dispatcher);
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
  }, {
    key: 'attachArray',
    value: function attachArray() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      for (var key in value) {
        var ele = value[key];
        ele && ele.__observer__ && this.app.currentWatcher.addDispatcher(ele.__observer__.dispatcher);

        if (Array.isArray(ele)) {
          this.attachArray(ele);
        }
      }
    }
  }, {
    key: 'replaceArrayMethods',
    value: function replaceArrayMethods(value) {
      var self = this;
      var arrayMethods = Object.create(arrayProto);

      replaceMethods.forEach(function (method) {

        var original = arrayProto[method];

        _utilities2.default.define(arrayMethods, method, function mutator() {
          var i = arguments.length;
          var args = new Array(i);

          while (i--) {
            args[i] = arguments[i];
          }

          var result = original.apply(this, args);
          var ob = this.__observer__;

          var inserted = void 0;

          switch (method) {
            case 'push':
              inserted = args;
              break;
            case 'unshift':
              inserted = args;
              break;
            case 'splice':
              inserted = args.slice(2);
              break;
          }

          if (inserted) {
            self.create(inserted);
          }

          ob.dispatcher.notify({
            method: method,
            args: args
          });

          return result;
        });
      });

      if (hasProto) {
        value.__proto__ = arrayMethods;
        return value;
      }

      arrayMethods.forEach(function (method, key) {
        return _utilities2.default.define(value, key, method);
      });
      return value;
    }
  }]);

  return ObserverFactory;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queue = __webpack_require__(4);

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

      if (!this.watchers[watcher.id]) {
        this.watchers[watcher.id] = true;

        switch (this.state) {
          case State.WAITING:
            this.queue.push(watcher);

            this.setState(State.RUNNING);

            _queue2.default.nextTick(this.execute, this, this.app);
            break;

          case State.RUNNING:

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

      this.queue.sort(function (a, b) {
        return a.id - b.id;
      });

      for (this.index = 0; this.index < this.queue.length; this.index++) {
        var watcher = this.queue[this.index];
        this.watchers[watcher.id] = null;
        watcher.run();

        if ("development" === 'development' && this.watchers[watcher.id] != null) {
          this.circular[id] = (this.circular[id] || 0) + 1;
          if (this.circular[id] > maxCircularNumber) {
            this.app.error.warn('Infinite loop for max 1000 times for key: ' + watcher.path + ' ' + ('and expression: ' + watcher.expression));
            break;
          }
        }
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
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _ivia = __webpack_require__(1);

var _ivia2 = _interopRequireDefault(_ivia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PromiseAdapter = function () {
  function PromiseAdapter(callback) {
    _classCallCheck(this, PromiseAdapter);

    var deferred = _ivia2.default.$.Deferred();
    var resolve = deferred.resolve;
    var reject = deferred.reject;

    callback(resolve, reject);

    this.defer = _ivia2.default.$.when(deferred);
  }

  _createClass(PromiseAdapter, [{
    key: "then",
    value: function then(onFulfilled, onRejected) {
      return this.defer.then(onFulfilled, onRejected);
    }
  }, {
    key: "catch",
    value: function _catch(onRejected) {
      return this.defer.catch(onRejected);
    }
  }], [{
    key: "all",
    value: function all(promises) {
      var _Ivia$$;

      return (_Ivia$$ = _ivia2.default.$).when.apply(_Ivia$$, _toConsumableArray(promises));
    }
  }, {
    key: "race",
    value: function race(promises) {
      var _resolve = void 0;

      return new PromiseAdapter(function (resolve) {
        _resolve = resolve;

        promises.map(function (promise) {
          promise.then(function (v) {
            if (_resolve) {
              resolve(v);
            }
          });
        });
      });
    }
  }, {
    key: "resolve",
    value: function resolve(object) {
      if (object instanceof PromiseAdapter) {
        object.defer.resolve();

        return object;
      }

      var promise = new PromiseAdapter(function (resolve) {
        return resolve(object);
      });

      if (_utilities2.default.isObject(object) && object.hasOwnProperty('then')) {
        return promise.then(object.then);
      }

      return promise;
    }
  }, {
    key: "reject",
    value: function reject(reason) {
      return new PromiseAdapter(function (resolve, reject) {
        return reject(reason);
      });
    }
  }]);

  return PromiseAdapter;
}();

exports.default = PromiseAdapter;
module.exports = exports["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
module.exports = exports["default"];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ivia = __webpack_require__(1);

var _ivia2 = _interopRequireDefault(_ivia);

var _environment = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_environment.inBrowser) {
  var $ = window.jQuery || window.Zepto || window.$ || null;

  if ($) {
    _ivia2.default.$ = $;
  }
}

exports.default = _ivia2.default;
module.exports = exports["default"];

/***/ })
/******/ ]);
//# sourceMappingURL=ivia.js.map