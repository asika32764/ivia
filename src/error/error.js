/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

export default class ErrorHandler {
  constructor (app) {
    this.app = app;
  }

  warn (message) {
    console.warn(this.format(message));
  }

  log (message) {
    console.log(message);
  }

  format (message) {
    return `[Sparrow]: ${message}`;
  }
}
