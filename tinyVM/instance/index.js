'use strict';

import {initMixin} from './init.js';

export default class VM {
    constructor(options) {
        this._init(options);
    }

    _initEl() {
        this.$el = document.querySelector(this.$options.el);
    }


}

initMixin(VM);
