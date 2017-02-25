/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
import TaskQueue from "./queue";

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

          TaskQueue.nextTick(this.execute, this, this.app);
          break;

        case State.RUNNING:
          // if already flushing, splice the watcher based on its id
          // if already past its id, it will be run next immediately.
          let i = this.queue.length - 1;

          while (i >= 0 && this.queue[i].id > watcher.id) {
            i--
          }

          this.queue.splice(Math.max(i, this.index) + 1, 0, watcher);
      }
    }
  }

  execute () {
    let watcher;
    let i;
    for (i in this.queue) {
      watcher = this.queue[i];

      if (watcher.app === watcher.app.watcher && watcher.app._isMounted) {
        watcher.app.hook('beforeUpdate');
      }
    }

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

    for (i in this.queue) {
      watcher = this.queue[i];

      if (watcher === watcher.app.watcher && watcher.app._isMounted) {
        watcher.app.hook('updated');
      }
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
