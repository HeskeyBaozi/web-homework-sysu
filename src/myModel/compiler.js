'use strict';

import Watcher, {getGetter} from './observer/watcher.js';

export function compile(element, model) {
    const nodeList = element.childNodes;
    for (let node of nodeList) {
        if (node.nodeType === 3) {
            compileTextNode(node, model);
        } else if (node.nodeType === 1) {
            compile(node, model);
        }
    }
}

const tagRE = /\{\{((?:.|\n)+?)\}\}/g;

function compileTextNode(textNode, model) {
    let tokens = parseText(textNode.textContent);
    if (!tokens)
        return;
    let frag = document.createDocumentFragment();
    tokens.forEach(obj => {
        let ele;
        if (obj.expression) {
            ele = document.createTextNode(getGetter(obj.expression)(model));
            model._watchers.push(
                new Watcher(model, obj.expression, (newValue, oldValue) => {
                    ele.textContent = newValue;
                })
            );
        } else {
            ele = document.createTextNode(obj.value);
        }
        frag.appendChild(ele);
    });

    const parentNode = textNode.parentNode;
    parentNode.replaceChild(frag, textNode);
}

function parseText(text) {
    if (!tagRE.test(text))
        return;

    const tokens = [];
    let lastIndex = tagRE.lastIndex = 0;
    let match, index;
    while ((match = tagRE.exec(text))) {
        index = match.index;
        // push text token
        if (index > lastIndex) {
            tokens.push({
                value: text.slice(lastIndex, index)
            });
        }
        // tag token
        const exp = match[1];
        tokens.push({
            expression: exp,
            value: exp
        });
        lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
        tokens.push({
            value: text.slice(lastIndex)
        });
    }
    return tokens;
}