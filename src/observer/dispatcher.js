/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

export default class Dispatcher {
  constructor (watchers = []) {
    this.watchers = watchers;
  }

  notify() {
    this.watchers.forEach(function () {
      this.update();
    })
  }
}
