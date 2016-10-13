'use strict';

import {popTarget, pushTarget} from './dependency.js';

/**
 * Watcher will call the callback when the value of the expression changes!
 */
export default class Watcher {
    /**
     * @constructor
     * @param model {model}
     * @param expOrFn {string|function}
     * @param callback {function}
     */
    constructor(model, expOrFn, callback) {
        this.callback = callback;
        this.model = model;

        this.newDepIds = new Set();
        this.newDeps = [];
        this._getter = getGetter(expOrFn);
        this.value = this.get();
    }

    /**
     * get the value of the expression and collects the dep!
     * @return {*}
     */
    get() {
        pushTarget(this);
        const value = this._getter.call(this.model, this.model); // collects the deps!
        popTarget();
        return value;
    }

    /**
     * add dependency for the watcher
     * @param dep {Dependency}
     */
    addDependency(dep) {
        const id = dep.id;
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            dep.addSub(this)
        }
    }

    update() {
        this.run();
        return this;
    }

    /**
     * run the callback to update the value
     */
    run() {
        const value = this.get();
        if (value !== this.value) {
            const oldValue = this.value;
            this.value = value;
            this.callback.call(this.model, value, oldValue);
        }
    }
}

export function getGetter(expOrFn) {
    let getter = function () {
        // do nothing..
    };
    if (typeof expOrFn === 'function') {
        getter = expOrFn;
    } else if (typeof expOrFn === 'string') {
        getter = new Function('model', `return model.${expOrFn};`);
    } else {
        console.warn(`${expOrFn} fail to parse!!`);
    }
    return getter;
}