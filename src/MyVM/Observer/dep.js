'use strict';

let uid = 0;

export default class Dep {
    constructor() {
        this.id = uid++;
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
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