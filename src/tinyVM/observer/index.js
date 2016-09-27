'use strict';

import {defineReactive} from './helpers.js';
import Dep from './dep.js';

/**
 * @member value {*}
 * @member dep {Dep}
 */
export class Observer {
    /**
     * @constructor
     * @param value {*}
     */
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        this.vmCount = 0;
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

    /**
     * @param obj {Object}
     */
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        });
    }
}

export const observerState = {
    shouldConvert: true,
    isSettingProps: false
};

export function observe(value) {
    if (!value || typeof value !== 'object') {
        return;
    }

    let ob;

    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {

        ob = value.__ob__;
    } else if (observerState.shouldConvert && Object.isExtensible(value)) {
        ob = new Observer(value);
    }

    return ob;
}
