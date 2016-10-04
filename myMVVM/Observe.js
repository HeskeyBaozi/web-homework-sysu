'use strict';

const __ob__ = '__ob__';

class Observer {
    constructor(value) {
        this.observedValue = value;
        Object.defineProperty(value, __ob__, {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        });

        if (Array.isArray(value)) {
            // todo: isArray
        } else {
            this.walk(value);
        }
    }

    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        });
    }
}

export function observe(value) {
    if (typeof value === 'object' && value !== null) {
        let ob = undefined;
        if (value.hasOwnProperty(__ob__)) {
            ob = value[__ob__];
        } else if (Object.isExtensible(value)) {
            ob = new Observer(value);
        }
        return ob;
    }
}

export function defineReactive(obj, key, val) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor && descriptor.configurable === false)
        return;
    const propertyGetter = descriptor && descriptor.get;
    const propertySetter = descriptor && descriptor.set;

    let childObserver = observe(val); // 如果val也是一个对象或数组

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = propertyGetter ? propertyGetter.call(obj) : val; // 取值
            return value;
        },
        set: function reactiveSetter(newVal) {
            const value = propertyGetter ? propertyGetter.call(obj) : val; // 取值
            if (newVal === value)
                return value;
            if (propertySetter) {
                propertySetter.call(obj, newVal);
            } else {
                val = newVal;
            }
            childObserver = observe(newVal);
        }
    });
}