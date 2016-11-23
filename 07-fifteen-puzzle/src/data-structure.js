'use strict';

import {selectNumber} from './selector.js';
import _ from 'lodash';

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

/**
 *
 * @param compare
 * @constructor
 */
export function PriorityQueue(compare) {
    this.push(null);
    this.compare = compare;
}

PriorityQueue.prototype.__proto__ = Array.prototype;
_.assign(PriorityQueue.prototype, {
    empty() {
        return this.length <= 1;
    },

    dequeue() {
        const TopItem = getTopItem.call(this);
        sink.call(this);
        return TopItem;
    },

    enqueue(item) {
        this.push(item);
        bubble.call(this);
    }
});

/**
 *
 * @return {*}
 */
function getTopItem() {
    const TopItem = this[1];
    this[1] = this.pop();
    if (this.length === 2) {
        this.pop();
    }
    return TopItem;
}

/**
 *
 * @param parentIndex {number}
 * @return {number}
 */
function getMinChildIndex(parentIndex) {
    let minChildIndex = parentIndex;
    [parentIndex << 1, (parentIndex << 1) | 1].filter(childIndex => {
        return childIndex < this.length;
    }).forEach(childIndex => {
        if (this.compare(this[childIndex], this[minChildIndex]) < 0)
            minChildIndex = childIndex;
    });
    return minChildIndex;
}

function sink() {
    const Q = [1];
    while (Q.length) {
        const parentIndex = Q.shift();
        let minChildIndex = getMinChildIndex.call(this, parentIndex);
        if (parentIndex !== minChildIndex) {
            swap(this, parentIndex, minChildIndex);
            Q.push(minChildIndex);
        }
    }
}

function bubble() {
    let currentIndex = this.length - 1;
    while (currentIndex > 1) {
        const parentIndex = currentIndex >> 1;
        if (this.compare(this[currentIndex], this[parentIndex]) < 0)
            swap(this, parentIndex, currentIndex);
        else break;
        currentIndex = parentIndex;
    }
}


function swap(array, leftIndex, rightIndex) {
    const temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}