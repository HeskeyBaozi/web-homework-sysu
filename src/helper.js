'use strict';

import {getRandomInt} from './util.js';
import {Node} from './data-structure.js';
import _ from 'lodash';

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
        const targetIndex = _.sample(getNeighboursIndex(blankTargetIndex).filter(index => index !== preTargetIndex));
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
 * get the neighbours index.
 * @param targetIndex
 * @return {Array}
 */
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

/**
 * make a index getter
 * @param map
 * @param selector
 * @return {function(*): number}
 */
export function getterFactory(map, selector) {
    return target => map.map(selector).findIndex(object => object === target);
}

/**
 * showing the solution for the solution path.
 * @param path {Array}
 * @param updater {Function}
 * @param resolve
 */
export function showSolutionAsync(path, updater, resolve) {
    if (path.length) {
        updater(path.pop().state);
        setTimeout(() => {
            showSolutionAsync(path, updater, resolve);
        }, 120);
    } else {
        resolve(path);
    }
}

/**
 * draw the picture
 * @param canvasContextArray {Array}
 * @param image {Image}
 */
export function drawCanvas(canvasContextArray, image) {
    canvasContextArray.forEach((ctx, index) => {
        ctx.drawImage(image,
            (index % 4) * (image.width / 4), Math.floor(index / 4) * (image.height / 4),
            (image.width / 4), (image.height / 4),
            0, 0, 100, 100
        );
    });
    const last = canvasContextArray[canvasContextArray.length - 1];
    last.fillStyle = 'rgba(120, 120, 120, 0.7)';
    last.fillRect(0, 0, 100, 100);
}

export function mix(model, blankElement, updater, selector) {
    const getElementIndex = getterFactory(model.blockMap, selector);
    const targetIndex = _.flow(getElementIndex, getNeighboursIndex, _.sample)(blankElement);
    return new Promise((resolve, reject) => {
        model.isRunning = true;
        randomlySelectAndMoveAsync(model.stepNumber, 120, resolve)(
            targetIndex, getElementIndex(blankElement), model.blockMap, updater
        );
    });
}

/**
 * judge if it is Solved.
 * @param blockMap
 * @return {boolean|*}
 */
export function isSolved(blockMap) {
    return blockMap.every((object, index) => object.correctIndex === index);
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

/**
 * render the data to the view
 * @param patches {Array}
 * @param map
 */
function render(patches, map) {
    patches.forEach(patch => {
        const target = map[patch.index].element;
        target.className = target.className.replace(/order-\d*/, `order-${patch.index}`);
    });
}

