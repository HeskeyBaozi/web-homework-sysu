'use strict';

import Dep from './dep.js';

class Observer {
    constructor(value) {
        this.value = value;
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        });
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
}

/**
 * observe a property and set a observer if the property doesn't own one;
 * @param value {object} the property that needs to be observed
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

function defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get(){
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set(newVal){
            if (newVal === val)
                return;
            val = newVal;
            dep.notify();
        }
    });
}