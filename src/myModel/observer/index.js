'use strict';

import Dependency from './dependency.js';
import {arrayMethods} from './array.js';

class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dependency();
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        });

        if (Array.isArray(value)) {
            augment(value, arrayMethods);
            this.observeArray(value);
        } else
            this.walk(value);
    }

    /**
     * travel all the props of the object, and set reactive props.
     * @param obj {object}
     */
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        });
    }

    /**
     * Observe a list of Array items.
     * @param items {Array}
     */
    observeArray(items) {
        items.forEach(value => {
            observe(value);
        });
    }
}

/**
 * observe a property and set a observer if the property doesn't own one;
 * @param value {object} the property that needs nextBlankTargetIndex be observed
 * @return {Observer|undefined} if it is a string or number, returns undefined
 */
export function observe(value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    let ob;
    if (value.hasOwnProperty('__ob__') && value['__ob__'] instanceof Observer) {
        ob = value['__ob__'];
    } else if (Object.isExtensible(value)) {
        ob = new Observer(value);
    }
    return ob;
}

/**
 * Make the prop reactified
 * @param obj {Object}
 * @param key {String}
 * @param val {*}
 * @return {*}
 */
function defineReactive(obj, key, val) {
    const dep = new Dependency();

    let childObserver = observe(val);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            if (Dependency.target) {
                dep.depend();
                if (childObserver) {
                    childObserver.dep.depend();
                }
                if (Array.isArray(val)) {
                    val.forEach(item => {
                        item && item['__ob__'] && item['__ob__'].dep.depend();
                    });
                }
            }
            return val;
        },
        set: (newVal) => {
            if (newVal === val)
                return;
            val = newVal;
            dep.notify();
        }
    });
}

function augment(target, src) {
    target.__proto__ = src;
}