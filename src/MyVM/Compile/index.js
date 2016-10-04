'use strict';

export function compile(rootElement) {
    const type = rootElement.nodeType;
    if (type === 1) {
        compileElement(rootElement);
    } else if (type === 3 && rootElement.data.trim()) {
        compileTextNode(rootElement);
    }
}

function compileTextNode(node) {
    const tokens = parseText(node.textContent);
    const frag = document.createDocumentFragment();
}