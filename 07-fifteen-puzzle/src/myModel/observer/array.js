'use strict';

/**
 * []
 * @type {Array}
 */
export const arrayMethods = Object.create(Array.prototype);

[
    'push',
    'dequeue',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice'
].forEach(methodName => {
    const original = Array.prototype[methodName];
    Object.defineProperty(arrayMethods, methodName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: function () {
            const args = Array.from(arguments);
            const result = original.apply(this, args);
            const observer = this['__ob__'];
            observeNewItems(methodName, args, observer);
            observer.dep.notify();
            return result;
        }
    })
});

function observeNewItems(methodName, args, observer) {
    let inserted = undefined;
    switch (methodName) {
        case 'push':
            inserted = args;
            break;
        case 'unshift':
            inserted = args;
            break;
        case 'splice':
            inserted = args.slice(2);
            break;
    }
    if (inserted) {
        observer.observeArray(inserted);
    }
}