/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
  import Utilities from "../util/utilities";
import Dispatcher from "./dispatcher";

let uid = 0;

export default class Watcher {
  constructor (app, path, callback, options = {}) {
    this.id   = ++uid;
    this.path = path;
    this.callback = callback;
    this.app = app;
    this.active = true;
    this.deep = false;
    this.user = false;
    this.sync = false;
    this.options  = options;
    this.dispatcherIds = [];
    this.dispatchers = [];
    this.newDisptacherIds = [];
    this.newDisptachers = [];

    if (typeof path === 'function') {
      this.getter = path;
    } else {
      this.getter = function (value) {
        return Utilities.get(value, path);
      }
    }

    this.value = this.get();
  }

  get () {
    this.app.pushStack(this);

    let value;

    value = this.getter.call(this.app, this.app.data);

    // TODO: deep

    this.app.popStack();

    this.resetDispatchers();

    return value;
  }

  update () {
    if (this.sync) {
      this.run();
    } else {
      this.app.scheduler.enqueueWatcher(this);
    }
  }

  run () {
    if (this.active) {
      const value = this.get();

      if (value !== this.value || this.deep || Utilities.isObject(value)) {
        const oldValue = this.value;
        this.value = value;

        this.callback.call(this.app, value, oldValue);
      }
    }
  }

  resetDispatchers () {
    for (let dispatcher of this.dispatchers) {
      if (this.newDisptacherIds.indexOf(dispatcher.id) === -1) {
        dispatcher.detach(this);
      }
    }

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
  }

  teardown () {
    for (let dispatcher of this.dispatchers) {
      dispatcher.detach(this);
    }
  }
}
