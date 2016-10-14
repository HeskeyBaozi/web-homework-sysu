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
     * 这样Watcher就可以知道所维护的值需要依赖于哪些Model里面的其他值
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

/**
 * 该依赖的全局监视者
 */
Dependency.target = null;

const targetStack = [];

/**
 * 全局每次更新只能有一个监视者更新, 使用栈维护
 * @param _target {Watcher}
 */
export function pushTarget(_target) {
    if (Dependency.target)
        targetStack.push(Dependency.target);
    Dependency.target = _target;
}

export function popTarget() {
    Dependency.target = targetStack.pop()
}