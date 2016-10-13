'use strict';

import {observe} from './observer/index.js';
import {compile} from './compiler.js';

export default class Model {
    constructor(options = {}) {
        this._data = options.data;
        this._watchers = [];
        this._target = document.querySelector(options.target);
        Object.keys(this._data).forEach(key => {
            proxy(this, key);
        });
        observe(this._data);
        compile(this._target, this);
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