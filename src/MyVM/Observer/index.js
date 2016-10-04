'use strict';

import {defineReactive} from './helper.js';
import Dep from './dep.js';

class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        });
        Array.isArray(value)
            ? this.observerArray(value)
            : this.walk(value);
    }

    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        });
    }
}


export function observe(value) {
    if (!value || typeof value !== 'object') {
        return;
    }

    let ob;

    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {

        ob = value.__ob__;
    } else if (Object.isExtensible(value)) {
        ob = new Observer(value);
    }

    return ob;
}