'use strict';

import {selectNumber} from './selector.js';

class Node {
    /**
     *
     * @param state {Array}
     * @param blankTargetIndex {Number}
     * @param parentNode {Node}
     */
    constructor(state, blankTargetIndex, parentNode) {
        this.state = state;
        this.blankTargetIndex = blankTargetIndex;
        this.parentNode = parentNode;
        this.depth = parentNode !== null ? parentNode.depth + 1 : 0;
        this.h = this.state
            .map(selectNumber)
            .map((number, index) => Math.abs(number % 4 - index % 4) + Math.abs(Math.floor(number / 4) - Math.floor(index / 4)))
            .reduce((left, right) => left + right, 0);
    }
}

export default Node;