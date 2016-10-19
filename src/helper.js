'use strict';

import {getRandomInt} from './util.js';

/***********************************************************
 Public Helper Function
 ***********************************************************/

/**
 *
 * @param target {Element}
 * @param blankTarget {Element}
 * @param map {{element:Element,correctIndex:number}[]}
 * @return {{nextState: (ArrayBuffer|string|Buffer|Blob), blankTargetPath: {from, to}}}
 */
export function move(target, blankTarget, map) {
    const getIndex = getterFactory(map);
    const [
        targetIndex,
        blankIndex
    ] = [
        getIndex(target),
        getIndex(blankTarget)
    ];

    const neighbours = getNeighbours(targetIndex, map);
    if (neighbours.some(object => object.element === blankTarget)) {
        const nextBlockMap = map.slice();
        [
            nextBlockMap[targetIndex],
            nextBlockMap[blankIndex]
        ] = [
            map[blankIndex],
            map[targetIndex]
        ];
        return {
            nextState: nextBlockMap,
            blankTargetPath: {
                from: blankIndex,
                to: targetIndex
            }
        }
    }
}

/**
 * baffle the blocks.
 * @param times {number} the times.
 * @param speed {number} the speed of the block when moving. (ms)
 * @return {function}
 */
export function randomlySelectAndMove(times, speed) {
    times--;
    /**
     * randomly move the blank block
     * @param previousBlock {Element} the element that will be ignore in the next randomly move.
     * @param blankTargetIndex {number} the blank object in the map.
     * @param map {Array} the state.
     * @param updater {function} update the view if called.
     */
    function randomlyMove(previousBlock, blankTargetIndex, map, updater) {
        const blankTargetNeighbours =
            getNeighbours(blankTargetIndex, map)
                .filter(object => object.element !== previousBlock);

        const moveBlock = getSample(blankTargetNeighbours).element;
        const nextDescriptor = move(moveBlock, map[blankTargetIndex].element, map);
        blankTargetIndex = nextDescriptor.blankTargetPath.to;
        updater(nextDescriptor);

        if (times) {
            setTimeout(() => {
                times--;
                randomlyMove(moveBlock, blankTargetIndex, nextDescriptor.nextState, updater);
            }, speed);
        }
    }

    return randomlyMove;
}

/**
 * Update the view according to the descriptor.
 * @param nextDescriptor
 */
export function update(nextDescriptor) {
    const patches = diff(nextDescriptor.nextState, this.blockMap);
    render(patches, nextDescriptor.nextState);
    this.blockMap = nextDescriptor.nextState;
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

export function getterFactory(map) {
    return target => map.findIndex(object => object.element === target);
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