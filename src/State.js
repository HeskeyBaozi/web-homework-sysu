'use strict';

let UID = 0;

class State {
    constructor() {
        this.uid = UID++;
    }
}

export default State;