'use strict';

import VM from './tinyVM/instance/index.js';
import Watcher from './tinyVM/observer/watcher.js';
import {parseText} from './tinyVM/compilar/parser/text-parser.js';

let demo = new VM({
    data(){
        return {
            first: 'Hello, world!',
            second: 'Hello, Daddy'
        };
    },
    el: '.display'
});

let w = new Watcher(demo, data => data.first, function (value, oldValue) {
    let textElement = document.querySelector(this.$options.el);
    console.log(value, oldValue);
    let result = eval(parseText(textElement.textContent, 'this'));
    console.log(result);
    textElement.textContent = result;
});

new Promise((resolve, reject) => {
    setTimeout(() => {
        demo.first = 'Fuck you!';
        resolve(demo.first);
    }, 2000);
}).then(data => {
    console.log(demo);
});