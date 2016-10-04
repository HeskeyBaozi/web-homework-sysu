'use strict';

import {popTarget, pushTarget} from './dep.js';

export default class Watcher {
    constructor(vm, expOrFn, callback) {
        this.callback = callback;
        this.vm = vm;

        this.depIds = new Set();
        this.newDepIds = new Set();
        this.newDeps = [];

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else if (typeof expOrFn === 'string') {
            this.getter = new Function('vm', `return vm.${expOrFn};`);
        } else {
            this.getter = function () {
                // do nothing..
            };
            console.warn(`${expOrFn} 解析失败`);
        }

        this.value = this.get();
    }

    get() {
        pushTarget(this); // 推入全局依赖栈
        const value = this.getter.call(this.vm, this.vm); // 触发了对象的getter, 获取依赖
        console.log('目前依赖: ', this.newDeps);
        popTarget();
        return value;
    }

    addDep(dep) {
        const id = dep.id;
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    update() {
        this.run();
    }

    run() {
        const value = this.get();
        if (value !== this.value) {
            const oldValue = this.value;
            this.value = value;
            this.callback.call(this.vm, value, oldValue);
        }
    }
}