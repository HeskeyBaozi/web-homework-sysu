'use strict';

let uid = 0;

/**
 * 订阅者模式
 */
export default class Dependency {
    constructor() {
        this.id = uid++;
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    /**
     * 通知依赖
     */
    depend() {
        if (Dependency.target) {
            Dependency.target.addDependency(this);
        }
    }

    /**
     * 广播更新
     */
    notify() {
        const subs = this.subs.slice();
        subs.forEach(sub => {
            sub.update();
        });
    }
}

Dependency.target = null;

const targetStack = [];

export function pushTarget(_target) {
    if (Dependency.target)
        targetStack.push(Dependency.target);
    Dependency.target = _target;
}

export function popTarget() {
    Dependency.target = targetStack.pop()
}