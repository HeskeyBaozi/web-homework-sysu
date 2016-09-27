'use strict';

import {remove} from '../util/index.js';

let uid = 0;

/**
 * @member id {Number}
 * @member subs {Array}
 * @member target {*} @static
 */
export default class Dep {
    constructor() {
        this.id = uid++;
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    removeSub(sub) {
        remove(this.subs, sub);
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify() {
        const subs = this.subs.slice();
        subs.forEach(sub => {
            sub.update();
        });
    }
}

Dep.target = null;

const targetStack = [];

export function pushTarget(_target) {
    if (Dep.target)
        targetStack.push(Dep.target);
    Dep.target = _target;
}

export function popTarget() {
    Dep.target = targetStack.pop()
}