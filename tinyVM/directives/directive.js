'use strict';

import Watcher from '../observer/watcher.js'

export default class Directive {
    /**
     * @constructor
     * @param {Object} descriptor
     * @param vm {Store}
     * @param el {Node}
     * @param host {Store}
     */
    constructor(descriptor, vm, el, host) {
        this.vm = vm;
        this.el = el;

        this.descriptor = descriptor;
    }

    _bind() {
        const descriptor = this.descriptor;
        const def = descriptor.def;
        if (typeof def === 'function') {
            this.update = def;
        }
        const watcher = this._watcher = new Watcher(this.vm, descriptor.expression, this._update);
    }
}