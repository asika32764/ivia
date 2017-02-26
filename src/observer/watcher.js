/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
import Utilities from "../util/utilities";

let uid = 0;

const defaultOptions = {
  deep: false,
  user: false,
  sync: false,
  computed: false,
  deferred: false
};

export default class Watcher {
  constructor (app, path, callback, options = {}) {
    this.options = app.$.extend({}, defaultOptions, options);

    this.id   = ++uid;
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
    this.expression = process.env.NODE_ENV === 'development' ? path + '' : '';
    this.dispatcherIds = [];
    this.dispatchers = [];
    this.newDisptacherIds = [];
    this.newDisptachers = [];

    if (typeof this.path === 'function') {
      this.getter = this.path;
    } else {
      this.getter = function (value) {
        return Utilities.get(value, path);
      }
    }

    //this.value = this.computed ? undefined : this.get();
  }

  get () {
    this.app.pushStack(this);

    let value;

    value = this.getter.call(this.app.instance, this.app.data);

    // TODO: deep

    this.app.popStack();

    this.resetDispatchers();

    return value;
  }

  update (ctrl = null) {
    this.ctrl = ctrl;

    if (this.computed) {
      this.deferred = true;
    } else if (this.sync) {
      this.run();
    } else {
      this.app.scheduler.enqueueWatcher(this);
    }
  }

  run () {
    if (this.active) {
      const value = this.get();
      console.log(value, this.value);

      if (value !== this.value || this.deep || Utilities.isObject(value)) {
        const oldValue = this.value;
        this.value = value;

        this.callback.call(this.app.instance, value, oldValue, this.ctrl);
      }
    }

    this.ctrl = null;
  }

  getCachedValue () {
    if (this.defer) {
      this.get();
      this.defer = false;
    }

    // Push all dispatchers of this watcher to current active watcher.
    if (this.app.currentWatcher) {
      for (let k in this.watcher.dispatchers) {
        this.app.currentWatcher.addDispatcher(this.dispatchers[k]);
      }
    }

    return this.value;
  }

  resetDispatchers () {
    this.dispatchers.map(dispatcher => {
      if (this.newDisptacherIds.indexOf(dispatcher.id) === -1) {
        dispatcher.detach(this);
      }
    });

    let temp;
    temp = this.newDisptachers;
    this.dispatchers = this.newDisptachers;
    this.newDisptachers = temp;
    this.newDisptachers.length = 0;

    temp = this.newDisptacherIds;
    this.dispatcherIds = this.newDisptacherIds;
    this.newDisptacherIds = temp;
    this.newDisptacherIds.length = 0;
  }

  addDispatcher(dispatcher) {
    const id = dispatcher.id;

    if (this.newDisptacherIds.indexOf(id) === -1) {
      this.newDisptacherIds.push(id);
      this.newDisptachers.push(dispatcher);

      if (this.dispatcherIds.indexOf(id) === -1) {
        dispatcher.attach(this);
      }
    }
  }

  removeDispatcher (dispatcher) {
    Utilities.removeElement(this.dispatchers, dispatcher);
    dispatcher.detach(this);
  }

  teardown () {
    this.dispatchers.map(dispatcher => {
      this.removeDispatcher(dispatcher);
      Utilities.removeElement(this.watchers, this);
    });
  }
}
