/**
 * Part of ivia project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

import { nullFunction } from "../util/utilities";
import Utilities from "../util/utilities";
import { isIOS } from "../util/environment";
import Application from "../app";

const TaskQueue = {
  pending: false,
  tasks: [],
  handler: null,
  nextTick: function (callback, target, app) {
    const handler = this.getHandler();

    let _resolve;
    this.tasks.push(() => {
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
      return Application.Promise(resolve => {
        _resolve = resolve;
      });
    }
  },
  execute: function () {
    TaskQueue.pending = false;
    const tasks = TaskQueue.tasks.slice(0);
    TaskQueue.tasks.length = 0;

    tasks.forEach(task => task());
  },
  /**
   * This method based listen Vue.$nextTick to handle callback asynchronously.
   */
  getHandler: function () {
    if (typeof this.handler !== 'function') {
      // the nextTick behavior leverages the microtask queue, which can be accessed
      // via either native Promise.then or MutationObserver.
      // MutationObserver has wider support, however it is seriously bugged in
      // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
      // completely stops working after triggering a few times... so, if native
      // Promise is available, we will use it:
      /* istanbul ignore if */
      if (typeof Promise !== 'undefined' && Utilities.isNative(Promise)) {
        const p = Promise.resolve();
        this.handler = () => {
          p.then(this.execute).catch(err => console.error(err));

          // in problematic UIWebViews, Promise.then doesn't completely break, but
          // it can get stuck in a weird state where callbacks are pushed into the
          // microtask queue but the queue isn't being flushed, until the browser
          // needs to do some other work, e.g. handle a timer. Therefore we can
          // "force" the microtask queue to be flushed by adding an empty timer.
          if (isIOS) {
            setTimeout(nullFunction);
          }
        };
      } else if (typeof MutationObserver !== 'undefined' && (
          Utilities.isNative(MutationObserver) ||
          // PhantomJS and iOS 7.x
          MutationObserver.toString() === '[object MutationObserverConstructor]'
        )) {
        // use MutationObserver where native Promise is not available,
        // e.g. PhantomJS IE11, iOS7, Android 4.4
        let counter = 1;
        const observer = new MutationObserver(this.execute);
        const textNode = document.createTextNode(String(counter));
        observer.observe(textNode, {
          characterData: true
        });
        this.handler = () => {
          counter = (counter + 1) % 2;
          textNode.data = String(counter)
        }
      } else {
        // fallback to setTimeout
        /* istanbul ignore next */
        this.handler = () => {
          setTimeout(this.execute, 0);
        }
      }
    }

    return this.handler;
  }
};

export default TaskQueue;
