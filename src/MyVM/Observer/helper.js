'use strict';
import {observe} from './index.js';
import Dep from './dep.js';


// defineReactive(obj, key, obj[key])
export function defineReactive(obj, key, val) {
    const dep = new Dep();

    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor && descriptor.configurable === false)
        return;

    const propertyGetter = descriptor && descriptor.get;
    const propertySetter = descriptor && descriptor.set;

    let childObserver = observe(val);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get(){
            const value = propertyGetter ? propertyGetter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
                if (childObserver) {
                    childObserver.dep.depend();
                }
            }
            return value;
        },
        set(newVal){
            const value = propertyGetter ? propertyGetter.call(obj) : val;
            if (newVal === value)
                return;
            if (propertySetter) {
                propertySetter.call(obj, newVal);
            } else {
                val = newVal;
            }
            childObserver = observe(newVal);
            dep.notify();
        }
    });
}