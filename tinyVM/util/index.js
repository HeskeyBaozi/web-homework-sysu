'use strict';
export * from './options';

/**
 * Remove an item from an array
 * @param arr {Array<*>}
 * @param item {*}
 * @returns {Array<*> | void}
 */
export function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

