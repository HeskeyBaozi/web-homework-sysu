'use strict';

import {selectNumber} from './selector.js';

export class Node {
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

export class PriorityQueue extends Array {
    constructor(compare) {
        super();
        this.push(null);
        this.compare = compare;

        /**
         * push
         * @param item {*}
         */
        this.enqueue = function (item) {
            this.push(item);

            let currentIndex = this.length - 1;
            while (currentIndex > 1) {
                const parentIndex = currentIndex >> 1;
                if (this.compare(this[currentIndex], this[parentIndex]) < 0) {
                    swap(this, parentIndex, currentIndex);
                } else {
                    break;
                }
                currentIndex = parentIndex;
            }
        };

        /**
         * Pop
         * @return {*}
         */
        this.dequeue = function () {
            const TopItem = this[1];
            this[1] = this.pop();
            if (this.length === 2) {
                this.pop();
            }

            const Q = [1];
            while (Q.length) {
                const parentIndex = Q.shift();
                let minChildIndex = parentIndex;


                const childIndexArray = [parentIndex << 1, (parentIndex << 1) | 1];
                childIndexArray.filter(childIndex => {
                    return childIndex < this.length;
                }).forEach(childIndex => {
                    if (this.compare(this[childIndex], this[minChildIndex]) < 0) {
                        minChildIndex = childIndex;
                    }
                });

                if (parentIndex !== minChildIndex) {
                    swap(this, parentIndex, minChildIndex);
                    Q.push(minChildIndex);
                }
            }
            return TopItem;
        };

        /**
         * is empty?
         * @return {boolean}
         */
        this.empty = function () {
            return this.length <= 1;
        }
    }
}

function swap(array, leftIndex, rightIndex) {
    const temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}