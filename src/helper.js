'use strict';

import {getRandomInt} from './util.js';
import Node from './node.js';

/***********************************************************
 Public Helper Function
 ***********************************************************/

/**
 *
 * @param targetIndex {number}
 * @param blankTargetIndex {number}
 * @param map {{element:Element,correctIndex:number}[] | number[]}
 * @return {Node}
 */
export function move(targetIndex, blankTargetIndex, map) {
    if (getNeighboursIndex(targetIndex)
            .some(neighboursIndex => neighboursIndex === blankTargetIndex)) {
        const nextMap = map.slice();
        [
            nextMap[targetIndex],
            nextMap[blankTargetIndex]
        ] = [
            map[blankTargetIndex],
            map[targetIndex]
        ];
        return {
            state: nextMap,
            blankTargetIndex: targetIndex,
            parentState: map
        }
    }
}

export function search(targetIndex, currentNode) {
    const subNode = move(targetIndex, currentNode.blankTargetIndex, currentNode.state);
    return new Node(subNode.state, subNode.blankTargetIndex, currentNode);
}

/**
 * baffle the blocks.
 * @param times {number} the times.
 * @param speed {number} the speed of the block when moving. (ms)
 * @param resolve {function} promise resolve
 * @return {function}
 */
export function randomlySelectAndMoveAsync(times, speed, resolve) {
    times--;
    /**
     * randomly move the blank block
     * @param preTargetIndex {number} the index of element that will be ignore in the next randomly move.
     * @param blankTargetIndex {number} the blank object in the map.
     * @param map {Array} the state.
     * @param updater {function} update the view if called.
     */
    function randomlyMove(preTargetIndex, blankTargetIndex, map, updater) {
        const targetIndex = getSample(getNeighboursIndex(blankTargetIndex).filter(index => index !== preTargetIndex));
        const nextDescriptor = move(targetIndex, blankTargetIndex, map);
        updater(nextDescriptor.state);

        if (times) {
            setTimeout(() => {
                times--;
                randomlyMove(blankTargetIndex, nextDescriptor.blankTargetIndex, nextDescriptor.state, updater);
            }, speed);
        } else {
            resolve(nextDescriptor);
        }
    }

    return randomlyMove;
}

/**
 * Update the view according nextBlankTargetIndex the descriptor.
 * @param nextState
 */
export function update(nextState) {
    const patches = diff(nextState, this.blockMap);
    render(patches, nextState);
    this.blockMap = nextState;
}

/**
 *
 * @param targetIndex {number}
 * @param map
 * @return {Array}
 */
export function getNeighbours(targetIndex, map) {
    return [
        {X: 0, Y: -1}, // up
        {X: 1, Y: 0}, // right
        {X: 0, Y: 1}, // down
        {X: -1, Y: 0} // left
    ].map(offset => ({
        X: targetIndex % 4 + offset.X,
        Y: Math.floor(targetIndex / 4) + offset.Y
    })).filter(position => (
        position.X >= 0 && position.X < 4 &&
        position.Y >= 0 && position.Y < 4
    )).map(position => map[position.X + position.Y * 4]);
}

export function getNeighboursIndex(targetIndex) {
    return [
        {X: 0, Y: -1}, // up
        {X: 1, Y: 0}, // right
        {X: 0, Y: 1}, // down
        {X: -1, Y: 0} // left
    ].map(offset => ({
        X: targetIndex % 4 + offset.X,
        Y: Math.floor(targetIndex / 4) + offset.Y
    })).filter(position => (
        position.X >= 0 && position.X < 4 &&
        position.Y >= 0 && position.Y < 4
    )).map(position => position.Y * 4 + position.X);
}

export function getterFactory(map, selector) {
    return target => map.map(selector).findIndex(object => object === target);
}

export function getSample(array) {
    return array[getRandomInt(0, array.length - 1)];
}

/***********************************************************
 Private Helper Function
 ***********************************************************/

/**
 * Show the difference between the new map and the old map.
 * @param newMap {Array}
 * @param oldMap {Array}
 * @return {Array} tokens.
 */
function diff(newMap, oldMap) {
    const tokens = [];
    newMap.forEach((newObject, index) => {
        const oldObject = oldMap[index];
        if (newObject.correctIndex !== oldObject.correctIndex) {
            tokens.push({
                before: oldObject.correctIndex,
                after: newObject.correctIndex,
                index
            });
        }
    });
    return tokens;
}

function render(patches, map) {
    patches.forEach(patch => {
        const target = map[patch.index].element;
        target.className = target.className.replace(/order-\d*/, `order-${patch.index}`);
    });
}