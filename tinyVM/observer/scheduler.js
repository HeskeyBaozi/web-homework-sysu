'use strict';

let has = {};
let isFlushing = false;
let isWaiting = false;

/**
 * @type {Array<Watcher>}
 */
const queue = [];

function resetSchedulerState() {
    queue.length = 0; // clear the queue
    has = {};
    isWaiting = isFlushing = false;
}

function flushSchedulerQueue() {
    isFlushing = true;
    queue.sort((a, b) => {
        return a.id - b.id;
    });

    queue.forEach(watcher => {
        const id = watcher.id;
        has[id] = undefined;

        watcher.run();

        if (typeof has[id] !== 'undefined') {
            console.error(watcher.expression);
        }
    });
    resetSchedulerState();
}

export function queueWatcher(watcher) {
    const id = watcher.id;
    if (typeof has[id] === 'undefined') {
        has[id] = true;
        if (!isFlushing) {
            queue.push(watcher);
        } else {
            let i = queue.length - 1; // the last
            while (i >= 0 && queue[i].id > watcher.id) {
                i--;
            }
            // now queue[i].id <|=== watcher.id
            queue.splice(Math.max(i, 0) + 1, 0, watcher);
        }

        if (!isWaiting) {
            isWaiting = true;
            setTimeout(flushSchedulerQueue, 0);
        }
    }
}