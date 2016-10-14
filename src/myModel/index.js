'use strict';

import {observe} from './observer/index.js';
import {compile} from './compiler.js';
import Watcher from './observer/watcher.js';

export default class Model {
    constructor(options = {}) {
        this._data = options.data;
        this._watchers = [];
        this._target = options.target ? document.querySelector(options.target) : undefined;
        Object.keys(this._data).forEach(key => {
            proxy(this, key);
        });
        observe(this._data);
        if (this._target)
            compile(this._target, this);
    }

    $watch(expOrFn, callback) {
        const watcher = new Watcher(this, expOrFn, callback);
        this._watchers.push(watcher);
    }
}

function proxy(model, key) {
    Object.defineProperty(model, key, {
        configurable: true,
        enumerable: true,
        get: () => model._data[key],
        set: newVal => {
            model._data[key] = newVal;
        }
    });
}