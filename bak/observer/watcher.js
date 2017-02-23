/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

let uid = 0;

export default class Watcher {
  constructor (instance, key, callback, type = 'custom') {
    this.key = key;
    this.callback = callback;
    this.type = type;
  }

  update(value, oldValue = null) {
    this.callback(this.$element, value, oldValue);
  }
}
