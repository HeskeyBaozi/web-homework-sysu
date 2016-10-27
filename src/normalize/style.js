'use strict';

import $ from 'jquery';
import _ from 'lodash';

export default  model => _.flow(normalizeInput, normalizeClass, normalizeOutput)(model);

function normalizeClass(model) {
    $('#input-quick').removeClass('high-light');
    $('#input').removeClass('low-light');
    return model;
}

function normalizeOutput(model) {
    let outputArray = model.output.split('\n');
    if (outputArray.length > 5) {
        outputArray = outputArray.slice(1, outputArray.length);
    }
    model.output = outputArray.join('\n');
    return model;
}

function normalizeInput(model) {
    model.input = '';
    return model;
}