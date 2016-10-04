'use strict';

import {MyQuery as $} from './MyQuery.js';
import VM from './MyVM/index.js';

const vm = new VM({
    el: '#screen',
    data: {
        output: 'hello',
        input: 'world'
    }
});

const panelList = $('#panel').on('click', e => {
    console.log(e);
});


vm.$watch('input', (newValue, oldValue) => {
    console.log('newValue = ', newValue);
    console.log('oldValue = ', oldValue);
});

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('fuck');
    }, 1000);
}).then(data => {
    vm.input = data;
});

console.log(vm);