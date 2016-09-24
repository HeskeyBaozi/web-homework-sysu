'use strict';

import Dep, {pushTarget, popTarget} from './dep';
import {queueWatcher} from './scheduler.js';

let uid = 0;


export default class Watcher {
    constructor(vm, expOrFn, callback) {
        this.vm = vm;
        vm._watchers.push(this);

        this.expression = expOrFn.toString();
        this.callback = callback;
        this.id = uid++;
        this.deps = [];

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        }

        this.value = this.get();
    }

    get() {
        pushTarget(this); // 推入全局依赖栈
        const value = this.getter.call(this.vm, this.vm); // 触发了对象的getter, 获取依赖
        popTarget();
        // todo
        return value;
    }

    addDep(dep) {
        const id = dep.id;

        // 如果这个id不在新依赖中
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            // 如果旧的依赖ID记录没有这个依赖
            // 把Watcher实例添加到依赖的订阅者中
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    update() {
        queueWatcher(this);
    }

    run() {
        const value = this.get();
        if (value !== this.value) {
            const oldValue = this.value;
            this.value = value;
            // todo: if is user
            this.callback.call(this.vm, value, oldValue);
        }
    }
}