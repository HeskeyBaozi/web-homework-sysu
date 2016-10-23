'use strict';

import {PriorityQueue} from './data-structure.js';
import {selectNumber} from './selector.js';
import {search, getNeighboursIndex} from './helper.js';

/**
 * A* Algorithm
 * based on BFS with a function f to give an standard to choice
 * which node is the best when getting next state.
 * @param rootNode {Node} the root node. (Current State)
 * @return {undefined|Node} the last node
 */
export function AStar(rootNode) {
    const PQ = new PriorityQueue((left, right) => {
        return 5 * (left.h - right.h) + left.depth - right.depth;
    });
    PQ.enqueue(rootNode);
    const S = new Set();
    console.time('AStar算法用时');
    while (!PQ.empty()) {
        const currentNode = PQ.dequeue();
        if (currentNode.state.map(selectNumber).every((object, index) => object === index)) {
            console.timeEnd('AStar算法用时');
            return currentNode;
        }

        const neighbours = getNeighboursIndex(currentNode.blankTargetIndex);
        neighbours.forEach(targetIndex => {
            const nextNode = search(targetIndex, currentNode);
            const signature = nextNode.state.map(selectNumber).toString();
            if (!S.has(signature)) {
                PQ.enqueue(nextNode);
                S.add(signature);
            }
        });
    }
}

/**
 * Iterative Deepening A*
 * @param rootNode {Node}
 * @return {*}
 * @constructor
 */
export function IDAStar(rootNode) {
    const Stack = [rootNode];
    let bound = rootNode.h;
    console.time('IDAStar');
    while (bound) {
        while (Stack.length) {
            const currentNode = Stack.pop();
            if (currentNode.state.map(selectNumber).every((object, index) => object === index)) {
                console.timeEnd('IDAStar');
                return currentNode;
            }

            const neighbours = getNeighboursIndex(currentNode.blankTargetIndex);
            neighbours.forEach(targetIndex => {
                const nextNode = search(targetIndex, currentNode);
                const cost = nextNode.h + nextNode.depth;
                if (cost <= bound) {
                    Stack.push(nextNode);
                    console.log(Stack);
                }
            });
        }
        Stack.push(rootNode);
        bound++;
    }
}