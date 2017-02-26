/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

import Watcher from './watcher';
import Utilities from "../util/utilities";

let uid = 0;

/**
 * Dispatcher object.
 */
export default class Dispatcher {
  /**
   * Class init.
   * @param {Application} app
   * @param {Watcher[]}   watchers
   */
  constructor (app, watchers = []) {
    this.id = ++uid;
    this.watchers = watchers;
    this.app = app;
  }

  /**
   * Add Watcher.
   * @param {Watcher} watcher
   */
  attach (watcher) {
    this.watchers.push(watcher);
  }

  /**
   * Remove Watcher.
   * @param {Watcher} watcher
   * @returns {Dispatcher}
   */
  detach (watcher) {
    Utilities.removeElement(this.watchers, watcher);

    watcher.removeDispatcher();

    return this;
  }

  /**
   * Attach current watcher to self.
   */
  attachCurrent () {
    if (this.app.currentWatcher) {
      this.app.currentWatcher.addDispatcher(this);
    }
  }

  /**
   * Notify all watchers to update themselves.
   *
   * @param {Object} ctrl
   */
  notify (ctrl = undefined) {
    this.watchers.forEach(watcher => watcher.update(ctrl));
  }
}
