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
        Object.assign(this, {
            state,
            blankTargetIndex,
            parentNode,
            depth: parentNode !== null ? parentNode.depth + 1 : 0,
        });

        this.h = computeH(this.state.map(selectNumber).map(mapIndexToDistanceObject).reduce(objectReducer));
    }
}

/**
 * compute the h value of the current state.
 * @param distanceObject
 * @return {number}
 */
function computeH(distanceObject) {
    return (distanceObject.manhatten * 6 + distanceObject.geometric * 3);
}

/**
 * map the number & index to the distance object.
 * @param number
 * @param index
 * @return {{manhatten: number, geometric: number}}
 */
function mapIndexToDistanceObject(number, index) {
    return {
        manhatten: getManhattenDistance(number, index),
        geometric: getGeometricDistance(number, index)
    };
}

/**
 * get manhatten distance
 * @param from
 * @param to
 * @return {number}
 */
function getManhattenDistance(from, to) {
    return Math.abs(from % 4 - to % 4) + Math.abs(from >> 2 - to >> 2);
}

/**
 * get geometric distance
 * @param from
 * @param to
 * @return {number}
 */
function getGeometricDistance(from, to) {
    return Math.sqrt(Math.pow((from % 4 - to % 4), 2) + Math.pow(from >> 2 - to >> 2, 2));
}

/**
 * reduce the object
 * @param leftObject
 * @param rightObject
 * @return {Object}
 */
function objectReducer(leftObject, rightObject) {
    leftObject.manhatten += rightObject.manhatten;
    leftObject.geometric += rightObject.geometric;
    return leftObject;
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