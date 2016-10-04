'use strict';


export function compile(el) {

}

/**
 * Compile a textNode and return a nodeLinkFn.
 *
 * @param {Node} node
 * @param {Object} options
 * @return {Function|null} textNodeLinkFn
 */
export function compileTextNode(node, options) {
    let tokens = parseText(node.textContent);
}