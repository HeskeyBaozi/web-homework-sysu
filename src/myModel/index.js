'use strict';

import {observe} from './observer/index.js';
import Watcher from './observer/watcher.js';

/**
 * Just like the part of the model in MVVM!
 */
export default class Model {
    constructor(options = {}) {
        this._data = options.data;
        this._watchers = [];
        Object.keys(this._data).forEach(key => {
            proxy(this, key);
        });
        observe(this._data);
    }

    /**
     * when the vale of the expression changes,
     * the callback would be called
     * callback example:
     *        (newValue, oldValue) => *, this <===> model
     * @param expOrFn {string|function}
     * @param callback {function}
     */
    $watch(expOrFn, callback) {
        const watcher = new Watcher(this, expOrFn, callback);
        this._watchers.push(watcher);
    }
}

/**
 * proxy the properties
 * example:
 *      model.key <===> model._data.key
 * @param model {Model}
 * @param key {String}
 */
function proxy(model, key) {
    Object.defineProperty(model, key, {
        configurable: true,
        enumerable: true,
        get: () => model._data[key],
        set: val => {
            model._data[key] = val
        }
    });
}