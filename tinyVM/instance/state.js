'use strict';

import {observe} from '../observer/index.js'

export function initState(vm) {
    vm._watchers = [];
    initData(vm);
}

function initData(vm) {
    const dataFn = vm.$options.data;
    const data = vm._data = typeof dataFn === 'function' ? dataFn.call(vm) : dataFn || {};
    Object.keys(data).forEach(key => {
        proxy(vm, key);
    });
    observe(data);
    data.__ob__ && data.__ob__.vmCount++;
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