'use strict';

import {observe} from './tinyVM/observer/inex.js';

class VM {
    constructor(options) {
        const vm = this;
        vm.$options = options;
        this._init();
    }

    _init() {
        this._initData();
    }

    _initEl() {
        this.$el = document.querySelector(this.$options.el);
    }

    _initData() {
        const dataFn = this.$options.data;
        const data = this._data = typeof dataFn === 'function' ? dataFn() : dataFn;
        Object.keys(data).forEach(key => {
            if (data.hasOwnProperty(key)) {
                this._proxy(key);
            }
        });
        console.log('开始观察', data);
        observe(data);
    }

    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get: () => {
                return this._data[key];
            },
            set: val => {
                this._data[key] = val;
            }
        })
    }
}

let demo = new VM({
    data(){
        return {
            value: 'Hello, world!'
        };
    },
    el: '.display'
});

console.log(demo);