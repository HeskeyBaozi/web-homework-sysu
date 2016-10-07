'use strict';

/**
 * Compute the factorial of the number
 * @param num {number}
 * @return {number}
 */
export function factor(num) {
    if (num === 0) {
        return 1;
    }
    if (num < 0) {
        throw new Error('fail!!!');
    }

    let result = 1;
    for (let i = 1; i <= num; i++) {
        result = result * i;
    }
    return result;
}