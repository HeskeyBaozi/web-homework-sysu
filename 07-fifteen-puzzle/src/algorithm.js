'use strict';

import {PriorityQueue} from './data-structure.js';
import {selectNumber} from './selector.js';
import {search, getNeighboursIndex, isSolved} from './helper.js';

/**
 * A* Algorithm
 * based on BFS with a function f to give an standard to choice
 * which node is the best when getting next state.
 * @param rootNode {Node} the root node. (Current State)
 * @return {Node|undefined} the last node
 */
export function AStar(rootNode) {
    const [PQ, S] = initializeAlgorithm(rootNode);
    while (!PQ.empty()) {
        const currentNode = PQ.dequeue();
        if (isSolved(currentNode.state)) return currentNode;
        getNeighboursIndex(currentNode.blankTargetIndex)
            .forEach(targetIndex => tryInsertToSet(search(targetIndex, currentNode), S, PQ));
    }
}

/**
 * initialize the algorithm.
 * @param rootNode
 * @return {*[]}
 */
function initializeAlgorithm(rootNode) {
    const PQ = new PriorityQueue(compare);
    const S = new Set();
    PQ.enqueue(rootNode);
    return [PQ, S];
}

/**
 * general compare function.
 * @param left
 * @param right
 * @return {number}
 */
function compare(left, right) {
    return left.h - right.h + left.depth - right.depth;
}

/**
 * check the signature and insert to the set.
 * @param nextNode
 * @param set
 * @param priorityQueue
 */
function tryInsertToSet(nextNode, set, priorityQueue) {
    const signature = nextNode.state.map(selectNumber).toString();
    if (!set.has(signature)) {
        priorityQueue.enqueue(nextNode);
        set.add(signature);
    }
}