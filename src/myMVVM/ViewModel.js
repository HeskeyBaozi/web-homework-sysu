'use strict';

export default class ViewModel {
    constructor(options) {
        this.$options = options;
        const dataOrFn = options.data;
        this.$data = typeof dataOrFn === 'function' ? dataOrFn() : dataOrFn;
        this.$ref = document.querySelector(options.el);
    }
}