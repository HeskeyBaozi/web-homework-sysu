'use strict';

class Node {
    constructor(state, blankTargetIndex, parentState) {
        this.state = state;
        this.blankTargetIndex = blankTargetIndex;
        this.parentNode = parentState;
    }
}

export default Node;