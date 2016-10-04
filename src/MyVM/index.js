'use strict';

import {observe} from './Observer/index.js';
import Watcher from './Observer/watcher.js';

export default class Store {
    constructor(options = {}) {
        this.$options = options;
        this._data = options.data;
        this._watchers = [];
        Object.keys(this._data).forEach(key => {
            proxy(this, key);
        });
        observe(this._data);
    }

    $watch(expOrFn, callback) {
        const watcher = new Watcher(this, expOrFn, callback);
        this._watchers.push(watcher);
    }
}

/**
 * 代理属性
 * @param vm {Store}
 * @param key {String}
 */
function proxy(vm, key) {
    Object.defineProperty(vm, key, {
        configurable: true,
        enumerable: true,
        get: () => {
            return vm._data[key];
        },
        set: val => {
            vm._data[key] = val;
        }
    })
}