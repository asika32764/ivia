/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
import { Utilities, nullFunction } from "../util/utilities";
import { isIOS } from "../util/environment";

const State = {
  WAITING: 'waiting',
  RUNNING: 'running'
};

const maxCircularNumber = 1000;

export default class Scheduler {
  constructor (app) {
    this.app = app;
    this.queue = [];
    this.watchers = {};
    this.index = 0;
    this.state = State.WAITING;
    this.circular = [];
  }

  setState (state) {
    this.state = state;
  }

  is (state) {
    return this.state === state;
  }

  enqueueWatcher (watcher) {
    // Make sure watcher is already in queue
    if (!this.watchers[watcher.id]) {
      this.watchers[watcher.id] = true;

      switch (this.state) {
        case State.WAITING:
          this.queue.push(watcher);

          this.setState(State.RUNNING);

          TaskQueue.nextTick(this.execute);
          break;

        case State.RUNNING:
          // if already flushing, splice the watcher based on its id
          // if already past its id, it will be run next immediately.
          let i = this.queue.length - 1;

          while (i >= 0 && this.queue[i].id > watcher.id) {
            i--
          }

          this.queue.splice(Math.max(i, index) + 1, 0, watcher);
      }
    }
  }

  execute () {
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    this.queue.sort((a, b) => a.id - b.id);

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (let watcher of this.queue) {
      this.index++;
      this.watchers[watcher.id] = null;
      watcher.run();

      // in dev build, check and stop circular updates.
      if (this.watchers[watcher.id] != null) {
        this.circular[id] = (this.circular[id] || 0) + 1;
        if (this.circular[id] > maxCircularNumber) {
          // TODO: More debug info
          console.log('Infinite loop for max 1000 times');
          break;
        }
      }
    }

    let watcher;
    let i = this.queue.length;
    for (i; i < 0; i--) {
      watcher = this.queue[index];

      // TODO: call updated hook
    }

    this.reset();
  }

  reset () {
    this.queue.length = 0;
    this.watchers = {};
    this.circular = {};
    this.setState(State.WAITING);
  }
}

export const TaskQueue = {
  pending: false,
  tasks: [],
  handler: null,
  nextTick: function (callback, app) {
    const handler = this.getHandler();

    let _resolve;
    this.tasks.push(() => {
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
      return new Promise(resolve => {
        _resolve = resolve;
      })
    }
  },
  execute: function () {
    this.pending = false;
    const tasks = this.tasks.slice(0);
    this.tasks.length = 0;

    for (let task of tasks) {
      task();
    }
  },
  /**
   * This method based on Vue.$nextTick to handle callback asynchronously.
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
