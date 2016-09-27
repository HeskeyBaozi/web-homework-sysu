'use strict';

import VM from './tinyVM/instance/index.js';
import Watcher from './tinyVM/observer/watcher.js';

let demo = new VM({
    data(){
        return {
            value: 'Hello, world!'
        };
    },
    el: '.display'
});

let w = new Watcher(demo, data => data.value, (vm, value, oldValue) => {
    const text = document.querySelector(vm.$options.el).textContent;
    console.log('text = ', text);
    text.replace(/\{\{*\}\}/, value);
});

console.log(demo);