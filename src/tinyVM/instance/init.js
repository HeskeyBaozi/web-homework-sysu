'use strict';

let uid = 0;

import {initLifeCycle} from './lifecycle.js';
import {initState} from './state.js';

export function initMixin(VM) {
    VM.prototype._init = function (options) {
        const vm = this;

        vm._uid = uid++;
        vm._isVM = true;

        if (options && options._isComponent) {
            // todo fix Component
        } else {
            console.log(vm, '被赋值了', options);
            vm.$options = options;
        }

        vm._self = vm;
        initLifeCycle(vm);
        initState(vm);
    }
}