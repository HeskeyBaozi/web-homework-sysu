'use strict';

/**
 * get number from [start, end]
 * @param start {number}
 * @param end {number}
 * @return {number}
 */
export function rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
}