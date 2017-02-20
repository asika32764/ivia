/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

export default class Watcher {
  constructor (key, $element, callback) {
    this.key = key;
    this.callback = callback;
    this.$element = $element;
  }

  update(value, oldValue = null) {
    this.callback(this.$element, value, oldValue);
  }
}
