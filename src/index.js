'use strict';

import Hzy from './MyQuery.js';
import Model from './MyVM/index.js';
import {Type} from './helper.js';
import {parseExpression, normalize} from './parser.js';

const ob = new Model({
    data: {
        output: '',
        input: '0',
        isEqualed: false
    }
});

Hzy('#panel').on('click', e => {
    if (ob.input === '0') {
        ob.input = '';
    }

    if (ob.isEqualed) {
        normalizeStyle();
        normalizeOutput(ob);
        normalizeInput(ob);
        ob.isEqualed = false;
    }


    const directive = Type[e.target.dataset['directive']];
    if (typeof directive === 'string') {
        ob.input += directive;
    } else if (typeof directive === 'function') {
        directive.call(ob);
    } else {
        console.warn('cannot parse this directive:', directive);
    }
});

ob.$watch('output', function (newValue, oldValue) {
    if (newValue !== oldValue) {
        Hzy('#output').text(newValue.trim());
    }
});

ob.$watch('input', function (newValue, oldValue) {
    if (newValue !== oldValue) {
        Hzy('#input').text(newValue);
        const normalized = normalize(newValue);
        const getter = parseExpression(normalized);
        let result = null;
        try {
            this.result = result = getter();
            if (typeof result === 'function') {
                Hzy('#input-quick').text('Please enter number');
            } else if (result) {
                Hzy('#input-quick').text(`${normalized} = ${result}`);
            } else {
                Hzy('#input-quick').text('');
            }
        } catch (e) {
            this.result = 'Syntax Error :(';
            Hzy('#input-quick').text(this.result);
        }
    }
});

function normalizeStyle() {
    Hzy('#input-quick').removeClass('high-light');
    Hzy('#input').removeClass('low-light');
}

function normalizeOutput(ob) {
    let outputArray = ob.output.split('\n');
    console.log(outputArray);
    if (outputArray.length > 5) {
        outputArray = outputArray.slice(1, outputArray.length);
    }
    ob.output = outputArray.join('\n');
}

function normalizeInput(ob) {
    ob.input = '';
}
