'use strict';

import {MyQuery as $} from './MyQuery.js';
import Store from './MyVM/index.js';
import {Type} from './helper.js';
import {parseExpression, normalize} from './parser.js';

const ob = new Store({
    data: {
        output: '',
        input: '0',
        isEqualed: false,
        isWrong: false
    }
});

$('#panel').on('click', e => {
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
        console.warn('无法解析该指令:', directive);
    }
});

ob.$watch('output', function (newValue, oldValue) {
    if (newValue !== oldValue) {
        $('#output').text(newValue.trim());
    }
});

ob.$watch('input', function (newValue, oldValue) {
    if (newValue !== oldValue) {
        $('#input').text(newValue);
        let normalized = normalize(newValue);
        let fn = parseExpression(normalized);
        let result = null;
        try {
            this.result = result = fn();
            if (typeof result === 'function') {
                $('#input-quick').text('Please enter number');
                this.isWrong = true;
            } else if (result) {
                $('#input-quick').text(`${normalized} = ${result}`);
            } else {
                $('#input-quick').text('');
                this.isWrong = true;
            }
        } catch (e) {
            this.result = 'Syntax Error';
            this.isWrong = true;
            $('#input-quick').text(this.result);
        }
    }
});

function normalizeStyle() {
    $('#input-quick').removeClass('high-light');
    $('#input').removeClass('low-light');
}

function normalizeOutput(ob) {
    let outputArray = ob.output.split('\n');
    console.log(outputArray);
    if (outputArray.length > 6) {
        outputArray = outputArray.slice(1, outputArray.length);
    }
    ob.output = outputArray.join('\n');
}

function normalizeInput(ob) {
    ob.input = '';
}
